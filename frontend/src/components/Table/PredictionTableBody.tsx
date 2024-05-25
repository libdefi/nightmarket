interface PredictionTableBodyProps {
  outcome: string;
  chance: string;
  betYesAmount: string;
  betNoAmount: string;
}

const PredictionTableBody: React.FC<PredictionTableBodyProps> = ({ outcome, chance, betYesAmount, betNoAmount }) => {
  return (
    <tr className="border-t border-b">
      <td className="px-4 py-2">
        <p className="font-bold">{outcome}</p>
      </td>
      <td className="px-4 py-2">
        <p className="text-2xl font-bold">{chance}</p>
      </td>
      <td className="px-4 py-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded">Bet Yes {betYesAmount}</button>
      </td>
      <td className="px-4 py-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded">Bet No {betNoAmount}</button>
      </td>
    </tr>
  );
};

export default PredictionTableBody;
