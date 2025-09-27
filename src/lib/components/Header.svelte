<script lang="ts">
  // nothing fancy — static nav for now
</script>

<header class="app-header">
  <div class="brand">
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="10" fill="var(--color-primary)" />
      <text x="12" y="16" font-size="12" text-anchor="middle" fill="#fff" font-family="sans-serif">GN</text>
    </svg>
    <span>My Project</span>
  </div>

  <nav class="nav-links" aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/dashboard">Games</a>
    <a href="/profile">Profile</a>
    <a href="/signup" class="btn btn-ghost" style="margin-left:1rem">Sign up</a>
  </nav>
</header>
