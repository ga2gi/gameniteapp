<script lang="ts">
  import { page } from '$app/stores';
  $: roomCode = $page.params.code;

  let word = "Act like a cat 🐱"; // placeholder
  let timer = 10;
  let interval;

  import { onMount } from 'svelte';
  onMount(() => {
    interval = setInterval(() => {
      timer--;
      if (timer <= 0) clearInterval(interval);
    }, 1000);
  });
</script>

<div class="game-container">
  <h1>🎭 Charades - Room {roomCode}</h1>
  <div class="card">
    <p class="timer">Time Left: {timer}s</p>
    <h2>{word}</h2>
    <p>Act out the word! Players in the room try to guess it.</p>
    <button on:click={() => { word = "Act like a dog 🐶"; timer = 10; }} class="btn">Next Word</button>
  </div>
</div>

<style>
  .game-container { max-width: 600px; margin: 2rem auto; text-align: center; font-family: "Baloo 2", cursive; }
  .card { background:#fff; padding:2rem; border-radius:16px; box-shadow:0 6px 12px rgba(0,0,0,0.1);}
  .timer { font-weight:bold; color:#e53935; }
  .btn { margin-top:1rem; padding:0.7rem 1.2rem; background:#42a5f5; color:#fff; border:none; border-radius:12px; cursor:pointer; }
  .btn:hover { background:#1e88e5; transform:translateY(-2px);}
</style>
