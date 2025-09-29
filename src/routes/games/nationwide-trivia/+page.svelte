<script>
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  // sample questions for now
  const questions = [
    { q: "Capital of Kenya?", options: ["Nairobi", "Mombasa", "Kisumu", "Eldoret"], correct: 0 },
    { q: "Planet called Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correct: 2 },
    { q: "Who wrote 'Things Fall Apart'?", options: ["Ngugi", "Achebe", "Soyinka", "Okot"], correct: 1 }
  ]

  let current = 0
  let score = 0
  let selected = null
  let finished = false
  let message = ""
  let user

  onMount(async () => {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  })

  function chooseAnswer(i) {
    selected = i
  }

  function nextQuestion() {
    if (selected === questions[current].correct) score++
    selected = null

    if (current < questions.length - 1) {
      current++
    } else {
      finished = true
      submitScore()
    }
  }

  async function submitScore() {
    if (!user) {
      message = "Login required to save score"
      return
    }
    const { error } = await supabase.from("scores").insert([
      { user_id: user.id, score }
    ])
    message = error ? error.message : `You scored ${score}/${questions.length}!`
  }
</script>

<div class="game">
  {#if !finished}
    <h2>Question {current + 1} of {questions.length}</h2>
    <p>{questions[current].q}</p>
    <div class="options">
      {#each questions[current].options as option, i}
        <button
          class:selected={selected === i}
          on:click={() => chooseAnswer(i)}>
          {option}
        </button>
      {/each}
    </div>
    <button disabled={selected === null} on:click={nextQuestion}>
      {current === questions.length - 1 ? "Finish" : "Next"}
    </button>
  {:else}
    <h2>Game Over</h2>
    <p>{message}</p>
    <a href="/leaderboard">View Leaderboard</a>
  {/if}
</div>

<style>
  .game {
    max-width: 600px;
    margin: auto;
    text-align: center;
    padding: 1rem;
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  button {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    background: #f3f3f3;
    cursor: pointer;
  }
  button.selected {
    background: #22c55e;
    color: white;
  }
</style>
