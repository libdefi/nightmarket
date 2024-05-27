import React, { useState, useEffect } from 'react';
import { useEthPrice } from '../../lib/EthPriceContext';
interface PredictionTableBodyProps {
  outcome: string;
  totalBet: string;
  odds: string;
  isSelected: boolean;
  selectedBet: 'YES' | 'NO' | null;
  onSelectBet: (bet: 'YES' | 'NO', option: number) => void;
  option: number;
}

const PredictionTableBody: React.FC<PredictionTableBodyProps> = ({
  outcome,
  totalBet,
  odds,
  isSelected,
  selectedBet,
  onSelectBet,
  option,
}) => {
  const [totalBetInUsd, setTotalBetInUsd] = useState<string | null>(null);
  const { ethPrice, updateEthPrice } = useEthPrice();

  useEffect(() => {
    if (ethPrice !== null) {
      const totalBetNumber = Number(totalBet);
      const totalBetUsd = (totalBetNumber * ethPrice).toFixed(2);
      setTotalBetInUsd(totalBetUsd);
    }
  }, [ethPrice, totalBet]);

  return (
    <tr className="border-t border-b">
      <td className="px-4 py-2">
        <p className="text-xl font-bold">{outcome}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-xl font-bold text-center">
          {/* {totalBet} ETH */}
          {totalBetInUsd && ` $${totalBetInUsd}`}
        </p>
      </td>
      <td className="px-4 py-2">
        <p className="text-xl font-bold text-center">{odds}x</p>
      </td>
      <td className="px-4 py-2 text-right">
        <button
          className={`px-8 py-2 rounded ${
            isSelected && selectedBet === 'YES'
              ? 'bg-green-500 text-white'
              : 'bg-green-200 text-green-700'
          }`}
          onClick={() => onSelectBet('YES', option)}
        >
          Bet
        </button>
      </td>
    </tr>
  );
};

export default PredictionTableBody;
