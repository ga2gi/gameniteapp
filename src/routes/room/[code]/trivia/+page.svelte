<script>
  import { onMount } from "svelte";

  let categories = [];
  let selectedCategory = "";
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let timeLeft = 20;
  let showResult = false;
  let gameStarted = false;
  let answered = false;
  let selectedOption = "";
  let timer;

  onMount(async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const data = await res.json();
    categories = data.trivia_categories;
  });

  async function startGame() {
    if (!selectedCategory) return alert("Please select a category!");
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&type=multiple`
    );
    const data = await res.json();
    questions = data.results.map((q) => {
      const options = [...q.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * 4);
      options.splice(randomIndex, 0, q.correct_answer);
      return { question: q.question, options, answer: q.correct_answer };
    });
    currentIndex = 0;
    score = 0;
    showResult = false;
    gameStarted = true;
    answered = false;
    selectedOption = "";
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timer = setInterval(() => {
      timeLeft -= 0.1; // smooth decrement
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 100);
  }

  function answerQuestion(option) {
    if (answered) return;
    answered = true;
    selectedOption = option;
    if (option === questions[currentIndex].answer) score++;
    clearInterval(timer);
    setTimeout(() => nextQuestion(), 1500);
  }

  function nextQuestion() {
    answered = false;
    selectedOption = "";
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      startTimer();
    } else {
      showResult = true;
      gameStarted = false;
    }
  }

  function optionClass(option) {
    if (!answered) return "";
    if (option === questions[currentIndex].answer) return "correct";
    if (option === selectedOption && option !== questions[currentIndex].answer)
      return "wrong";
    return "";
  }
</script>

<style>
  .container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
    font-family: "Baloo 2", cursive, system-ui, sans-serif;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ff6f61;
  }

  select {
    padding: 0.8rem 1.2rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    border: 2px solid #ff6f61;
    font-size: 1rem;
    font-weight: bold;
    background: #fff;
    cursor: pointer;
    transition: 0.3s ease;
  }

  select:hover {
    border-color: #42a5f5;
  }

  button {
    padding: 0.9rem 1.5rem;
    margin: 0.5rem;
    border-radius: 12px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    opacity: 0.9;
  }

  .start-btn {
    background: #42a5f5;
    color: #fff;
  }

  .question {
    font-size: 1.3rem;
    margin: 1rem 0;
    min-height: 60px;
  }

  .options {
    display: grid;
    gap: 0.7rem;
  }

  .option-btn {
    padding: 1rem;
    border-radius: 15px;
    border: 2px solid #ccc;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;
    background: #fef9f9;
  }

  .option-btn:hover {
    transform: scale(1.03);
    border-color: #ff6f61;
  }

  .option-btn.correct {
    background: #16a34a;
    color: white;
    border-color: #16a34a;
  }

  .option-btn.wrong {
    background: #dc2626;
    color: white;
    border-color: #dc2626;
  }

  .timer-container {
    background: #ddd;
    border-radius: 10px;
    height: 15px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .timer-bar {
    height: 100%;
    transition: width 0.1s linear, background 0.3s ease;
  }

  .result {
    font-size: 1.5rem;
    font-weight: bold;
    color: #222;
    margin-bottom: 1rem;
  }
</style>

<div class="container">
  <h1>🎯 Trivia Challenge</h1>

  {#if !gameStarted && !showResult}
    <select bind:value={selectedCategory}>
      <option value="">Select Category</option>
      {#each categories as cat}
        <option value={cat.id}>{cat.name}</option>
      {/each}
    </select>
    <br />
    <button class="start-btn" on:click={startGame}>Start Game</button>
  {/if}

  {#if gameStarted && questions.length}
    <div class="timer-container">
      <div
        class="timer-bar"
        style="width: {(timeLeft / 10) * 100}%; background: {timeLeft <= 5 ? '#dc2626' : '#16a34a'}"
      ></div>
    </div>

    <div class="question">
      {currentIndex + 1}. {questions[currentIndex].question}
    </div>

    <div class="options">
      {#each questions[currentIndex].options as option}
        <button
          class="option-btn {optionClass(option)}"
          on:click={() => answerQuestion(option)}
        >
          {option}
        </button>
      {/each}
    </div>
  {/if}

  {#if showResult}
    <div class="result">
      🎉 Game Over! <br />
      Your Score: {score} / {questions.length}
    </div>
    <button class="start-btn" on:click={startGame}>Play Again</button>
  {/if}
</div>
