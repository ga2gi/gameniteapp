<script lang="ts">
  import { onMount } from 'svelte';

  let roomCode = '';
  let joinCode = '';
  let players = ["Alice", "Bob", "Charlie"]; // mock players
  let games = [
    { name: "Trivia", color: "#42a5f5" },
    { name: "Charades", color: "#ffa726" },
    { name: "Murder Mystery", color: "#ab47bc" },
    { name: "Imposter", color: "#66bb6a" }
  ];

  function createRoom() {
    if (!roomCode) roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    if (!players.includes("You")) players = ["You", ...players];
    alert(`Room ${roomCode} created!`);
  }

  function joinRoom() {
    if (!joinCode) return alert("Enter room code");
    roomCode = joinCode.toUpperCase();
    if (!players.includes("You")) players = [...players, "You"];
    alert(`Joined room ${roomCode}`);
    joinCode = '';
  }
</script>

<div class="room-container">
  <h1>🎮 Room Lobby</h1>

  <div class="room-actions">
    <div class="create-room">
      <button class="btn create" on:click={createRoom}>Create Room</button>
      <p>or share code: {roomCode || "----"}</p>
    </div>
    <div class="join-room">
      <input type="text" placeholder="Enter Room Code" bind:value={joinCode} />
      <button class="btn join" on:click={joinRoom}>Join Room</button>
    </div>
  </div>

  {#if roomCode}
    <div class="players-list">
      <h2>Players in Room {roomCode}</h2>
      <ul>
        {#each players as player}
          <li>{player}</li>
        {/each}
      </ul>
    </div>

    <div class="games-grid">
      {#each games as game}
        <div class="game-card" style="--card-color: {game.color}">
          <h2>{game.name}</h2>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .room-container { max-width: 900px; margin: 2rem auto; font-family: "Baloo 2", cursive; text-align: center; }
  h1 { color: #ff6f61; margin-bottom: 1rem; }

  .room-actions { display:flex; justify-content: center; gap:2rem; margin-bottom:2rem; flex-wrap:wrap; }
  .create-room, .join-room { display:flex; flex-direction:column; gap:0.5rem; align-items:center; }

  input { padding:0.6rem; border-radius:8px; border:1px solid #ccc; text-transform:uppercase; }

  .btn { padding:0.7rem 1.5rem; border:none; border-radius:12px; color:#fff; font-weight:700; cursor:pointer; transition:transform 0.2s ease; }
  .btn.create { background:#42a5f5; }
  .btn.create:hover { background:#1e88e5; transform:translateY(-2px); }
  .btn.join { background:#66bb6a; }
  .btn.join:hover { background:#388e3c; transform:translateY(-2px); }

  .players-list { background:#fff; padding:1rem 2rem; border-radius:16px; margin-bottom:2rem; box-shadow:0 6px 12px rgba(0,0,0,0.1); }
  .players-list ul { list-style:none; padding:0; margin:0; }
  .players-list li { padding:0.4rem 0; font-weight:bold; color:#333; }

  .games-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; }
  .game-card { background:var(--card-color,#eee); color:#fff; padding:2rem; border-radius:16px; font-weight:700; transition:transform 0.2s ease; }
  .game-card:hover { transform:translateY(-4px); box-shadow:0 8px 16px rgba(0,0,0,0.15);}
</style>
