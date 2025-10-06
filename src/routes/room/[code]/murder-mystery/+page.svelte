<script lang="ts">
  import { page } from '$app/stores';
  $: roomCode = $page.params.code;

  let roles = ["Detective 🕵️", "Murderer 🔪", "Innocent 👤"];
  let assignedRole = roles[Math.floor(Math.random() * roles.length)];
</script>

<div class="game-container">
  <h1>🔎 Murder Mystery - Room {roomCode}</h1>
  <div class="card">
    <h2>Your Role:</h2>
    <p>{assignedRole}</p>
    <p>Discuss, deduce, and find out who the murderer is!</p>
    <button on:click={() => assignedRole = roles[Math.floor(Math.random()*roles.length)]} class="btn">Reassign Role</button>
  </div>
</div>

<style>
  .game-container { max-width: 600px; margin: 2rem auto; text-align: center; font-family: "Baloo 2", cursive; }
  .card { background:#fff; padding:2rem; border-radius:16px; box-shadow:0 6px 12px rgba(0,0,0,0.1);}
  .btn { margin-top:1rem; padding:0.7rem 1.2rem; background:#ab47bc; color:#fff; border:none; border-radius:12px; cursor:pointer; }
  .btn:hover { background:#8e24aa; transform:translateY(-2px);}
</style>
