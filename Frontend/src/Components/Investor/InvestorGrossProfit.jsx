import React from 'react';
import Title from './Title';
import { TrendingUp } from 'lucide-react';

const InvestorGrossProfit = () => {
  // Sample data (replace with real data as needed)
  const grossProfit = {
    total: '$250,000',
    change: '8.75%',
    period: 'This Year',
  };

  return (
    <div className="h-full w-full p-4 rounded-xl shadow-lg border border-gray-300 bg-white flex flex-col">
      <Title
        icon={<TrendingUp color='#572782' size={24} />}
        text="Investor Gross Profit"
      />
      <div className="flex-1 w-full min-h-0 flex flex-col justify-between">
        {/* Main Profit Display */}
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-gray-800">{grossProfit.total}</h2>
            <p className="text-sm text-gray-500">{grossProfit.period}</p>
          </div>
        </div>

        {/* Profit Change Indicator and Additional Info */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-md w-fit">
            <TrendingUp className="text-up" size={18} />
            <p className="text-sm font-medium text-up">
              +{grossProfit.change}
            </p>
            <span className="text-xs text-gray-500">vs Last Year</span>
          </div>

          {/* Additional Info */}
          
        </div>
      </div>
    </div>
  );
};

export default InvestorGrossProfit;