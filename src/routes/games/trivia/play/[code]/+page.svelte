<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { getCurrentUser } from '$lib/auth';
  export let params;
  const code = params.code;
  let room, instance, user, selected=null, score=0, timer=12, questions=[] , interval, channel;

  async function load() {
    const { data: r } = await supabase.from('rooms').select('*').eq('join_code', code).single();
    room = r;
    const { data: inst } = await supabase.from('game_instances').select('*').eq('room_id', room.id).limit(1);
    instance = inst?.[0];
    questions = instance?.questions ?? [];
  }

  async function answer(key) {
    // submit to trivia_answers table
    const q = questions[instance.current_index];
    const is_correct = key === q.correct_option;
    const currentUser = await getCurrentUser();
    await supabase.from('trivia_answers').insert([{ room_id: room.id, question_id: q.id, user_id: currentUser.id, answer: key, is_correct }]);
    if (is_correct) score++;
    // optionally let host advance or advance automatically after a delay
  }

  // subscribe to instance changes
  onMount(async ()=>{
    await load();
    channel = supabase.channel(`game:${room.id}`);
    channel.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'game_instances', filter:`room_id=eq.${room.id}` }, (payload) =>{
      instance = payload.new;
      questions = instance.questions;
    });
    await channel.subscribe();
  });

  onDestroy(()=> { if(channel) supabase.removeChannel(channel);});
</script>

{#if !instance}
  <div class="card">Waiting for host to start game...</div>
{:else}
  <div class="card">
    <h2>{questions[instance.current_index]?.question}</h2>
    <div class="options">
      {#each Object.entries(questions[instance.current_index].options) as [k,v]}
        <button on:click={()=>answer(k)}>{k}: {v}</button>
      {/each}
    </div>
    <p>Score: {score}</p>
  </div>
{/if}
