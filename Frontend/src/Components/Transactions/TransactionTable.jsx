import React, { useState } from "react";
import { updateTransaction } from "../../Api/TransactionApi/TransactionApi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const TransactionTable = ({ transactions = [] }) => {
  const [activeTab, setActiveTab] = useState("credit");
  const [editing, setEditing] = useState({ id: null, field: null });
  const [editedValues, setEditedValues] = useState({});

  if (!Array.isArray(transactions)) {
    console.error("Invalid transactions data:", transactions);
    transactions = [];
  }

  const handleEditStart = (id, field) => {
    setEditing({ id, field });
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: transactions.find((t) => t.id === id)?.[field] || "",
      },
    }));
  };

  const handleEditChange = (e, id, field) => {
    const value = field === "credit" || field === "debit" ? parseFloat(e.target.value) || 0 : e.target.value;
    setEditedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleEditSave = async (id) => {
    const updatedTransaction = {
      ...transactions.find((t) => t.id === id),
      ...(editedValues[id] || {}),
    };

    try {
      await updateTransaction(id, updatedTransaction);
      transactions = transactions.map((t) => (t.id === id ? updatedTransaction : t));
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
    setEditing({ id: null, field: null });
  };

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEditSave(id);
    }
  };

  const filteredTransactions = transactions.filter((t) => (activeTab === "credit" ? t.credit > 0 : t.debit > 0));

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md border border-gray-200">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => setActiveTab("credit")}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-l-md ${activeTab === "credit" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Credit
        </Button>
        <Button
          onClick={() => setActiveTab("debit")}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-r-md ${activeTab === "debit" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Debit
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-left">Amount</TableHead>
              <TableHead className="text-left">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.category_name}</TableCell>
                  <TableCell>
                    {editing.id === transaction.id && editing.field === (activeTab === "credit" ? "credit" : "debit") ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={
                          editedValues[transaction.id]?.[activeTab === "credit" ? "credit" : "debit"] ??
                          (activeTab === "credit" ? transaction.credit : transaction.debit)
                        }
                        onChange={(e) => handleEditChange(e, transaction.id, activeTab === "credit" ? "credit" : "debit")}
                        onBlur={() => handleEditSave(transaction.id)}
                        onKeyPress={(e) => handleKeyPress(e, transaction.id)}
                        className="w-full"
                        autoFocus
                      />
                    ) : (
                      <span onClick={() => handleEditStart(transaction.id, activeTab === "credit" ? "credit" : "debit")}
                        className="cursor-pointer hover:text-blue-600">
                        {activeTab === "credit" ? transaction.credit : transaction.debit}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing.id === transaction.id && editing.field === "remarks" ? (
                      <Input
                        type="text"
                        value={editedValues[transaction.id]?.remarks ?? transaction.remarks}
                        onChange={(e) => handleEditChange(e, transaction.id, "remarks")}
                        onBlur={() => handleEditSave(transaction.id)}
                        onKeyPress={(e) => handleKeyPress(e, transaction.id)}
                        className="w-full"
                        autoFocus
                      />
                    ) : (
                      <span onClick={() => handleEditStart(transaction.id, "remarks")} className="cursor-pointer hover:text-blue-600">
                        {transaction.remarks || "N/A"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="py-6 text-center text-gray-500 italic">
                  No {activeTab} transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
