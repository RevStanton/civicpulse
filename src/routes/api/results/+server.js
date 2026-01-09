import { json } from '@sveltejs/kit';
import { getTallies, getVotes } from '$lib/memoryStore.js';

const EMPTY_TALLIES = { yes: 0, no: 0, abstain: 0, total: 0 };

async function getTalliesFromKV(platform) {
  const kv = platform?.env?.VOTES;
  if (!kv) return null;

  const stored = await kv.get('tallies', 'json');
  return stored ?? { ...EMPTY_TALLIES };
}

export async function GET({ platform }) {
  const kvTallies = await getTalliesFromKV(platform);

  if (kvTallies) {
    const { yes = 0, no = 0, abstain = 0, total } = kvTallies;
    const computedTotal = total ?? yes + no + abstain;

    return json({
      tallies: { yes, no, abstain },
      total: computedTotal
    });
  }

  // Fallback: in-memory (local dev)
  return json({
    tallies: getTallies(),
    total: getVotes().length
  });
}
