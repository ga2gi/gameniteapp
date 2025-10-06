<script>
  import { onMount } from "svelte";

  let roomCode = "";
  let rooms = [];

  // Mock data for now (later connect to Supabase)
  onMount(() => {
    rooms = [
      { code: "ABC123", host: "Sasha", players: 3 },
      { code: "NITE45", host: "Lawrence", players: 1 },
    ];
  });

  function createRoom() {
    const newCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    window.location.href = `/room/${newCode}`;
  }

  function joinRoom() {
    if (!roomCode) {
      alert("Please enter a room code.");
      return;
    }
    window.location.href = `/room/${roomCode}`;
  }
</script>

<header>🎮 ChezaNite Rooms</header>

<div class="container">
  <div class="intro">
    <h2>Private Game Rooms</h2>
    <p>
      Create or join private rooms to play with your friends during
      picnics, hangouts, dates, or events. Each room can host all multiplayer games.
    </p>
  </div>

  <div class="room-actions">
    <div class="create-join-box">
      <button class="btn create" on:click={createRoom}>Create Room</button>
      <div class="join-section">
        <input
          type="text"
          placeholder="Enter Room Code"
          bind:value={roomCode}
        />
        <button class="btn join" on:click={joinRoom}>Join Room</button>
      </div>
    </div>
  </div>

  <div class="games-list">
    <h3>Available Games in Rooms</h3>
    <div class="game-grid">
      <a href="/games/trivia" class="game-card" style="--card-color: #42a5f5">
        <h4>Trivia</h4>
        <p>Compete head-to-head on fun general knowledge questions.</p>
      </a>
      <a href="/games/charades" class="game-card" style="--card-color: #ffa726">
        <h4>Charades</h4>
        <p>Act and guess hilarious prompts before the timer runs out.</p>
      </a>
      <a href="/games/imposter" class="game-card" style="--card-color: #66bb6a">
        <h4>Imposter</h4>
        <p>Find out who’s pretending among your group of friends!</p>
      </a>
      <a href="/games/murder-mystery" class="game-card" style="--card-color: #ab47bc">
        <h4>Murder Mystery</h4>
        <p>Solve crimes and uncover clues to reveal the culprit.</p>
      </a>
    </div>
  </div>

  <div class="active-rooms">
    <h3>🕹 Active Rooms</h3>
    {#if rooms.length > 0}
      <ul>
        {#each rooms as room}
          <li>
            <span>Room: {room.code}</span> — Hosted by {room.host} ({room.players} players)
          </li>
        {/each}
      </ul>
    {:else}
      <p>No active rooms yet. Be the first to create one!</p>
    {/if}
  </div>
</div>

<style>
  header {
    background: linear-gradient(135deg, #4caf50, #e91e63);
    color: white;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 0 0 10px 10px;
  }

  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
  }

  .intro p {
    color: #555;
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  .room-actions {
    margin: 2rem 0;
  }

  .create-join-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .join-section {
    display: flex;
    gap: 0.5rem;
  }

  input {
    padding: 0.7rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 180px;
    text-align: center;
    font-size: 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .btn.create {
    background: #4caf50;
  }

  .btn.create:hover {
    background: #388e3c;
  }

  .btn.join {
    background: #e91e63;
  }

  .btn.join:hover {
    background: #c2185b;
  }

  .games-list {
    margin-top: 2rem;
  }

  .game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .game-card {
    display: block;
    background: var(--card-color);
    border-radius: 16px;
    padding: 1.5rem;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .game-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }

  .active-rooms {
    margin-top: 3rem;
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .active-rooms ul {
    list-style: none;
    padding: 0;
    text-align: left;
    max-width: 500px;
    margin: 1rem auto 0;
  }

  .active-rooms li {
    background: white;
    margin: 0.5rem 0;
    padding: 0.8rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  @media (max-width: 600px) {
    .join-section {
      flex-direction: column;
      width: 100%;
    }

    input {
      width: 100%;
    }
  }
</style>
