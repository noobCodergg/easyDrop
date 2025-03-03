import React, { useEffect, useState } from "react";
import { getSummary } from "../../Api/TransactionApi/TransactionApi";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";

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
        netBalance: data.total_balane ?? 0, // Fixed typo: total_balane → total_balance
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
    <div className="max-w-6xl mx-auto p-4">

      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Credits */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle className="text-sm ">Total Credits</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-base font-bold text-blue-600">Tk. {summary.totalCredits}</p>
            </CardContent>
          </Card>

          {/* Total Debits */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle className="text-sm ">Total Debits</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-base font-bold text-red-600">Tk. {summary.totalDebits}</p>
            </CardContent>
          </Card>

          {/* Net Balance */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle className="text-sm ">Net Balance</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p
                className={`text-base font-bold ${
                  summary.netBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Tk. {summary.netBalance}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Summary;