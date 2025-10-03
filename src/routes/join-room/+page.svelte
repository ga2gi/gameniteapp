<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";

  let roomCode = "";
  let joining = false;
  let errorMessage: string | null = null;

  async function joinRoom() {
    joining = true;
    errorMessage = null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      errorMessage = "You must be signed in to join a room.";
      joining = false;
      return;
    }

    // 1. check if room exists
    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .select("id, code")
      .eq("code", roomCode.toUpperCase())
      .single();

    if (roomError || !room) {
      errorMessage = "Room not found. Check the code.";
      joining = false;
      return;
    }

    // 2. add player to room
    const { error: playerError } = await supabase.from("game_players").insert([{
      room_id: room.id,
      user_id: userData.user.id,
      name: userData.user.email || "Player",
      is_host: false
    }]);

    if (playerError) {
      errorMessage = playerError.message;
      joining = false;
      return;
    }

    // 3. redirect to /room/[code]
    goto(`/room/${room.code}`);
  }
</script>

<div class="p-6 flex flex-col items-center">
  <h1 class="text-2xl font-bold mb-6">Join a Room</h1>

  <input
    type="text"
    placeholder="Enter Room Code"
    bind:value={roomCode}
    class="border px-4 py-2 rounded mb-4 uppercase"
  />

  <button
    on:click={joinRoom}
    class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
    disabled={joining}
  >
    {joining ? "Joining..." : "Join Room"}
  </button>

  {#if errorMessage}
    <p class="text-red-500 mt-4">{errorMessage}</p>
  {/if}
</div>
