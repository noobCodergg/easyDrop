import React from "react";
import { Button } from "../Components/ui/button";
import { Download } from "lucide-react";

const TotalIncome = () => {
  const handleExportCSV = () => {
    // Placeholder function for CSV export
    // console.log("Exporting CSV...");
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto p-6 border border-gray-500 rounded-xl shadow-2xl bg-white">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src="https://easydrop.asia/logo/new-sitelogo.png" alt="Easydrop Logo" className="h-12" />
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleExportCSV}>
          <Download size={16} className="mr-2" /> Export CSV
        </Button>
      </div>

      {/* Financial Report */}
      <div className="mt-6 max-sm:w-[100%] w-[80%] text-gray-800">
        <h2 className="font-bold text-lg">Revenue:</h2>
        <ul className="ml-6 mt-4 flex flex-col gap-2">
          <li className="flex justify-between">
            <span>Gross Sales</span> <span>******</span>
          </li>
          <li className="flex justify-between">
            <span>Less Sales returns/ Allowance</span> <span>******</span>
          </li>
          <li className="flex justify-between font-semibold">
            <span>Net sales</span> <span>******</span>
          </li>
        </ul>

        <h2 className="font-bold text-lg mt-4">Cost of good sold:</h2>
        <ul className="ml-6 mt-4 flex flex-col gap-2">
          <li className="flex justify-between max-sm:w-[90%] w-[80%]">
            <span>Purchase</span> <span>******</span>
          </li>
          <li className="flex justify-between max-sm:w-[90%] w-[80%]">
            <span>Delivery charges</span> <span>******</span>
          </li>
          <li className="flex justify-between">
            <span>Cost of good sold</span> <span className="line-through">******</span>
          </li>
          <li className="flex justify-between font-semibold">
            <span>Gross sales profit</span> <span>******</span>
          </li>
        </ul>

        <div className="flex mt-4 items-center justify-between">
          <h2 className="font-bold text-lg">Total Expenses</h2>
          <span>******</span>
        </div>

        <div className="flex mt-4 items-center justify-between">
          <h2 className="font-bold text-lg">Net Income</h2>
          <span>******</span>
        </div>
      </div>
    </div>
  );
};

export default TotalIncome;
