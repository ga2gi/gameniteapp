<script>
  const games = [
    { name: "Nationwide Trivia (Solo)", path: "/games/nationwide-trivia", color: "#ff6f61" },
    { name: "Trivia (Multiplayer)", path: "/games/trivia", color: "#42a5f5" },
    { name: "Imposter (Multiplayer)", path: "/games/imposter", color: "#66bb6a" },
    { name: "Murder Mystery (Multiplayer)", path: "/games/murder-mystery", color: "#ab47bc" },
    { name: "Charades (Multiplayer)", path: "/games/charades", color: "#ffa726" }
  ];
</script>

<div class="games-box">
  <h1>🎮 All Games</h1>
  <p class="tagline">Choose your adventure and start playing!</p>

  <div class="games-grid">
    {#each games as game}
      <a class="game-card" href={game.path} style="--card-color: {game.color}">
        <h2>{game.name}</h2>
      </a>
    {/each}
  </div>

  <div class="back-btn">
    <a href="/dashboard" class="btn secondary">⬅ Back to Dashboard</a>
  </div>
</div>

<style>
  .games-box {
    max-width: 900px;
    margin: 3rem auto;
    text-align: center;
  }

  h1 {
    font-size: 2.3rem;
    margin-bottom: 0.5rem;
    color: var(--primary, #ff6f61);
  }

  .tagline {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--secondary, #42a5f5);
    font-weight: bold;
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
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

  .back-btn {
    margin-top: 2rem;
  }

  .btn.secondary {
    display: inline-block;
    padding: 0.9rem 2rem;
    background: var(--secondary, #42a5f5);
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  .btn.secondary:hover {
    background: #1e88e5;
    transform: translateY(-3px);
  }
</style>
