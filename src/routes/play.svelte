<script>
  import { questions } from '$lib/questions'
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  let current = 0
  let score = 0
  let selected = null
  let finished = false
  let message = ''
  let user

  onMount(async () => {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  })

  function selectOption(index) {
    selected = index
  }

  function nextQuestion() {
    if (selected === questions[current].correct) {
      score++
    }
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
      message = "Please log in to save your score"
      return
    }
    const { error } = await supabase
      .from('scores')
      .insert([{ user_id: user.id, score }])

    message = error ? error.message : `Game over! You scored ${score} points.`
  }
</script>

{#if !finished}
  <h2>Question {current + 1} of {questions.length}</h2>
  <p>{questions[current].question}</p>
  <ul>
    {#each questions[current].options as option, i}
      <li>
        <button
          class:selected={selected === i}
          on:click={() => selectOption(i)}>
          {option}
        </button>
      </li>
    {/each}
  </ul>
  <button on:click={nextQuestion} disabled={selected === null}>Next</button>
{:else}
  <h2>Game Finished</h2>
  <p>{message}</p>
{/if}

<style>
  button.selected {
    background-color: #22c55e; /* green */
    color: white;
  }
</style>
