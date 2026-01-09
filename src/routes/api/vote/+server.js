import { json } from '@sveltejs/kit';
import { generateReceipt } from '$lib/receipt.js';
import { addVote } from '$lib/memoryStore.js';



export async function POST({ request }) {
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

  addVote(vote);

  return json({ success: true, receipt });
}
