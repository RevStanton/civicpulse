import { json } from '@sveltejs/kit';
import { findVoteByReceipt } from '$lib/memoryStore.js';



export async function POST({ request }) {
  const { receipt } = await request.json();

  if (!receipt) {
    return json({ error: 'Receipt is required' }, { status: 400 });
  }

  const vote = findVoteByReceipt(receipt.trim().toUpperCase());

  if (!vote) {
    return json({ found: false });
  }

  return json({
    found: true,
    choice: vote.choice,
    timestamp: vote.timestamp
  });
}
