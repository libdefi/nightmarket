import { useState, useEffect } from 'react';
import { ConnectWallet } from "components/Button/ConnectWallet";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";
import { DarkMarketAbi } from 'constants/DarkMarketAbi';
import { DarkMarketAddress } from 'constants/DarkMarketAddress';
import { parseEther } from 'viem';
import { useEthPrice } from '../../lib/EthPriceContext';
import LoadingIndicator from "components/LoadingIndicator";
import { useReadContract } from 'wagmi';

interface CardProps {
  selectedOutcome: string | null;
  selectedOption: number | null;
}

const Card: React.FC<CardProps> = ({ selectedOutcome, selectedOption }) => {
  const [amount, setAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const [isBetEnabled, setIsBetEnabled] = useState(true);
  const { address } = useAccount();
  const { ethPrice } = useEthPrice();

  useEffect(() => {
    if (ethPrice !== null) {
      setUsdAmount(amount * ethPrice);
    }
  }, [amount, ethPrice]);

  useEffect(() => {
    const checkBetAvailability = () => {
      const currentDate = new Date();
      const deadline = new Date('Wed, 05 Jun 2024 14:00:00 GMT');
      if (currentDate > deadline) {
        setIsBetEnabled(false);
      }
    };

    checkBetAvailability();
    const interval = setInterval(checkBetAvailability, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const incrementAmount = () => setAmount(amount + 0.003);
  const decrementAmount = () => setAmount(amount > 0 ? amount - 0.003 : 0);
  const { isConnected } = useAccount();
  const { isPending, writeContract } = useWriteContract();

  const { data: dataCanClaimReward } = useReadContract({
    abi: DarkMarketAbi,
    address: DarkMarketAddress,
    functionName: 'canClaimReward',
    args: address ? ([address] as const) : undefined,
  });

  console.log("@@@dataCanClaimReward=", dataCanClaimReward)

  const bet = async () => {
    if (selectedOption === null) {
      toast.error("Please select an option before placing a bet.");
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter an amount to bet.");
      return;
    }
    const roundedAmount = Math.floor(amount * 1000) / 1000;
    const amountInWei = parseEther(roundedAmount.toString());

    const selectedOptionBigInt = BigInt(selectedOption);
    writeContract(
      {
        address: DarkMarketAddress as `0x${string}`,
        abi: DarkMarketAbi,
        functionName: "placeBet",
        args: [selectedOptionBigInt],
        value: amountInWei,
      },
      {
        onSuccess(data, variables, context) {
          toast("Bet success!", {
            action: {
              label: "Share on X",
              onClick: () => {
                const shareText = encodeURIComponent(
                  `My bet is in. Adding fuel to the fire of @primodiumgame Alliance War 🫡 \nhttps://0xnight.com/`
                );
                const hashtags = encodeURIComponent("nightmarket,redstone");
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
  };

  const claim = async () => {
    writeContract(
      {
        address: DarkMarketAddress as `0x${string}`,
        abi: DarkMarketAbi,
        functionName: "claimReward",
      },
      {
        onSuccess(data, variables, context) {
          toast("Claimed success!", {});
        },
      }
    );
  };

  return (
    <>
      <div className="p-4 border rounded-lg shadow-lg w-64 max-h-72 flex flex-col justify-between space-y-4 overflow-auto">
        <h3 className="text-lg font-bold">{selectedOutcome || ''}</h3>
        <div className="my-2">
          <h4 className="text-sm font-semibold">Amount</h4>
          <div className="flex items-center justify-between mt-1 border p-2 rounded-md">
            <button onClick={decrementAmount} className="px-2 py-1 border">-</button>
            <span>{amount.toFixed(3)} ETH</span>
            <button onClick={incrementAmount} className="px-2 py-1 border">+</button>
          </div>
          <div className="mt-2 text-right text-sm ">
            ≈ ${usdAmount.toFixed(2)} USD
          </div>
        </div>
        {isConnected ? (
          <button
            onClick={bet}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-1 ${
              !isBetEnabled && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isBetEnabled}
          >
            {isPending ? <LoadingIndicator /> : "Bet"}
          </button>
        ) : (
          <ConnectWallet />
        )}
        {isConnected ? (
          <button
            onClick={claim}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded m-1 ${
              !dataCanClaimReward && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!dataCanClaimReward}
          >
            {isPending ? <LoadingIndicator /> : "Claim Reward"}
          </button>
        ) : (
          <></>
        )}
      </div>
      
    </>
  );
};

export default Card;
