<script>
  // You can later import leaderboard or trivia logic here
</script>

<style>
  body {
    font-family: "Poppins", sans-serif;
    background-color: #fafafa;
    color: #333;
    margin: 0;
    padding: 0;
  }

  header {
    background: linear-gradient(135deg, #e91e63, #4caf50);
    color: white;
    padding: 1rem 2rem;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 0 0 10px 10px;
  }

  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .intro {
    text-align: center;
    margin-bottom: 2rem;
  }

  .intro p {
    color: #555;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .game-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    text-align: center;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }

  .game-card:hover {
    transform: translateY(-5px);
  }

  .game-card h3 {
    margin-bottom: 0.5rem;
  }

  .game-card p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .btn {
    display: inline-block;
    background: #4caf50;
    color: white;
    padding: 0.7rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.3s;
    margin: 0.2rem;
  }

  .btn:hover {
    background: #388e3c;
  }

  .leaderboard-btn {
    background: #e91e63;
  }

  .leaderboard-btn:hover {
    background: #c2185b;
  }

  @media (max-width: 600px) {
    header {
      font-size: 1.4rem;
      padding: 1rem;
    }
    .btn {
      padding: 0.6rem 1.2rem;
    }
  }
</style>

<header>ChezaNite Nationwide Games</header>

<div class="container">
  <div class="intro">
    <h2>Play with Kenya 🇰🇪</h2>
    <p>Join nationwide competitions — test your knowledge, creativity, and quick thinking!
    Win prizes, climb leaderboards, and have fun with players from all over Kenya.</p>
  </div>

  <div class="game-grid">
    <div class="game-card" style="border-top: 5px solid #4caf50;">
      <h3>Nationwide Trivia</h3>
      <p>Answer 10 fun, challenging questions each round. Compete against everyone across Kenya!</p>
      <a href="/nationwide-trivia" class="btn">Play Now</a>
      <a href="/leaderboard" class="btn leaderboard-btn">Leaderboard</a>
    </div>

    <div class="game-card" style="border-top: 5px solid #e91e63;">
      <h3>Nationwide Charades</h3>
      <p>Act, guess, and laugh! Compete in timed charades with creative prompts.</p>
      <a href="/nationwide-charades" class="btn">Play Now</a>
      <a href="/leaderboard" class="btn leaderboard-btn">Leaderboard</a>
    </div>

    <div class="game-card" style="border-top: 5px solid #2196f3;">
      <h3>Nationwide Imposter</h3>
      <p>Find the fake player in your group before time runs out. Can you spot the imposter?</p>
      <a href="/nationwide-imposter" class="btn">Play Now</a>
      <a href="/leaderboard" class="btn leaderboard-btn">Leaderboard</a>
    </div>

    <div class="game-card" style="border-top: 5px solid #ff9800;">
      <h3>Nationwide Murder Mystery</h3>
      <p>Solve thrilling cases together! Compete for the best detective title.</p>
      <a href="/nationwide-mystery" class="btn">Play Now</a>
      <a href="/leaderboard" class="btn leaderboard-btn">Leaderboard</a>
    </div>
  </div>
</div>
