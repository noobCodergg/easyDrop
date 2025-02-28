import React, { useState } from "react";
import TransactionForm from "../Components/Transactions/TransactionForm";
import Summary from "../Components/Transactions/Summary";
import Search from "../Components/Transactions/Search";
import {Button} from '../Components/ui/button'

const Transaction = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Overlay for Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      )}

      {/* Transaction Form as Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <TransactionForm />
            <Button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">
            Transactions
          </h1>
          <Button onClick={handleOpen} variant="default">
            Add a New Transaction
          </Button>
        </div>

        {/* Search Bar Positioned Below Header */}
        <div className="p-2 rounded-lg">
          <Search />
        </div>

        <Summary />
      </div>
    </div>
  );
};

export default Transaction;