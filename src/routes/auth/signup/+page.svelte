<script>
  import { supabase } from '$lib/supabaseClient'
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let username = ''
  let error = ''
  let loading = false

  async function signup() {
    loading = true
    error = ''

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    })

    loading = false

    if (err) {
      error = err.message
    } else {
      goto('/auth/login') // redirect to login after signup
    }
  }
</script>

<div class="auth-container">
  <h2>Sign Up</h2>
  {#if error}<p class="error">{error}</p>{/if}
  
  <input type="text" placeholder="Username" bind:value={username} />
  <input type="email" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  
  <button on:click={signup} disabled={loading}>
    {loading ? 'Signing up…' : 'Sign Up'}
  </button>
  
  <p>Already have an account? <a href="/auth/login">Login</a></p>
</div>

<style>
  .auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.75rem;
    background: #22c55e;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }
  button:disabled { opacity: 0.6; cursor: not-allowed; }
  .error { color: red; font-size: 0.9rem; }
</style>
