<script>
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  const nationwideGames = [
    { name: "Nationwide Trivia", path: "/games/nationwide-trivia", color: "#ff6f61" },
    { name: "Nationwide Challenge", path: "/games/nationwide-challenge", color: "#42a5f5" }
  ];

  const roomGames = [
    { name: "Trivia", path: "/trivia", color: "#66bb6a" },
    { name: "Imposter", path: "/imposter", color: "#ab47bc" },
    { name: "Murder Mystery", path: "/murder-mystery", color: "#ffa726" },
    { name: "Charades", path: "/charades", color: "#26c6da" }
  ];
</script>

<div class="dashboard">
  <h1> Welcome to ChezaNite</h1>
  <p class="intro">
    Play solo or with friends. Compete nationwide or host your own private room for hangouts, picnics, or date nights!
  </p>

  <!-- Nationwide Games Section -->
  <div class="section">
    <h2>🌍 Nationwide Games</h2>
    <p class="desc">
      Join the rest of Kenya in thrilling national competitions! Test your knowledge in Nationwide Trivia or take on special challenges to climb the leaderboard and win weekly prizes.
    </p>

    <div class="game-grid">
      {#each nationwideGames as game}
        <a class="game-card" href={game.path} style="--color: {game.color}">
          {game.name}
        </a>
      {/each}
    </div>

    <a href="/nationwide" class="btn secondary">Play Nationwide Games</a>
  </div>

  <!-- Rooms Section -->
  <div class="section">
    <h2>🏠 Rooms</h2>
    <p class="desc">
      Host private games for your squad! Create or join a room to play trivia, charades, imposter, and more with your friends or event guests — all in one shared room.
    </p>

    <div class="game-grid">
      {#each roomGames as game}
        <a class="game-card" href={game.path} style="--color: {game.color}">
          {game.name}
        </a>
      {/each}
    </div>

    <a href="/room" class="btn secondary">Go to Rooms</a>
  </div>

  <!-- Subscribe Button -->
  <button class="subscribe-btn" on:click={toggleModal}>
    Subscribe (KES 500/month)
  </button>

  <!-- Modal -->
  {#if showModal}
    <div class="modal-overlay" on:click={toggleModal}>
      <div class="modal" on:click|stopPropagation>
        <h2>Subscribe to ChezaNite</h2>
        <p>
          Play all games, join nationwide competitions, and unlock weekly prizes — all for <b>KES 500/month</b>.
        </p>
        <button class="pay-btn">Pay with Paystack (M-Pesa)</button>
        <button class="close-btn" on:click={toggleModal}>Close</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard {
    max-width: 900px;
    margin: 3rem auto;
    padding: 0 1rem;
    text-align: center;
  }

  h1 {
    color: #ff6f61;
    font-size: 2.2rem;
    margin-bottom: 0.3rem;
  }

  .intro {
    color: #555;
    margin-bottom: 2.5rem;
    font-weight: 600;
  }

  .section {
    margin: 2.5rem 0;
  }

  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  .desc {
    color: #555;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  .game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .game-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color);
    color: white;
    text-decoration: none;
    padding: 1.5rem;
    border-radius: 15px;
    font-weight: bold;
    box-shadow: 0 5px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .game-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  }

  .btn.secondary {
    display: inline-block;
    padding: 0.9rem 2rem;
    background: #42a5f5;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
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

  .subscribe-btn {
    margin-top: 2.5rem;
    background: #ff6f61;
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .subscribe-btn:hover {
    background: #ff3d00;
    transform: translateY(-3px);
  }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 16px;
    max-width: 420px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  .modal h2 {
    color: #ff6f61;
    margin-bottom: 1rem;
  }

  .modal p {
    color: #444;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .pay-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    transition: transform 0.2s ease;
  }

  .pay-btn:hover {
    transform: scale(1.05);
  }

  .close-btn {
    margin-top: 1rem;
    background: none;
    border: none;
    color: #999;
    font-weight: 600;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .game-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
  }
</style>
