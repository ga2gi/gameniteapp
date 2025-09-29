<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>GameNite</title>
  <!-- Fun font from Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&display=swap" rel="stylesheet">
</svelte:head>

<header>
  <nav>
    <div class="logo">🎮 GameNite</div>
<div class="links">
  <a href="/">Home</a>
  <a href="/dashboard">Dashboard</a>
  <a href="/games">Games</a>
  <a href="/auth/login">Sign In</a>
  <a href="/auth/signup">Sign Up</a>
  <a href="/subscribe" class="btn">Subscribe</a>
</div>
  </nav>
</header>

<main>
  <div class="card">
    {@render children?.()}
  </div>
</main>

<footer>
  <p>&copy; {new Date().getFullYear()} GameNite · Play. Laugh. Repeat. 🎉</p>
</footer>

<style>
  /* Fun font */
  body {
    font-family: "Baloo 2", cursive, system-ui, sans-serif;
    margin: 0;
    background: #fef9f9;
    color: #333;
  }

  header {
    background: linear-gradient(90deg, #ff6f61, #a39362ff);
    padding: 1rem 2rem;
    color: #fff;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .links {
    display: flex;
    gap: 1.2rem;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  nav a:hover {
    transform: scale(1.1);
    color: #222;
  }

  nav a.btn {
    background: #fff;
    color: #222;
    padding: 0.4rem 0.9rem;
    border-radius: 12px;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  nav a.btn:hover {
    background: #ffd54f;
    transform: scale(1.05);
  }

  main {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .card {
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }

  footer {
    background: #222;
    color: #eee;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
    border-top: 4px solid #ff6f61;
  }
</style>
