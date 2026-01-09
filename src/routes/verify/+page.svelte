<script>
  let receipt = '';
  let loading = false;
  let error = '';
  let result = null;

  async function verify() {
    error = '';
    result = null;

    if (!receipt.trim()) {
      error = 'Please enter your receipt code.';
      return;
    }

    loading = true;
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receipt })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }
      result = data;
    } catch (e) {
      error = e.message || 'Something went wrong.';
    } finally {
      loading = false;
    }
  }
</script>

<main class="page">
  <h1>Verify Your Vote</h1>
  <p><a href="/">← Back to voting</a></p>

  <section class="card">
    <p>Enter the receipt code you were given after voting.</p>

    <form on:submit|preventDefault={verify}>
      <input
        type="text"
        bind:value={receipt}
        placeholder="ABC-123-XYZ"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Verifying…' : 'Verify'}
      </button>
    </form>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if result}
      {#if result.found}
        <div class="result ok">
          <p>Receipt found.</p>
          <p>Your recorded choice: <strong>{result.choice}</strong></p>
          <p>Timestamp: {result.timestamp}</p>
        </div>
      {:else}
        <div class="result">
          <p>No vote found for that receipt code.</p>
        </div>
      {/if}
    {/if}
  </section>
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

  form {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  input {
    flex: 1;
    min-width: 200px;
    padding: 0.4rem 0.6rem;
  }

  button {
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .error {
    color: #b00020;
    margin-top: 0.5rem;
  }

  .result {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    background: #f5f5f5;
  }

  .result.ok {
    background: #e7f6ec;
  }
</style>
