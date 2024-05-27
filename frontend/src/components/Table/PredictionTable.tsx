import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PredictionTableBody from './PredictionTableBody';
import { DarkMarketAbi } from 'constants/DarkMarketAbi';
import { DarkMarketAddress } from 'constants/DarkMarketAddress';
import { calculateSingleBet, formatBigInt } from '../../utils/formatters';
import { useEthPrice } from '../../lib/EthPriceContext';

interface PredictionTableProps {
  data: Array<{
    outcome: string;
    totalBet: string;
    odds: string;
  }>;
  dataUser: readonly bigint[] | undefined;
  onSelectOutcome: (outcome: string, option: number) => void;
  selectedBet: 'YES' | 'NO';
  onSelectBet: (bet: 'YES' | 'NO') => void;
  selectedOption: number | null;
  betDate: string;
}

interface Activity {
  from: string;
  to: string;
  value: string;
}


const PredictionTable: React.FC<PredictionTableProps> = ({
  data,
  dataUser,
  onSelectOutcome,
  selectedBet,
  onSelectBet,
  selectedOption,
  betDate
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { ethPrice } = useEthPrice();

  useEffect(() => {
    if (data && data.length > 0 && selectedOption === null) {
      onSelectOutcome(data[0].outcome, 0);
    }
  }, [data, onSelectOutcome, selectedOption]);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      const provider = new ethers.JsonRpcProvider('https://rpc.garnetchain.com');

      const blockNumber = await provider.getBlockNumber();
      const logs = await provider.getLogs({
        address: DarkMarketAddress,
        fromBlock: blockNumber - 10000,
        toBlock: 'latest'
      });

      const activities = await Promise.all(logs.map(async (log) => {
        const transaction = await provider.getTransaction(log.transactionHash);
        if (!transaction) {
          return null;
        }
        
        return {
          from: transaction.from,
          to: transaction.to,
          value: ethers.formatEther(transaction.value),
          hash: transaction.hash
        };
      }));
      const validActivities: Activity[] = activities.filter(activity => activity !== null) as Activity[];
      setActivities(validActivities);
    };

    fetchRecentTransactions();
  }, []);

  const handleSelectBet = (index: number, bet: 'YES' | 'NO') => {
    onSelectBet(bet);
    onSelectOutcome(data[index]?.outcome, index);
  };



  return (
    <div>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="border-t border-b border-gray-300">
            <th className="px-4 py-2 text-xs text-gray-500">Outcome</th>
            <th className="px-4 py-2 text-xs text-gray-500">Total Bet</th>
            <th className="px-4 py-2 text-xs text-gray-500">Odds</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <PredictionTableBody
              key={index}
              outcome={item.outcome}
              totalBet={item.totalBet}
              odds={item.odds}
              isSelected={selectedOption === index}
              selectedBet={selectedOption === index ? selectedBet : null}
              onSelectBet={(bet: 'YES' | 'NO') => handleSelectBet(index, bet)}
              option={index}
            />
          ))}
        </tbody>
      </table>

      {dataUser && dataUser.length > 0 && (
        <>
        <h3 className="mt-8 text-md font-semibold pb-1 mb-2">My Bets</h3>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr className="border-t border-b border-gray-300">
              <th className="px-4 py-2 text-xs text-gray-500">My position</th>
              <th className="px-4 py-2 text-xs text-gray-500">Bet Amount</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((betAmount, index) => {
              if (betAmount === BigInt(0)) {
                return null;
              }
              const betInEth = calculateSingleBet(betAmount);
              const betInUsd = ethPrice !== null ? (parseFloat(betInEth) * ethPrice).toFixed(2) : null;
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-left">{data[index]?.outcome}</td>
                  <td className="px-4 py-2 text-center">
                    {betInEth} ETH
                    {betInUsd && ` ($${betInUsd} USD)`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </>
      )}

      <div className="my-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">Rules</h3>
        <p className="text-md">
          Betting closes on {betDate}
          <br/>
          <br/>
          The market outcome depends on alliance standings at the conclusion of round v0.11. If WASD secures the 1st spot on the alliance leaderboard [final], the market will resolve to &quot;WASD&quot;. Likewise, if &quot;WASDx&quot;, &quot;BOYS&quot;, &quot;ORDEN&quot;, &quot;QUEBEC&quot;, &quot;POOP&quot;, &quot;FOG&quot;, &quot;KONG&quot; or &quot;FUN&quot; secure the 1st spot on the alliance leaderboard [final], the market will respectively resolve as &quot;WASDx&quot;, &quot;BOYS&quot;, &quot;ORDEN&quot;, &quot;QUEBEC&quot;, &quot;POOP&quot;, &quot;FOG&quot;, &quot;KONG&quot;, &quot;FUN&quot;. Should any other alliance claim the 1st position, the market will resolve to “OTHERS”.
          <br />
          <br />
          The resolution will be conducted by the admin (address: 0xB9e330591644f7def5c79Ca3C151b1dC0E0Ce502) based on the official statement from the Primodium X account (<a href="https://x.com/primodiumgame" className="text-blue-500 hover:underline">https://x.com/primodiumgame</a>), however a consensus of credible reporting might also be used.
        </p>
      </div>
      <div className="my-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">Recent Activities</h3>
        <div className="text-sm ">
          {activities.map((activity, index) => (
            <p key={index}>
              <a className="text-blue-500" href={`https://explorer.garnetchain.com/address/${activity.from}`} target="_blank" rel="noopener noreferrer">
                {activity.from}
              </a> bet {activity.value} ETH
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
