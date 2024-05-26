import { useState, useEffect } from 'react';
import { TrophyIcon, ClockIcon } from '@heroicons/react/20/solid';
import PredictionTable from '../Table/PredictionTable';
import Card from '../Card';
import { useReadContract } from 'wagmi';
import { DarkMarketAbi } from 'constants/DarkMarketAbi';
import { DarkMarketAddress } from 'constants/DarkMarketAddress';
import { calculateTotalBets, formatBigInt } from '../../utils/formatters';
import { getEthPrice } from '../../utils/getEthPrice';

const Event: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [selectedBet, setSelectedBet] = useState<'YES' | 'NO'>('YES');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const { data, isError, isLoading } = useReadContract({
    abi: DarkMarketAbi,
    address: DarkMarketAddress,
    functionName: 'getAllInfo',
  });

  const [bettingEndTime, resultDeclareTime, optionNames, totalBets, odds] = data || [];

  useEffect(() => {
    const fetchEthPrice = async () => {
      const price = await getEthPrice();
      setEthPrice(price);
    };
    fetchEthPrice();
  }, []);

  const predictionTableData = optionNames?.map((outcome: string, index: number) => ({
    outcome,
    totalBet: formatBigInt(totalBets?.[index]),
    odds: odds?.[index]?.toString() || '0',
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
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <p>Judge date {convertBigIntToGMTString(resultDeclareTime)}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Which Alliance will win the 1st spot on Primodium?</h2>
        <PredictionTable
          data={predictionTableData || []}
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
