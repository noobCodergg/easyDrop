import { TrendingUp, StarHalf } from 'lucide-react';
import React from 'react';
import Title from './Title';

const OverAllRating = () => {
  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <Title icon={<StarHalf color='#572782' size={24} />} text="Overall Rating" />
      <div className="flex-1 w-full min-h-0 flex flex-col justify-between mt-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            It's Going High
          </h1>
          <div className="flex items-center justify-start gap-2 bg-gray-200 px-3 py-1 rounded-md mt-2">
            <TrendingUp className="text-up" size={20} />
            <p className="text-sm font-medium text-up">5.48%</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">From last year</p>
      </div>
    </div>
  );
};

export default OverAllRating;