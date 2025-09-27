<script>
  // In future you can fetch game list from backend.
  const cards = [
    { href:'/games/nationwide-trivia', title:'Nationwide Trivia (Solo)', desc:'Solo timed quiz with national leaderboard.' },
    { href:'/games/trivia', title:'Trivia (Group)', desc:'Host or join trivia rooms.' },
    { href:'/games/imposter', title:'Imposter', desc:'Social deduction — coming soon.' },
    { href:'/games/murder-mystery', title:'Murder Mystery', desc:'Group game — coming soon.' },
    { href:'/games/charades', title:'Charades', desc:'In-person or virtual — coming soon.' }
  ];
</script>

<h2 style="font-family:var(--font-heading); font-size:1.6rem;">Games Dashboard</h2>
<p style="color:var(--color-muted); margin-bottom:1rem;">Choose a game to start — some are coming soon.</p>

<div class="grid">
  {#each cards as c}
    <a class="card" href={c.href} style="display:block; text-decoration:none; color:inherit;">
      <h3 style="margin:0 0 0.5rem;">{c.title}</h3>
      <p style="color:var(--color-muted); margin:0 0 1rem;">{c.desc}</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="btn btn-primary" style="font-size:0.9rem;">Open</span>
        {#if c.title.includes('(Coming Soon)') }
          <small style="color:var(--color-muted)">Soon</small>
        {/if}
      </div>
    </a>
  {/each}
</div>
