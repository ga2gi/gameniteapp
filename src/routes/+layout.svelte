<script lang="ts">
  import "../app.css";                         // import global CSS
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  // keep layout minimal — slot will render page content
</script>

<svelte:head>
  <!-- Google fonts (optional) -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>My Project • GameNite</title>
</svelte:head>

<div class="app">
  <Header />
  <main class="container" style="padding-top:1.5rem; padding-bottom:1.5rem;">
    <slot />
  </main>
  <Footer />
</div>
