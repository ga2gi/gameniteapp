<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  // Games available inside rooms
  const games = [
    { name: "Trivia", path: "trivia", color: "#42a5f5" },
    { name: "Imposter", path: "imposter", color: "#66bb6a" },
    { name: "Murder Mystery", path: "murder-mystery", color: "#ab47bc" },
    { name: "Charades", path: "charades", color: "#ffa726" }
  ];

  let roomCode = "";
  let joinCode = "";

  // Generate a random room code
  function generateRoomCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function createRoom() {
    roomCode = generateRoomCode();
    goto(`/room/${roomCode}`);
  }

  function joinRoom() {
    if (!joinCode) {
      alert("Please enter a room code to join.");
      return;
    }
    goto(`/room/${joinCode.toUpperCase()}`);
  }

  // If dynamic route, extract room code from URL
  import { page } from '$app/stores';
  $: currentRoom = $page.params.code || roomCode;
</script>

<div class="room-container">
  {#if !currentRoom}
    <h1>🎮 GameNite Rooms</h1>
    <div class="room-actions">
      <button class="btn create" on:click={createRoom}>Create Room</button>
      <div class="join-box">
        <input
          type="text"
          placeholder="Enter Room Code"
          bind:value={joinCode}
          maxlength="6"
        />
        <button class="btn join" on:click={joinRoom}>Join Room</button>
      </div>
    </div>
  {:else}
    <h1>Room: {currentRoom}</h1>
    <p class="room-info">Invite friends with this code or play solo in multiplayer games.</p>

    <div class="games-grid">
      {#each games as game}
        <a class="game-card" href={`/room/${currentRoom}/${game.path}`} style="--card-color: {game.color}">
          <h2>{game.name}</h2>
        </a>
      {/each}
    </div>

    <div class="back-btn">
      <a href="/dashboard" class="btn back">⬅ Back to Dashboard</a>
    </div>
  {/if}
</div>

<style>
.room-container {
  max-width: 900px;
  margin: 2rem auto;
  text-align: center;
  padding: 0 1rem;
  font-family: "Baloo 2", cursive, system-ui, sans-serif;
}

h1 {
  font-size: 2rem;
  color: #ff6f61;
  margin-bottom: 1rem;
}

.room-info {
  font-weight: bold;
  margin-bottom: 2rem;
  color: #555;
}

.room-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.join-box {
  display: flex;
  gap: 0.5rem;
}

.join-box input {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #ccc;
  text-transform: uppercase;
}

.btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: #fff;
}

.btn.create { background: #42a5f5; }
.btn.create:hover { background: #1e88e5; transform: translateY(-3px); }

.btn.join { background: #66bb6a; }
.btn.join:hover { background: #43a047; transform: translateY(-3px); }

.btn.back { background: #ff6f61; text-decoration: none; }
.btn.back:hover { background: #e53935; transform: translateY(-3px); }

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.game-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-color, #eee);
  border-radius: 18px;
  padding: 2rem;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.game-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.25);
  background: linear-gradient(135deg, var(--card-color), #333);
}
</style>
