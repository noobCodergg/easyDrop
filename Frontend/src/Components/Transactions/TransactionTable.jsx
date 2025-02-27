import React, { useEffect, useState } from "react";
import { getTransactions, updateTransaction } from "../../Api/TransactionApi/TransactionApi";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("credit");
  const [editing, setEditing] = useState({ id: null, field: null });
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        console.error("Unexpected response format:", response);
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleEditStart = (id, field) => {
    setEditing({ id, field });
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: transactions.find((t) => t.id === id)[field] || "",
      },
    }));
  };

  const handleEditChange = (e, id, field) => {
    const value =
      field === "credit" || field === "debit" ? parseFloat(e.target.value) || 0 : e.target.value;
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
      setTransactions((prev) => prev.map((t) => (t.id === id ? updatedTransaction : t)));
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

  const filteredTransactions = transactions.filter((t) =>
    activeTab === "credit" ? t.credit > 0 : t.debit > 0
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md border border-gray-200">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("credit")}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-l-md transition-colors duration-200 ${
            activeTab === "credit"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Credit
        </button>
        <button
          onClick={() => setActiveTab("debit")}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-r-md transition-colors duration-200 ${
            activeTab === "debit"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Debit
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-800">
              <th className="py-3 px-4 text-left font-semibold text-sm">Date</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Category</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Amount</th>
              <th className="py-3 px-4 text-left font-semibold text-sm">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-100"
                >
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {transaction.created_at}
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {transaction.category_id}
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {editing.id === transaction.id &&
                    editing.field === (activeTab === "credit" ? "credit" : "debit") ? (
                      <input
                        type="number"
                        step="0.01"
                        value={
                          editedValues[transaction.id]?.[
                            activeTab === "credit" ? "credit" : "debit"
                          ] ?? (activeTab === "credit" ? transaction.credit : transaction.debit)
                        }
                        onChange={(e) =>
                          handleEditChange(
                            e,
                            transaction.id,
                            activeTab === "credit" ? "credit" : "debit"
                          )
                        }
                        onBlur={() => handleEditSave(transaction.id)}
                        onKeyPress={(e) => handleKeyPress(e, transaction.id)}
                        className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-gray-50 text-sm"
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() =>
                          handleEditStart(
                            transaction.id,
                            activeTab === "credit" ? "credit" : "debit"
                          )
                        }
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {activeTab === "credit" ? transaction.credit : transaction.debit}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {editing.id === transaction.id && editing.field === "remarks" ? (
                      <input
                        type="text"
                        value={
                          editedValues[transaction.id]?.remarks ??
                          (transaction.remarks || "")
                        }
                        onChange={(e) =>
                          handleEditChange(e, transaction.id, "remarks")
                        }
                        onBlur={() => handleEditSave(transaction.id)}
                        onKeyPress={(e) => handleKeyPress(e, transaction.id)}
                        className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-gray-50 text-sm"
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => handleEditStart(transaction.id, "remarks")}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {transaction.remarks || "N/A"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic text-sm"
                >
                  No {activeTab} transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;