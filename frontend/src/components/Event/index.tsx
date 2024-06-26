import { useState } from 'react';
import { TrophyIcon } from '@heroicons/react/20/solid';
import PredictionTable from '../Table/PredictionTable';
import Card from '../Card';
import { useReadContract } from 'wagmi';
import { DarkMarketAbi } from 'constants/DarkMarketAbi';
import { DarkMarketAddress } from 'constants/DarkMarketAddress';
import { calculateTotalBets, formatBigInt } from '../../utils/formatters';
import { useAccount } from "wagmi";
import { useEthPrice } from '../../lib/EthPriceContext';

const Event: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [selectedBet, setSelectedBet] = useState<'YES' | 'NO'>('YES');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { isConnected, address } = useAccount();
  const { ethPrice, updateEthPrice } = useEthPrice();
  const { data: dataAll, isError, isLoading } = useReadContract({
    abi: DarkMarketAbi,
    address: DarkMarketAddress,
    functionName: 'getAllInfo',
  });

  const { data: dataUser } = useReadContract({
    abi: DarkMarketAbi,
    address: DarkMarketAddress,
    functionName: 'getUserBet',
    args: address ? ([address] as const) : undefined,
  });

  const [bettingEndTime, optionNames, totalBets ] = dataAll || [];

  const predictionTableData = optionNames?.map((outcome: string, index: number) => ({
    outcome,
    totalBet: formatBigInt(totalBets?.[index])
  }));

  const convertBigIntToGMTString = (bigInt: bigint | undefined): string => {
    if (bigInt === undefined) {
      return '';
    }
    const timestamp = Number(bigInt) * 1000;
    const date = new Date(timestamp);
    return date.toUTCString();
  };

  const handleSelectOutcome = (outcome: string, option: number) => {
    setSelectedOutcome(outcome);
    setSelectedOption(option);
  };

  const totalBetsInEth = calculateTotalBets(totalBets);
  const totalBetsInEthNumber = Number(totalBetsInEth);
  const totalBetsInUsd = ethPrice !== null ? (totalBetsInEthNumber * ethPrice).toFixed(2) : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ marginTop: '-10%' }}>
        <div className="rounded-full h-20 w-20 bg-gray-500 animate-ping"></div>
      </div>
    );
  }

  return (
    <div className="flex space-x-16">
      <div className="flex-1 space-y-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-6 w-6 text-gray-400" />
            <p>
              {totalBetsInEth} ETH
              {totalBetsInUsd && ` ($${totalBetsInUsd} USD)`}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Which alliance will win the 1st spot on Primodium v0.11?</h2>
        <PredictionTable
          totalBetsInEth={totalBetsInEth}
          data={predictionTableData || []}
          dataUser={dataUser}
          onSelectOutcome={handleSelectOutcome}
          selectedBet={selectedBet}
          onSelectBet={setSelectedBet}
          selectedOption={selectedOption}
          betDate={convertBigIntToGMTString(bettingEndTime)}
        />
      </div>
      <Card selectedOutcome={selectedOutcome} selectedOption={selectedOption} />
    </div>
  );
};

export default Event;
