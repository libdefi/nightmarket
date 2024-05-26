import { useState } from 'react';
import { ConnectWallet } from "components/Button/ConnectWallet";

interface CardProps {
  selectedOutcome: string | null;
}

const Card: React.FC<CardProps> = ({ selectedOutcome }) => {
  const [amount, setAmount] = useState(0);

  const incrementAmount = () => setAmount(amount + 0.01);
  const decrementAmount = () => setAmount(amount > 0 ? amount - 0.01 : 0);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-64 max-h-56 flex flex-col justify-between space-y-4 overflow-auto">
      <h3 className="text-lg font-bold">{selectedOutcome || ''}</h3>
      <div className="my-2">
        <h4 className="text-sm font-semibold">Amount</h4>
        <div className="flex items-center justify-between mt-1 border p-2 rounded-md">
          <button onClick={decrementAmount} className="px-2 py-1 border">-</button>
          <span>{amount.toFixed(2)} ETH</span>
          <button onClick={incrementAmount} className="px-2 py-1 border">+</button>
        </div>
      </div>
      {/* TODO: When logged in, the purchase button is displayed. */}
      <ConnectWallet />
    </div>
  );
};

export default Card;
