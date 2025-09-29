<script>
  import { supabase } from '$lib/supabaseClient'
  import { goto } from '$app/navigation'

  onMount(async () => {
    await supabase.auth.signOut()
    goto('/auth/login')
  })
</script>

<p>Logging out…</p>
