<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  let room: any = null;
  let players: any[] = [];
  let loading = true;

  // Fake user (replace with session later)
  const userId = crypto.randomUUID();
  let username = `Player-${Math.floor(Math.random() * 1000)}`;

  // room code from URL
  let code: string;
  $: code = $page.params.code;

  onMount(async () => {
    await loadRoom();
    await joinRoom();

    // subscribe to player updates
    supabase
      .channel('room-players')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trivia_players' },
        payload => {
          console.log('Realtime update:', payload);
          loadPlayers();
        }
      )
      .subscribe();

    loadPlayers();
  });

  async function loadRoom() {
    const { data, error } = await supabase
      .from('trivia_rooms')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      console.error('Error loading room:', error);
      alert('Room not found');
    } else {
      room = data;
    }
    loading = false;
  }

  async function loadPlayers() {
    const { data, error } = await supabase
      .from('trivia_players')
      .select('*')
      .eq('room_code', code);

    if (error) console.error(error);
    else players = data ?? [];
  }

  async function joinRoom() {
    const { error } = await supabase.from('trivia_players').insert({
      room_code: code,
      user_id: userId,
      username
    });

    if (error) {
      console.error('Join error:', error);
    }
  }
</script>

{#if loading}
  <p>Loading room...</p>
{:else if !room}
  <p>Room not found.</p>
{:else}
  <h1>Trivia Room {room.code}</h1>
  <p><strong>Host:</strong> {room.host_id}</p>

  <h2>Players</h2>
  <ul>
    {#each players as p}
      <li>{p.username} ({p.user_id})</li>
    {/each}
  </ul>
{/if}

<style>
  h1 {
    color: #ff6f61;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin-top: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: #fff;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>
