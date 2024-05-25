import React from 'react';

interface PredictionTableBodyProps {
  outcome: string;
  chance: string;
  betYesAmount: string;
  betNoAmount: string;
  isSelected: boolean;
  selectedBet: 'YES' | 'NO' | null;
  onSelectBet: (bet: 'YES' | 'NO') => void;
}

const PredictionTableBody: React.FC<PredictionTableBodyProps> = ({ outcome, chance, betYesAmount, betNoAmount, isSelected, selectedBet, onSelectBet }) => {
  return (
    <tr className="border-t border-b">
      <td className="px-4 py-2">
        <p className="font-bold">{outcome}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-2xl font-bold">{chance}</p>
      </td>
      <td className="px-4 py-2">
        <button
          className={`px-4 py-2 rounded ${
            isSelected && selectedBet === 'YES' ? 'bg-green-500 text-white' : 'bg-green-200 text-green-700'
          }`}
          onClick={() => onSelectBet('YES')}
        >
          Bet Yes {betYesAmount}
        </button>
      </td>
      <td className="px-4 py-2">
        <button
          className={`px-4 py-2 rounded ${
            isSelected && selectedBet === 'NO' ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
          }`}
          onClick={() => onSelectBet('NO')}
        >
          Bet No {betNoAmount}
        </button>
      </td>
    </tr>
  );
};

export default PredictionTableBody;
