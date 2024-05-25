import { useState } from 'react';
import { ConnectWallet } from "components/Button/ConnectWallet";

interface CardProps {
  selectedOutcome: string | null;
}

const Card: React.FC<CardProps> = ({ selectedOutcome }) => {
  const [shares, setShares] = useState(0);
  const [selectedOutcomeState, setSelectedOutcomeState] = useState<'YES' | 'NO'>('YES');
  const [selectedTab, setSelectedTab] = useState<'BUY' | 'SELL'>('BUY');

  const incrementShares = () => setShares(shares + 0.01);
  const decrementShares = () => setShares(shares > 0 ? shares - 0.01 : 0);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-64 max-h-96 flex flex-col justify-between space-y-4 overflow-auto">
      <h3 className="text-lg font-bold">{selectedOutcome || ''}</h3>
      <div className="flex justify-between border-b">
        <button
          className={`flex-1 py-1 text-center ${
            selectedTab === 'BUY' ? 'border-b-2 border-blue-500' : ''
          } focus:outline-none`}
          onClick={() => setSelectedTab('BUY')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-1 text-center ${
            selectedTab === 'SELL' ? 'border-b-2 border-blue-500' : ''
          } focus:outline-none`}
          onClick={() => setSelectedTab('SELL')}
        >
          Sell
        </button>
      </div>
      <div className="my-2">
        <h4 className="text-sm font-semibold">Outcome</h4>
        <div className="flex justify-between mt-1 space-x-2">
          <button
            className={`flex-1 py-1 text-center rounded ${
              selectedOutcomeState === 'YES' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setSelectedOutcomeState('YES')}
          >
            YES
          </button>
          <button
            className={`flex-1 py-1 text-center rounded ${
              selectedOutcomeState === 'NO' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setSelectedOutcomeState('NO')}
          >
            NO
          </button>
        </div>
      </div>
      <div className="my-2">
        <h4 className="text-sm font-semibold">Shares</h4>
        <div className="flex items-center justify-between mt-1 border p-2 rounded-md">
          <button onClick={decrementShares} className="px-2 py-1 border">-</button>
          <span>{shares.toFixed(2)} ETH</span> {/* toFixed(2) で小数点以下2桁まで表示 */}
          <button onClick={incrementShares} className="px-2 py-1 border">+</button>
        </div>
      </div>
      {/* TODO: When logged in, the purchase button is displayed. */}
      <ConnectWallet />
    </div>
  );
};

export default Card;
