<script>
  import { supabase } from '$lib/supabaseClient'
  let email = ''
  let password = ''
  let message = ''

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password })
    message = error ? error.message : "Check your email to confirm sign up"
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    message = error ? error.message : "Signed in!"
  }
</script>

<h1>Nationwide Trivia Auth</h1>
<input bind:value={email} placeholder="Email" />
<input bind:value={password} placeholder="Password" type="password" />
<button on:click={signUp}>Sign Up</button>
<button on:click={signIn}>Sign In</button>
<p>{message}</p>
