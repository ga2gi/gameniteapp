<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { getCurrentUser } from '$lib/auth';

  export let params;
  const roomCode = params.code;
  let room = null;
  let players = [];
  let user = null;
  let isHost = false;
  let channel;

  async function loadRoom() {
    const { data } = await supabase.from('rooms').select('*').eq('join_code', roomCode).single();
    room = data;
    if (!room) return;
    const { data: pls } = await supabase.from('room_players').select('*').eq('room_id', room.id);
    players = pls ?? [];
  }

  async function joinLobby() {
    user = await getCurrentUser();
    if (!user) return alert('Please sign in to join the room');
    // insert into room_players (if not exists)
    const { data: rp } = await supabase
      .from('room_players')
      .select('*')
      .eq('room_id', room.id)
      .eq('user_id', user.id)
      .limit(1);
    if (!rp?.length) {
      await supabase.from('room_players').insert([{ room_id: room.id, user_id: user.id, username: user.user_metadata?.full_name ?? user.email }]);
    }
  }

  async function startGame() {
    // host toggles status to 'playing'
    await supabase.from('rooms').update({ status: 'playing' }).eq('id', room.id);
    // For trivia we can create a 'game_state' row or use a channel broadcast — simplest: update rooms.status and clients listen
  }

  onMount(async () => {
    await loadRoom();
    // subscribe to changes in room_players and rooms
    channel = supabase.channel(`room:${roomCode}`);
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'room_players', filter: `room_id=eq.${room.id}` }, (payload) => {
      players = [...players, payload.new];
    }).on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${room.id}` }, (payload) => {
      room = payload.new;
      // redirect to game page if status changed
      if (room.status === 'playing') {
        // go to play page for multiplayer trivia
        window.location.href = `/games/trivia/play/${room.join_code}`;
      }
    });

    await supabase.channel(channel.name).subscribe();

    // join (if not already)
    await joinLobby();
  });

  onDestroy(async () => {
    if (channel) await supabase.removeChannel(channel);
  });

</script>

<div class="lobby card">
  <h2>Room: {roomCode}</h2>
  <p>Host: {room?.host_id}</p>
  <h3>Players</h3>
  <ul>
    {#each players as p}
      <li>{p.username}</li>
    {/each}
  </ul>

  {#if room?.host_id === user?.id}
    <button class="btn" on:click={startGame}>Start Game</button>
  {/if}

  <a href="/games/trivia" class="btn ghost">Leave</a>
</div>

<style>
  .card{max-width:800px;margin:2rem auto;padding:1.5rem;border-radius:12px;background:#fff}
  .btn{padding:0.6rem 1rem;border-radius:10px;margin-top:1rem}
</style>
