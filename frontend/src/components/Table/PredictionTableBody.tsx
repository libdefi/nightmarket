import React from 'react';

interface PredictionTableBodyProps {
  outcome: string;
  chance: string;
  odds: string;
  isSelected: boolean;
  selectedBet: 'YES' | 'NO' | null;
  onSelectBet: (bet: 'YES' | 'NO') => void;
}

const PredictionTableBody: React.FC<PredictionTableBodyProps> = ({ outcome, chance, odds, isSelected, selectedBet, onSelectBet }) => {
  return (
    <tr className="border-t border-b">
      <td className="px-4 py-2">
        <p className="text-2xl font-bold">{outcome}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-2xl font-bold text-center">{chance}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-2xl font-bold text-center">{odds}x</p>
      </td>
      <td className="px-4 py-2 text-right">
        <button
          className={`px-8 py-2 rounded ${
            isSelected && selectedBet === 'YES' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-700'
          }`}
          onClick={() => onSelectBet('YES')}
        >
          Bet
        </button>
      </td>
    </tr>
  );
};

export default PredictionTableBody;
