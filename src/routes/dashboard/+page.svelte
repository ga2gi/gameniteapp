<script>
  const soloGames = [
    { name: "Nationwide Trivia (Solo)", icon: "🌍", color: "#ef5350", link: "/trivia" }
  ];
</script>

<div class="dashboard">
  <h1>🎮 Dashboard</h1>
  <p class="tagline">Choose a solo game or jump into multiplayer fun with friends.</p>

  <h2>🌍 Solo Game</h2>
  <div class="games-grid">
    {#each soloGames as game}
      <a href={game.link} class="game-card" style="--card-color: {game.color}">
        <h2>{game.icon} {game.name}</h2>
      </a>
    {/each}
  </div>

  <h2>👥 Multiplayer Games</h2>
  <div class="games-grid">
    <a href="/room" class="game-card" style="--card-color: #42a5f5">
      <h2>🏠 Enter Rooms</h2>
    </a>
  </div>
</div>

<style>
  .dashboard {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .tagline {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #666;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: 2rem;
    color: #333;
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .game-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-color, #eee);
    border-radius: 20px;
    padding: 2rem;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
    text-decoration: none;
    box-shadow: 0 6px 14px rgba(0,0,0,0.15);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .game-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 22px rgba(0,0,0,0.25);
    background: linear-gradient(135deg, var(--card-color), #333);
  }
</style>
