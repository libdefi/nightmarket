import { useState, useEffect } from 'react';
import PredictionTableBody from './PredictionTableBody';

interface PredictionTableProps {
  data: Array<{
    outcome: string;
    totalBet: string;
    odds: string;
  }>;
  onSelectOutcome: (outcome: string, option: number) => void;
  selectedBet: 'YES' | 'NO';
  onSelectBet: (bet: 'YES' | 'NO') => void;
  selectedOption: number | null;
  betDate: string;
}

const PredictionTable: React.FC<PredictionTableProps> = ({
  data,
  onSelectOutcome,
  selectedBet,
  onSelectBet,
  selectedOption,
  betDate
}) => {
  useEffect(() => {
    if (data && data.length > 0 && selectedOption === null) {
      onSelectOutcome(data[0].outcome, 0);
    }
  }, [data, onSelectOutcome, selectedOption]);

  const handleSelectBet = (index: number, bet: 'YES' | 'NO') => {
    onSelectBet(bet);
    onSelectOutcome(data[index].outcome, index);
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
      <div className="my-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">Betting closes on {betDate}</h3>
        <p className="text-sm text-gray-700">
          The market outcome depends on alliance standings at the conclusion of round v0.11. If WASD secures the 1st spot on the alliance leaderboard [final], the market will resolve to &quot;WASD&quot;. Likewise, if WASDx, BOYS, ORDEN, QUEBEC, POOP, FOG, KONG or FUN secure the 1st spot on the alliance leaderboard [final], the market will respectively resolve as WASDx, BOYS, ORDEN, QUEBEC, POOP, FOG, KONG, FUN. Should any other alliance claim the 1st position, the market will resolve to “OTHERS”.
          <br />
          The resolution will be conducted by the admin (address: ) based on the official statement from the Primodium X account (<a href="https://x.com/primodiumgame" className="text-blue-500 hover:underline">https://x.com/primodiumgame</a>), however a consensus of credible reporting might also be used.
        </p>
      </div>
      <div className="my-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">Activities</h3>
        <div className="text-sm text-gray-700">
          <p>0xEad515f64c8d5... sold 0.06 Yes for David Hoffman at 3.0¢ ($0)</p>
          <p>0xEad515f64c8d5... sold 0.06 Yes for David Hoffman at 3.0¢ ($0)</p>
          <p>0xEad515f64c8d5... sold 0.06 Yes for David Hoffman at 3.0¢ ($0)</p>
          <p>0xEad515f64c8d5... sold 0.06 Yes for David Hoffman at 3.0¢ ($0)</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
