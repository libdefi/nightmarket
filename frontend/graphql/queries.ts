import { gql } from '@apollo/client';

export const GET_BETS = gql`
  {
    betPlaceds {
      id
      bettor
      option
      amount
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
