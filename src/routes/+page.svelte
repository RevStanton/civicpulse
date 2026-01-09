<script>
  let choice = '';
  let submitting = false;
  let receipt = '';
  let error = '';

  const question =
    'Do you support or oppose the United States taking further military action in Venezuela?';

  async function submitVote() {
    error = '';
    receipt = '';

    if (!choice) {
      error = 'Please select an option before voting.';
      return;
    }

    submitting = true;

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      receipt = data.receipt;
      choice = '';
    } catch (e) {
      error = e.message || 'Something went wrong.';
    } finally {
      submitting = false;
    }
  }
</script>

<main class="page">
  <section class="hero">
    <h1>CivicPulse</h1>
    <p class="tagline">
      A transparent, anonymous way to capture the real-time pulse of public opinion.
    </p>
  </section>

  <section class="card">
    <h2>Current Question</h2>
    <p class="question">{question}</p>

    <form on:submit|preventDefault={submitVote}>
      <div class="options">
        <label>
          <input type="radio" bind:group={choice} value="yes" />
          Support
        </label>
        <label>
          <input type="radio" bind:group={choice} value="no" />
          Oppose
        </label>
        <label>
          <input type="radio" bind:group={choice} value="abstain" />
          Undecided / Prefer not to say
        </label>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Vote'}
      </button>
    </form>

    {#if receipt}
      <div class="receipt">
        <h3>Your vote was recorded.</h3>
        <p>Receipt code: <strong>{receipt}</strong></p>
        <p>
          Save this code if you want to verify your vote later on the
          <a href="/verify">verification page</a>.
        </p>
      </div>
    {/if}
  </section>

  <section class="links">
    <a href="/results">View live results</a>
    <span>·</span>
    <a href="/verify">Verify a receipt</a>
  </section>
</main>

<style>
  .page {
    max-width: 720px;
    margin: 2rem auto;
    padding: 1.5rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .hero h1 {
    font-size: 2.4rem;
    margin-bottom: 0.25rem;
  }

  .tagline {
    color: #555;
    margin-bottom: 1.5rem;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .question {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .options label {
    display: block;
    margin-bottom: 0.5rem;
  }

  button {
    margin-top: 0.75rem;
    padding: 0.5rem 1.25rem;
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

  .receipt {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .links {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    color: #555;
  }
</style>
