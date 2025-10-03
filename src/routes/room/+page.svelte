<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Room code from URL
  $: roomCode = $page.params.code;

  function leaveRoom() {
    goto('/room');
  }

  function goToGame(game: string) {
    goto(`/room/${roomCode}/${game}`);
  }
</script>

<div class="page">
  <h1 class="title">🏠 Room Lobby</h1>
  <p class="description">
    Welcome to your game room! Share the code with friends so they can join.
  </p>

  <div class="card">
    <h2>Room Code</h2>
    <p class="room-code">{roomCode}</p>
  </div>

  <h2 class="subtitle">🎮 Choose a Game</h2>
  <div class="games">
    <div class="game-card trivia" on:click={() => goToGame("trivia")}>
      <h3>❓ Trivia</h3>
      <p>Test your knowledge with timed questions.</p>
    </div>
    <div class="game-card charades" on:click={() => goToGame("charades")}>
      <h3>🎭 Charades</h3>
      <p>Act it out and let your friends guess!</p>
    </div>
    <div class="game-card murder" on:click={() => goToGame("murder")}>
      <h3>🔪 Murder Mystery</h3>
      <p>Find out who the imposter is before it's too late.</p>
    </div>
    <div class="game-card imposter" on:click={() => goToGame("imposter")}>
      <h3>🕵️ Imposter</h3>
      <p>Blend in or expose the fake among players.</p>
    </div>
  </div>

  <div class="actions">
    <button class="btn secondary" on:click={leaveRoom}>⬅ Leave Room</button>
  </div>
</div>

<style>
  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .title {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 2rem;
  }

  .card {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .room-code {
    font-size: 2rem;
    font-weight: bold;
    color: #42a5f5;
    margin-top: 0.5rem;
  }

  .subtitle {
    margin: 1rem 0;
    font-size: 1.5rem;
  }

  .games {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .game-card {
    padding: 1.5rem;
    border-radius: 1rem;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-align: left;
  }

  .game-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }

  .game-card p {
    margin: 0;
    font-weight: normal;
  }

  .game-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  .trivia {
    background: #42a5f5;
  }

  .charades {
    background: #ab47bc;
  }

  .murder {
    background: #ef5350;
  }

  .imposter {
    background: #66bb6a;
  }

  .actions {
    margin-top: 2rem;
  }

  .btn {
    background: #42a5f5;
    color: #fff;
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  .btn:hover {
    background: #1e88e5;
  }

  .btn.secondary {
    background: #ccc;
    color: #333;
  }

  .btn.secondary:hover {
    background: #aaa;
  }
</style>
