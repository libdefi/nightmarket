import PredictionTableBody from './PredictionTableBody';

const PredictionTable: React.FC = () => {
  // TODO: Test data
  const data = [
    { outcome: "WASD", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "WASDx", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "BOYS", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "ORDEN", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "QUEBEC", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "POOP", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
    { outcome: "OTHERS", chance: "19%", betYesAmount: "0.1 ETH", betNoAmount: "0.05 ETH" },
  ];

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
          />
        ))}
      </tbody>
    </table>
  );
};

export default PredictionTable;
