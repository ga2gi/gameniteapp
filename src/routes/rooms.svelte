<script>
  import { supabase } from '$lib/supabaseClient'
  import { onMount } from 'svelte'

  let code = ""
  let user
  let message = ""

  onMount(async () => {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  })

  async function createRoom(gameType) {
    const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase()

    const { data: room, error } = await supabase
      .from("rooms")
      .insert([{ game_type: gameType, code: roomCode }])
      .select()
      .single()

    if (error) {
      message = error.message
      return
    }

    await supabase.from("room_players").insert([
      { room_id: room.id, user_id: user.id, username: user.email }
    ])

    message = `Room created! Share code: ${room.code}`
  }

  async function joinRoom() {
    const { data: room, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", code)
      .single()

    if (error || !room) {
      message = "Room not found"
      return
    }

    await supabase.from("room_players").insert([
      { room_id: room.id, user_id: user.id, username: user.email }
    ])

    message = `Joined room: ${room.code}`
  }
</script>

<h1>Game Rooms</h1>
<div>
  <button on:click={() => createRoom("trivia")}>Create Trivia Room</button>
  <button on:click={() => createRoom("charades")}>Create Charades Room</button>
  <button on:click={() => createRoom("mystery")}>Create Murder Mystery Room</button>
  <button on:click={() => createRoom("imposter")}>Create Imposter Room</button>
</div>

<h2>Join Room</h2>
<input bind:value={code} placeholder="Enter code" />
<button on:click={joinRoom}>Join</button>
<p>{message}</p>
