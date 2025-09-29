<script lang="ts">
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';

  // Supabase client (anon key is fine for dev)
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  let session: any = null;
  let rooms: any[] = [];
  let loading = false;

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    session = data.session;
    fetchRooms();
  });

  async function fetchRooms() {
    const { data, error } = await supabase.from('trivia_rooms').select('*');
    if (error) console.error(error);
    else rooms = data ?? [];
  }

  async function createRoom() {
    loading = true;

    // ✅ Bypass login for now
    const userId = session?.user?.id ?? crypto.randomUUID();

    const { data, error } = await supabase
      .from('trivia_rooms')
      .insert({
        code: Math.random().toString(36).substring(2, 7).toUpperCase(),
        host_id: userId
      })
      .select()
      .single();

    loading = false;

    if (error) {
      console.error('Error creating room:', error.message);
      alert('Could not create room');
    } else {
      // redirect to room page
      window.location.href = `/games/trivia/room/${data.code}`;
    }
  }
</script>

<h1>Trivia Rooms</h1>

<button on:click={createRoom} disabled={loading}>
  {loading ? 'Creating...' : 'Create Room'}
</button>

<ul>
  {#each rooms as room}
    <li>
      Room {room.code} — Host: {room.host_id}
      <a href={`/games/trivia/room/${room.code}`}>Join</a>
    </li>
  {/each}
</ul>

<style>
  h1 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    color: #ff6f61;
  }

  button {
    background: #ff6f61;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-size: 1rem;
    transition: 0.2s;
  }

  button:hover {
    background: #e65b50;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1.5rem;
  }

  li {
    margin-bottom: 0.8rem;
    background: #fff;
    border-radius: 10px;
    padding: 0.6rem 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  a {
    margin-left: 1rem;
    color: #333;
    text-decoration: underline;
  }
</style>
