export const calculateSingleBet = (bet: bigint | undefined): string => {
  if (bet === undefined) {
    return '0';
  }
  const formattedBet = Number(bet) / 10 ** 18;
  return formattedBet.toLocaleString();
};

export const calculateTotalBets = (bets: readonly bigint[] | undefined): string => {
  if (bets === undefined) {
    return '0';
  }
  const totalSum = bets.reduce((sum, bet) => sum + bet, BigInt(0));
  const formattedSum = Number(totalSum) / 10 ** 18;
  return formattedSum.toLocaleString();
};

export const formatBigInt = (bigInt: bigint | undefined): string => {
  if (bigInt === undefined) {
    return '0';
  }
  const formattedValue = Number(bigInt) / 10 ** 18;
  return formattedValue.toLocaleString();
};
