<script>
  let menuOpen = false;

  const toggleMenu = () => (menuOpen = !menuOpen);
  const closeMenu = () => (menuOpen = false);
</script>

<header class="navbar">
  <div class="logo">ChezaNite</div>

  <nav class="nav-links">
    <a href="/">Home</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/room">Room</a>
    <a href="/nationwide">nationwideGames</a>
  </nav>

  <button class="menu-btn" on:click={toggleMenu}>
    {#if menuOpen} ✖ {:else} ☰ {/if}
  </button>
</header>

{#if menuOpen}
  <div class="mobile-menu">
    <a href="/" on:click={closeMenu}>Home</a>
    <a href="/dashboard" on:click={closeMenu}>Dashboard</a>
    <a href="/room" on:click={closeMenu}>Room</a>
    <a href="/trivia" on:click={closeMenu}>Trivia</a>
  </div>
{/if}

<main class="content">
  <slot />
</main>

<footer class="footer">
  © {new Date().getFullYear()} <span>ChezaNite</span> — Play, Connect & Compete!
</footer>

<style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f9fafc;
    color: #333;
  }

  /* Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(90deg, #7eab8eff, #3e5a4aff);
    color: white;
    padding: 1rem 2rem;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .logo {
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -1px;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }

  .nav-links a:hover {
    opacity: 0.7;
  }

  /* Mobile menu button */
  .menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: white;
    cursor: pointer;
  }

  /* Mobile Menu */
  .mobile-menu {
    display: flex;
    flex-direction: column;
    background: white;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    border-top: 2px solid #45685bff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .mobile-menu a {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #333;
    text-decoration: none;
    font-weight: 500;
  }

  .mobile-menu a:hover {
    background: #f4f4f4;
  }

  /* Main content */
  .content {
    padding: 2rem;
    min-height: calc(100vh - 140px);
  }

  /* Footer */
  .footer {
    text-align: center;
    background-color: #222;
    color: #ccc;
    padding: 1.2rem;
    font-size: 0.9rem;
  }

  .footer span {
    color: #ff4d79;
    font-weight: 600;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .menu-btn {
      display: block;
    }
  }
</style>
