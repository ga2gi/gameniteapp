<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  import { page } from "$app/stores";

  let roomCode: string;
  let roomId: string;
  let questions: any[] = [];
  let currentQuestionIndex = 0;
  let currentQuestion: any = null;
  let timer = 5;
  let interval: any;

  let userAnswer: string | null = null;
  let feedback: string | null = null;

  $: roomCode = $page.params.code;

  async function getRoom() {
    const { data, error } = await supabase
      .from("game_rooms")
      .select("id")
      .eq("code", roomCode)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    roomId = data.id;
    return data;
  }

  async function loadQuestions() {
    const { data, error } = await supabase
      .from("trivia_questions")
      .select("*")
      .limit(10);

    if (error) console.error(error);
    else {
      questions = data;
      nextQuestion();
    }
  }

  function startTimer() {
    timer = 5;
    clearInterval(interval);
    interval = setInterval(() => {
      timer -= 1;
      if (timer <= 0) {
        clearInterval(interval);
        lockAnswer();
      }
    }, 1000);
  }

  function nextQuestion() {
    feedback = null;
    userAnswer = null;

    if (currentQuestionIndex >= questions.length) {
      currentQuestion = null;
      return;
    }

    currentQuestion = questions[currentQuestionIndex];
    currentQuestionIndex += 1;
    startTimer();
  }

  function selectAnswer(option: string) {
    if (!userAnswer) {
      userAnswer = option;
    }
  }

  function lockAnswer() {
    if (!currentQuestion) return;

    if (userAnswer === currentQuestion.correct_option) {
      feedback = "✅ Correct!";
    } else {
      feedback = `❌ Wrong! Correct was ${currentQuestion.correct_option.toUpperCase()}`;
    }

    // wait 2s before next question
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  }

  onMount(async () => {
    await getRoom();
    await loadQuestions();
  });
</script>

<div class="p-6">
  <h1 class="text-2xl font-bold mb-4">Trivia - Room {roomCode}</h1>

  {#if currentQuestion}
    <div class="mb-4">
      <p class="text-lg font-semibold">{currentQuestion.question}</p>
      <p class="text-gray-600">⏳ {timer} seconds left</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <button
        class="bg-blue-500 text-white p-3 rounded"
        on:click={() => selectAnswer('a')}
        disabled={!!userAnswer}
      >
        {currentQuestion.option_a}
      </button>
      <button
        class="bg-blue-500 text-white p-3 rounded"
        on:click={() => selectAnswer('b')}
        disabled={!!userAnswer}
      >
        {currentQuestion.option_b}
      </button>
      <button
        class="bg-blue-500 text-white p-3 rounded"
        on:click={() => selectAnswer('c')}
        disabled={!!userAnswer}
      >
        {currentQuestion.option_c}
      </button>
      <button
        class="bg-blue-500 text-white p-3 rounded"
        on:click={() => selectAnswer('d')}
        disabled={!!userAnswer}
      >
        {currentQuestion.option_d}
      </button>
    </div>

    {#if userAnswer && !feedback}
      <button
        on:click={lockAnswer}
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        Lock Answer
      </button>
    {/if}

    {#if feedback}
      <p class="mt-4 font-bold">{feedback}</p>
    {/if}
  {:else}
    <p class="text-lg">🎉 Game Over! You answered {currentQuestionIndex} questions.</p>
    <a href={"/room/" + roomCode} class="bg-gray-600 text-white px-4 py-2 rounded mt-4 inline-block">
      Back to Lobby
    </a>
  {/if}
</div>
