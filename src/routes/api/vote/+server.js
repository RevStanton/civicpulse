import { json } from '@sveltejs/kit';
import { generateReceipt } from '$lib/receipt.js';
import { addVote } from '$lib/memoryStore.js';

const EMPTY_TALLIES = { yes: 0, no: 0, abstain: 0, total: 0 };

async function persistVoteToKV(platform, vote) {
  const kv = platform?.env?.VOTES;
  if (!kv) return; // no KV bound (local dev, or misconfig)

  const receiptKey = `vote:${vote.receipt}`;

  // Store the full vote object
  await kv.put(receiptKey, JSON.stringify(vote));

  // Update aggregated tallies
  const existing = await kv.get('tallies', 'json');
  const tallies = existing ?? { ...EMPTY_TALLIES };

  tallies[vote.choice] = (tallies[vote.choice] ?? 0) + 1;
  tallies.total = (tallies.total ?? 0) + 1;

  await kv.put('tallies', JSON.stringify(tallies));
}

export async function POST({ request, platform }) {
  const { choice } = await request.json();

  if (!['yes', 'no', 'abstain'].includes(choice)) {
    return json({ error: 'Invalid choice' }, { status: 400 });
  }

  const receipt = generateReceipt();
  const vote = {
    choice,
    receipt,
    timestamp: new Date().toISOString()
  };

  // Always record locally for dev
  addVote(vote);

  // Persist to KV in production
  await persistVoteToKV(platform, vote);

  return json({ success: true, receipt });
}
