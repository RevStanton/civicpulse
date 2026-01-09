<script>
  let loading = true;
  let error = '';
  let tallies = { yes: 0, no: 0, abstain: 0 };
  let total = 0;

  async function loadResults() {
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load results');
      }
      tallies = data.tallies;
      total = data.total;
    } catch (e) {
      error = e.message || 'Something went wrong.';
    } finally {
      loading = false;
    }
  }

  loadResults();
</script>

<main class="page">
  <h1>CivicPulse — Results</h1>
  <p><a href="/">← Back to voting</a></p>

  {#if loading}
    <p>Loading results…</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <section class="card">
      <h2>Current tallies</h2>
      <ul>
        <li>Support: <strong>{tallies.yes}</strong></li>
        <li>Oppose: <strong>{tallies.no}</strong></li>
        <li>Undecided / abstain: <strong>{tallies.abstain}</strong></li>
      </ul>
      <p>Total recorded votes: <strong>{total}</strong></p>
    </section>
  {/if}
</main>

<style>
  .page {
    max-width: 720px;
    margin: 2rem auto;
    padding: 1.5rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1rem;
  }
  .error {
    color: #b00020;
  }
</style>
