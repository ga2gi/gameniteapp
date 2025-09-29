<script>
  // Later we can fetch username + subscription from Supabase
  let username = "Player One";
  let subscriptionActive = false;
</script>

<div class="dashboard-box">
  <h1>👋 Welcome back, {username}!</h1>
  <p class="tagline">Your personal GameNite hub 🎮</p>

  <div class="status-box">
    {#if subscriptionActive}
      <p>✅ Subscription Active — enjoy unlimited fun!</p>
    {:else}
      <p>❌ No active subscription. <a href="/subscribe">Subscribe now</a> to unlock all games.</p>
    {/if}
  </div>

  <div class="quick-links">
    <a href="/games" class="btn primary">🎲 Explore Games</a>
    <a href="/profile" class="btn secondary">🙍 My Profile</a>
  </div>

  <div class="featured">
    <h2>🔥 Featured Game</h2>
    <a class="featured-card" href="/games/trivia">
      <h3>Trivia (Multiplayer)</h3>
      <p>Challenge friends and test your knowledge!</p>
    </a>
  </div>
</div>

<style>
  .dashboard-box {
    max-width: 800px;
    margin: 3rem auto;
    text-align: center;
    background: var(--bg, #fff);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);
  }

  h1 {
    font-size: 2.2rem;
    color: var(--primary, #ff6f61);
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--secondary, #42a5f5);
    font-weight: bold;
  }

  .status-box {
    background: #fef2f2;
    border: 2px solid #f87171;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .status-box a {
    color: var(--primary, #ff6f61);
    font-weight: bold;
    text-decoration: none;
  }

  .quick-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.9rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .btn.primary {
    background: var(--primary, #ff6f61);
    color: #fff;
  }

  .btn.primary:hover {
    background: #e6554b;
    transform: translateY(-3px);
  }

  .btn.secondary {
    background: var(--secondary, #42a5f5);
    color: #fff;
  }

  .btn.secondary:hover {
    background: #1e88e5;
    transform: translateY(-3px);
  }

  .featured {
    margin-top: 2rem;
    text-align: left;
  }

  .featured h2 {
    margin-bottom: 1rem;
    color: var(--secondary, #42a5f5);
  }

  .featured-card {
    display: block;
    background: #42a5f5;
    color: #fff;
    padding: 1.5rem;
    border-radius: 16px;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .featured-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.2);
    background: linear-gradient(135deg, #42a5f5, #1e88e5);
  }

  .featured-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.4rem;
  }

  .featured-card p {
    margin: 0;
    font-size: 1rem;
  }
</style>
