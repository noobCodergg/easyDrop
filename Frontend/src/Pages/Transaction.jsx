import React, { useState } from "react";
import TransactionForm from "../Components/Transactions/TransactionForm";
import TransactionTable from "../Components/Transactions/TransactionTable";

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
          <div className="relative">
            <TransactionForm />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">
            Transactions
          </h1>
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Add a New Transaction
          </button>
        </div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transaction;

