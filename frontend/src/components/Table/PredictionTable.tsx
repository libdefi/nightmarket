import { useState, useEffect } from 'react';
import PredictionTableBody from './PredictionTableBody';

interface PredictionTableProps {
  onSelectOutcome: (outcome: string) => void;
}

const PredictionTable: React.FC<PredictionTableProps> = ({ onSelectOutcome }) => {
  const data = [
    { outcome: "WASD", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "WASDx", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "BOYS", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "ORDEN", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "QUEBEC", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "POOP", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "OTHERS", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
  ];

  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedBet, setSelectedBet] = useState<'YES' | 'NO'>('YES');

  useEffect(() => {
    onSelectOutcome(data[0].outcome); // デフォルトで最初のアウトカムを選択
  }, [onSelectOutcome]);

  const handleSelectBet = (index: number, bet: 'YES' | 'NO') => {
    setSelectedRow(index);
    setSelectedBet(bet);
    onSelectOutcome(data[index].outcome);
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-t border-b border-gray-300">
          <th className="px-4 py-2 text-xs text-gray-500">OUTCOME</th>
          <th className="px-4 py-2 text-xs text-gray-500">% CHANCE</th>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <PredictionTableBody
            key={index}
            outcome={item.outcome}
            chance={item.chance}
            betYesAmount={item.betYesAmount}
            betNoAmount={item.betNoAmount}
            isSelected={selectedRow === index}
            selectedBet={selectedRow === index ? selectedBet : null}
            onSelectBet={(bet: 'YES' | 'NO') => handleSelectBet(index, bet)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PredictionTable;
