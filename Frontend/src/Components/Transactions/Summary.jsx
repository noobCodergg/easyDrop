import React, { useEffect, useState } from "react";
import { getSummary } from "../../Api/TransactionApi/TransactionApi";

const Summary = () => {
  const [summary, setSummary] = useState({
    totalCredits: 0,
    totalDebits: 0,
    netBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await getSummary();

      const data = response.data.data;
      setSummary({
        totalCredits: data.total_credit ?? 0,
        totalDebits: data.total_debit ?? 0,
        netBalance: data.total_balane ?? 0, // ✅ Fixed the typo
      });
      setError(null);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to load summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl font-extrabold text-black text-center tracking-tight mb-6">
        Transaction Summary
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Credits */}
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
            <h3 className="text-sm font-semibold text-gray-800">Total Credits</h3>
            <p className="text-lg font-bold text-blue-600 mt-2">
              Tk. {summary.totalCredits}
            </p>
          </div>

          {/* Total Debits */}
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
            <h3 className="text-sm font-semibold text-gray-800">Total Debits</h3>
            <p className="text-lg font-bold text-red-600 mt-2">
              Tk. {summary.totalDebits}
            </p>
          </div>

          {/* Net Balance */}
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
            <h3 className="text-sm font-semibold text-gray-800">Net Balance</h3>
            <p
              className={`text-lg font-bold mt-2 ${
                summary.netBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Tk. {summary.netBalance}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
