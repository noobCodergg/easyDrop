import React, { useState } from "react";
import TransactionForm from "../Components/Transactions/TransactionForm";
import Search from "../Components/Transactions/Search";


const Transaction = () => {


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Overlay for Modal */}
     

  

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Summary at the Top */}
        

        {/* Search Bar */}
        <div className="mt-4">
          <Search />
        </div>
        
      </div>
    </div>
  );
};

export default Transaction;
