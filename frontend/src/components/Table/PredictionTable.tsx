import { useState, useEffect } from 'react';
import PredictionTableBody from './PredictionTableBody';

interface PredictionTableProps {
  data: Array<{
    outcome: string;
    totalBet: string;
    odds: string;
  }>;
  onSelectOutcome: (outcome: string) => void;
  selectedBet: 'YES' | 'NO';
  onSelectBet: (bet: 'YES' | 'NO') => void;
}

const PredictionTable: React.FC<PredictionTableProps> = ({
    data,
    onSelectOutcome,
    selectedBet,
    onSelectBet,
  }) => {

  const [selectedRow, setSelectedRow] = useState<number>(0);

  useEffect(() => {
    if (data && data.length > 0) {
      onSelectOutcome(data[0].outcome);
    }
  }, [data, onSelectOutcome]);

  const handleSelectBet = (index: number, bet: 'YES' | 'NO') => {
    setSelectedRow(index);
    onSelectBet(bet);
    onSelectOutcome(data[index].outcome);
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
              isSelected={selectedRow === index}
              selectedBet={selectedRow === index ? selectedBet : null}
              onSelectBet={(bet: 'YES' | 'NO') => handleSelectBet(index, bet)}
            />
          ))}
        </tbody>
      </table>
      <div className="my-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-2">Rules</h3>
        <p className="text-sm text-gray-700">
          Nic Carter (@nic__carter) and David Hoffman (@TrustlessState) are scheduled for a Karate Combat fight for May 30, 2024. 
          If the fight is considered a draw, is canceled, or otherwise comes to an end without a definitive winner, this market will resolve Yes. 
          If the fight between Nic Carter and David Hoffman, currently scheduled for May 30, 2024, is postponed to a date before August, this market&apos;s timeframe.
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
