import { useState, useEffect } from 'react';
import { TrophyIcon, ClockIcon } from '@heroicons/react/20/solid';
import PredictionTable from '../Table/PredictionTable';
import Card from '../Card';

const Event: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [selectedBet, setSelectedBet] = useState<'YES' | 'NO'>('YES');

  return (
    <div className="flex space-x-8">
      <div className="flex-1 space-y-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-6 w-6 text-gray-400" />
            <p>$134,802,457 Bet</p>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <p>Nov 5, 2024</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Which Alliance will win the 1st spot on Primodium?</h2>
        <PredictionTable 
          onSelectOutcome={setSelectedOutcome} 
          selectedBet={selectedBet}
          onSelectBet={setSelectedBet} 
        />
      </div>
      <Card 
        selectedOutcome={selectedOutcome} 
        selectedBet={selectedBet}
        onSelectBet={setSelectedBet} 
      />
    </div>
  );
};

export default Event;
