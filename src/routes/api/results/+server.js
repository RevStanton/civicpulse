import { json } from '@sveltejs/kit';
import { getTallies, getVotes } from '$lib/memoryStore.js';



export async function GET() {
  return json({
    tallies: getTallies(),
    total: getVotes().length
  });
}
