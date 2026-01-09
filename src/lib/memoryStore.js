const votes = [];

export function addVote(vote) {
  votes.push(vote);
}

export function getVotes() {
  return votes;
}

export function findVoteByReceipt(receipt) {
  return votes.find((v) => v.receipt === receipt);
}

export function getTallies() {
  const tallies = { yes: 0, no: 0, abstain: 0 };
  for (const v of votes) {
    if (tallies[v.choice] !== undefined) tallies[v.choice]++;
  }
  return tallies;
}
