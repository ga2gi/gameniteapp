<!-- src/routes/games/trivia/+page.svelte -->
<script>
  import { goto } from '$app/navigation';
  import { makeCode } from '$lib/generateCode.js';
  import { supabase } from '$lib/supabaseClient';
  import { getCurrentUser } from '$lib/auth';

  let joinCode = '';
  let user = null;

  async function createRoom() {
    user = await getCurrentUser();
    if (!user) return alert('Please sign in to host a room');
    const code = makeCode(5);
    const { data, error } = await supabase
      .from('rooms')
      .insert([{ game_type:'trivia', host_id: user.id, join_code: code }])
      .select()
      .single();
    if (error) return alert(error.message);
    goto(`/games/trivia/room/${data.join_code}`);
  }

  function joinRoom() {
    if (!joinCode.trim()) return;
    goto(`/games/trivia/room/${joinCode.toUpperCase()}`);
  }
</script>

<div class="box">
  <h1>Trivia — Create or Join Room</h1>
  <div class="actions">
    <button on:click={createRoom} class="btn primary">Create Room</button>
    <div class="join">
      <input placeholder="Room code" bind:value={joinCode} />
      <button on:click={joinRoom} class="btn">Join</button>
    </div>
  </div>
</div>

<style>
  .box{max-width:700px;margin:2rem auto;padding:1.5rem;border-radius:12px;background:#fff}
  .actions{display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap}
  .join input{padding:0.6rem;border-radius:10px;border:1px solid #ddd}
  .btn{padding:0.6rem 1rem;border-radius:10px}
  .btn.primary{background:#ff6f61;color:#fff;border:none}
</style>
