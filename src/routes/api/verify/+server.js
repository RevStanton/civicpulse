import { json } from '@sveltejs/kit';
import { findVoteByReceipt } from '$lib/memoryStore.js';

async function findVoteInKV(platform, receipt) {
  const kv = platform?.env?.VOTES;
  if (!kv) return null;

  const vote = await kv.get(`vote:${receipt}`, 'json');
  return vote;
}

export async function POST({ request, platform }) {
  const { receipt } = await request.json();

  if (!receipt || typeof receipt !== 'string') {
    return json({ error: 'Receipt is required' }, { status: 400 });
  }

  const normalized = receipt.trim().toUpperCase();

  // Try KV first (production)
  const kvVote = await findVoteInKV(platform, normalized);
  if (kvVote) {
    return json({
      found: true,
      choice: kvVote.choice,
      timestamp: kvVote.timestamp
    });
  }

  // Fallback to in-memory (local dev)
  const localVote = findVoteByReceipt(normalized);
  if (!localVote) {
    return json({ found: false });
  }

  return json({
    found: true,
    choice: localVote.choice,
    timestamp: localVote.timestamp
  });
}
