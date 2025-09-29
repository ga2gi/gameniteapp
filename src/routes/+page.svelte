<script>
  // No logic yet, just a styled welcome page
</script>

<div class="home-box">
  <h1>🎉 Welcome to GameNite Kenya</h1>
  <p class="tagline">Your ultimate hub for fun, laughter, and games with friends!</p>

  <p class="desc">
    Join GameNite Kenya and enjoy exciting multiplayer games like 
    <strong>Trivia</strong>, <strong>Charades</strong>, <strong>Murder Mystery</strong>, and more.  
    Play solo or with friends — anytime, anywhere.  
  </p>

  <div class="cta-buttons">
    <a href="/dashboard" class="btn primary">🚀 Go to Dashboard</a>
    <a href="/subscribe" class="btn secondary">✨ Subscribe Now</a>
  </div>
</div>

<style>
  .home-box {
    max-width: 700px;
    margin: 4rem auto;
    text-align: center;
    background: var(--bg, #fff);
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);
  }

  h1 {
    font-size: 2.5rem;
    color: var(--primary, #ff6f61);
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--secondary, #42a5f5);
    font-weight: bold;
  }

  .desc {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    line-height: 1.6;
    color: var(--text, #333);
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    transition: transform 0.2s ease, background 0.3s ease;
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
</style>
