<script>
  import { supabase } from '$lib/supabaseClient'
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let error = ''
  let loading = false

  async function login() {
    loading = true
    error = ''

    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    loading = false

    if (err) {
      error = err.message
    } else {
      goto('/') // redirect to homepage or dashboard
    }
  }
</script>

<div class="auth-container">
  <h2>Login</h2>
  {#if error}<p class="error">{error}</p>{/if}
  
  <input type="email" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  
  <button on:click={login} disabled={loading}>
    {loading ? 'Logging in…' : 'Login'}
  </button>
  
  <p>Don’t have an account? <a href="/auth/signup">Sign up</a></p>
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
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }
  button:disabled { opacity: 0.6; cursor: not-allowed; }
  .error { color: red; font-size: 0.9rem; }
</style>
