import { useState } from 'react';
import { ConnectWallet } from "components/Button/ConnectWallet";
import { useAccount } from "wagmi";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "sonner";
import { DarkMarketAbi } from 'constants/DarkMarketAbi';
import { DarkMarketAddress } from 'constants/DarkMarketAddress';
import { parseEther } from 'viem'

interface CardProps {
  selectedOutcome: string | null;
  selectedOption: number | null;
}

const Card: React.FC<CardProps> = ({ selectedOutcome,  selectedOption}) => {
  const [amount, setAmount] = useState(0);
  const incrementAmount = () => setAmount(amount + 0.01);
  const decrementAmount = () => setAmount(amount > 0 ? amount - 0.01 : 0);
  const { isConnected } = useAccount();
  const { data: hash, isPending,  writeContract } = useWriteContract();
  const bet = async () => {
    if (selectedOption === null) {
      toast.error("Please select an option before placing a bet.");
      return;
    }

    if (amount <= 0) {
      toast.error("Please enter an amount to bet.");
      return;
    }
    
    const selectedOptionBigInt = BigInt(selectedOption);
    writeContract(
      {
        address: DarkMarketAddress as `0x${string}`,
        abi: DarkMarketAbi,
        functionName: "placeBet",
        args: [
          selectedOptionBigInt,
        ],
        value: parseEther(amount.toString()), 
      },
      {
        onSuccess(data, variables, context) {
          toast("Bet success!", {
            action: {
              label: "Share on X",
              onClick: () => {
                const shareText = encodeURIComponent(
                  `I bet this \nhttps://darkmarket.vercel.app/`
                );
                const hashtags = encodeURIComponent("darkmarket,redstone");
                const related = encodeURIComponent("twitterapi,twitter");
                const url = `https://x.com/intent/tweet?text=${shareText}&hashtags=${hashtags}&related=${related}`;
                const newWindow = window.open(url, "_blank");
                newWindow?.focus();
              },
            },
          });

        },
      }
    );
  }

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
      {isConnected ? (
          <button
            onClick={bet}
            className={` bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-1`}
          >
            Bet
          </button>
        ) : (
          <ConnectWallet />
        )}
    </div>
  );
};

export default Card;
