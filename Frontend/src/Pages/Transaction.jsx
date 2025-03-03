import React from "react";
import TransactionForm from "../Components/Transactions/TransactionForm";
import Search from "../Components/Transactions/Search";

const Transaction = () => {
  return (
    <div>
      {/* Main Content */}
      <div>
        {/* Search Bar */}
        <div>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Transaction;