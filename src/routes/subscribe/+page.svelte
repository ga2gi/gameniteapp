<script>
  const handleSubscribe = () => {
    alert("Redirecting to Paystack…");
    // Later: integrate Paystack payment here
  };
</script>

<div class="sub-box">
  <h1>✨ Unlock Unlimited Fun!</h1>
  <p>Subscribe for <strong>KES 100 monthly</strong> and access all games 🎉</p>

  <button on:click={handleSubscribe}>Subscribe Now</button>
</div>

<style>
  .sub-box {
    max-width: 500px;
    margin: 3rem auto;
    background: var(--bg, #fff);
    padding: 2rem;
    border-radius: 18px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    text-align: center;
  }

  h1 {
    color: var(--secondary, #42a5f5);
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    color: var(--text, #333);
  }

  button {
    padding: 1rem 2rem;
    background: var(--secondary, #42a5f5);
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background: #1e88e5;
    transform: scale(1.05);
  }
</style>
