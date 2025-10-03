<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";

  let creating = false;
  let errorMessage: string | null = null;

  // generate short code like "AB123"
  function generateCode(length = 5) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  async function createRoom() {
    creating = true;
    errorMessage = null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      errorMessage = "You must be signed in to create a room.";
      creating = false;
      return;
    }

    const code = generateCode();

    // 1. create the room
    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .insert([{ code, host_id: userData.user.id }])
      .select()
      .single();

    if (roomError) {
      errorMessage = roomError.message;
      creating = false;
      return;
    }

    // 2. add host as a player
    const { error: playerError } = await supabase.from("game_players").insert([{
      room_id: room.id,
      user_id: userData.user.id,
      name: userData.user.email || "Host",
      is_host: true
    }]);

    if (playerError) {
      errorMessage = playerError.message;
      creating = false;
      return;
    }

    // 3. redirect to /room/[code]
    goto(`/room/${code}`);
  }
</script>

<div class="p-6 flex flex-col items-center">
  <h1 class="text-2xl font-bold mb-6">Create a New Room</h1>

  <button
    on:click={createRoom}
    class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
    disabled={creating}
  >
    {creating ? "Creating..." : "Create Room"}
  </button>

  {#if errorMessage}
    <p class="text-red-500 mt-4">{errorMessage}</p>
  {/if}
</div>
