<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Extract room code from URL
  $: roomCode = $page.params.code;

  // Mock trivia questions
  let questions = [
    {
      question: "What's the capital of Kenya?",
      options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
      correct: 0
    },
    {
      question: "Which year did Kenya gain independence?",
      options: ["1960", "1963", "1970", "1955"],
      correct: 1
    },
    {
      question: "Who is the author of 'Weep Not, Child'?",
      options: ["Ngugi wa Thiong'o", "Chinua Achebe", "Wole Soyinka", "Nadine Gordimer"],
      correct: 0
    }
  ];

  let currentIndex = 0;
  let selected = null;
  let score = 0;
  let showResult = false;

  // Timer for each question
  let timeLeft = 5; // 5 seconds
  let timer;

  const nextQuestion = () => {
    if (selected === questions[currentIndex].correct) score++;
    selected = null;
    currentIndex++;
    timeLeft = 5;

    if (currentIndex >= questions.length) {
      showResult = true;
      clearInterval(timer);
    }
  };

  const selectOption = (index) => {
    selected = index;
  };

  onMount(() => {
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) nextQuestion();
    }, 1000);
  });
</script>

<div class="trivia-container">
  <h1>🧠 Trivia - Room {roomCode}</h1>

  {#if showResult}
    <div class="result">
      <h2>Your Score: {score} / {questions.length}</h2>
      <a href={`/room/${roomCode}`} class="btn">Back to Room Lobby</a>
    </div>
  {:else}
    <div class="question-card">
      <p class="timer">Time Left: {timeLeft}s</p>
      <h2>{questions[currentIndex].question}</h2>
      <div class="options">
        {#each questions[currentIndex].options as option, i}
          <button 
            class:selected={selected === i} 
            on:click={() => selectOption(i)}
          >
            {option}
          </button>
        {/each}
      </div>
      <button class="btn next" on:click={nextQuestion}>Next</button>
    </div>
  {/if}
</div>

<style>
  .trivia-container {
    max-width: 600px;
    margin: 2rem auto;
    font-family: "Baloo 2", cursive, system-ui, sans-serif;
    text-align: center;
  }

  h1 { color: #42a5f5; }
  .question-card { 
    background: #fff; 
    padding: 2rem; 
    border-radius: 16px; 
    box-shadow: 0 6px 12px rgba(0,0,0,0.1); 
  }

  .timer {
    font-weight: bold;
    margin-bottom: 1rem;
    color: #e53935;
  }

  button {
    display: block;
    width: 100%;
    padding: 0.7rem;
    margin: 0.5rem 0;
    border-radius: 12px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  button:hover { transform: translateY(-2px); }

  button.selected { background: #42a5f5; color: #fff; }

  .btn.next {
    margin-top: 1rem;
    background: #ff6f61;
    color: #fff;
  }

  .btn.next:hover { background: #e53935; }

  .result {
    background: #fff;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  .result h2 { color: #66bb6a; }
  .result .btn { background: #42a5f5; color: #fff; text-decoration: none; padding: 0.7rem 1.2rem; border-radius: 12px; display: inline-block; margin-top: 1rem; }
  .result .btn:hover { background: #1e88e5; }
</style>
