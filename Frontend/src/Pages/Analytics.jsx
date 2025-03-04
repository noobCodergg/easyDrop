import InvestorGrossProfit from "../Components/Investor/InvestorGrossProfit";
import ExpenseBudget from "../Components/Investor/ExpenseBudget";
import InvestorProfit from "../Components/Investor/InvestorProfit";
import OverAllRating from "../Components/Investor/OverAllRating";
import TopGainerProduct from "../Components/Investor/TopGainerProduct";
import React from "react";
import SalesByCategory from "../Components/Investor/SalesByCatagory";
import MarketOverview from "../Components/Investor/MarketOverview";

const Analytics = () => {
  return (
    <div className="max-w-[1300px] w-full mx-auto h-screen p-4">
      <div className="grid 
        h-full
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-4 
        grid-rows-7
        md:grid-rows-4 
        lg:grid-rows-3
        gap-4">
        
        {/* Row 1 - TopGainerProduct */}
        <div className="lg:col-span-1 h-full">
          <TopGainerProduct />
        </div>

        {/* Row 1/2 - OverAllRating */}
        <div className="lg:col-span-1 h-full">
          <OverAllRating />
        </div>

        {/* Row 1/3 - InvestorProfit */}
        <div className="md:col-span-2 lg:col-span-2 h-full">
          <InvestorProfit />
        </div>

        {/* Row 2/4 - ExpenseBudget */}
        <div className="lg:col-span-1 h-full">
          <ExpenseBudget />
        </div>

        {/* Row 2/5 - SalesByCategory */}
        <div className="md:col-span-2 lg:col-span-2 h-full">
          <SalesByCategory />
        </div>

        {/* Row 2/6 - InvestorGrossProfit */}
        <div className="lg:col-span-1 h-full">
          <InvestorGrossProfit />
        </div>

        {/* Row 3/7 - MarketOverview */}
        <div className="md:col-span-2 lg:col-span-4 h-full">
          <MarketOverview />
        </div>
      </div>
    </div>
  );
};

export default Analytics;