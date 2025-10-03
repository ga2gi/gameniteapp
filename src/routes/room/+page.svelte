<script lang="ts">
  import { goto } from '$app/navigation';

  let joinCode: string = '';

  // Generate a random room code
  function createRoom() {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    goto(`/room/${code}`);
  }

  // Join existing room
  function joinRoom() {
    if (joinCode.trim() !== '') {
      goto(`/room/${joinCode.trim().toUpperCase()}`);
    }
  }
</script>

<div class="page">
  <h1 class="title">🎮 Game Rooms</h1>
  <p class="description">
    Rooms let you and your friends play together. 
    Create a new room and share the code, or join an existing room to start playing.
  </p>

  <div class="card-container">
    <!-- Create Room Card -->
    <div class="card create">
      <h2>✨ Create Room</h2>
      <p>Start a new room and invite others by sharing the room code.</p>
      <button class="btn" on:click={createRoom}>Create Room</button>
    </div>

    <!-- Join Room Card -->
    <div class="card join">
      <h2>🔑 Join Room</h2>
      <p>Enter the room code shared by your friend to join.</p>
      <input
        class="input"
        type="text"
        placeholder="Enter code"
        bind:value={joinCode}
      />
      <button class="btn" on:click={joinRoom}>Join Room</button>
    </div>
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
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 2rem;
  }

  .card-container {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .card {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  .card h2 {
    margin-bottom: 0.5rem;
  }

  .card p {
    margin-bottom: 1rem;
    color: #444;
  }

  .card.create {
    border-left: 8px solid #42a5f5; /* Blue */
  }

  .card.join {
    border-left: 8px solid #66bb6a; /* Green */
  }

  .btn {
    background: #42a5f5;
    color: #fff;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
  }

  .btn:hover {
    background: #1e88e5;
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
</style>
