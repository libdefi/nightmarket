import { TrophyIcon, ClockIcon } from '@heroicons/react/20/solid';
import PredictionTable from '../Table/PredictionTable';
const Event: React.FC = () => {
  return (
    <div className="space-y-4">
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
      <h2 className="text-xl font-bold">Which Alliance will win the 1st spot on Primodium?</h2>
      <PredictionTable />
    </div>
  );
};

export default Event;
