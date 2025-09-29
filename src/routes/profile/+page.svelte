<script>
  // Later: fetch real user data from Supabase
  let username = "Player One";
  let email = "playerone@example.com";
  let subscriptionActive = false;
</script>

<div class="profile-box">
  <h1>🙍 My Profile</h1>
  <p class="tagline">Manage your GameNite account</p>

  <div class="profile-info">
    <p><strong>Username:</strong> {username}</p>
    <p><strong>Email:</strong> {email}</p>
    <p>
      <strong>Subscription:</strong>
      {#if subscriptionActive}
        ✅ Active
      {:else}
        ❌ Not Active (<a href="/subscribe">Subscribe now</a>)
      {/if}
    </p>
  </div>

  <div class="actions">
    <a href="/dashboard" class="btn secondary">⬅ Back to Dashboard</a>
    <button class="btn danger">🚪 Sign Out</button>
  </div>
</div>

<style>
  .profile-box {
    max-width: 600px;
    margin: 3rem auto;
    background: var(--bg, #fff);
    padding: 2.5rem;
    border-radius: 18px;
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    color: var(--primary, #ff6f61);
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--secondary, #42a5f5);
    font-weight: bold;
  }

  .profile-info {
    text-align: left;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .profile-info p {
    margin: 0.8rem 0;
  }

  .profile-info a {
    color: var(--primary, #ff6f61);
    text-decoration: none;
    font-weight: bold;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.9rem 1.8rem;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    border: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  .btn.secondary {
    background: var(--secondary, #42a5f5);
    color: #fff;
  }

  .btn.secondary:hover {
    background: #1e88e5;
    transform: translateY(-3px);
  }

  .btn.danger {
    background: #f87171;
    color: #fff;
  }

  .btn.danger:hover {
    background: #ef4444;
    transform: translateY(-3px);
  }
</style>
