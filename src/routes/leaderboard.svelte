<script>
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  let players = []

  onMount(async () => {
    const { data, error } = await supabase
      .from('weekly_scores')
      .select('rank, total_score, users(username)')
      .order('rank', { ascending: true })
      .limit(20)
    if (!error) players = data
  })
</script>

<h1>Weekly Leaderboard</h1>
<ol>
  {#each players as p}
    <li>{p.users.username} — {p.total_score} pts (Rank {p.rank})</li>
  {/each}
</ol>
