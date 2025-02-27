import { useState } from "react";
import { createTransaction } from "../../Api/TransactionApi/TransactionApi";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    credit: 0,
    debit: 0,
    type: "credit",
    remarks: "",
    created_by: 1,
    status: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        credit: value === "credit" ? prev.credit : 0,
        debit: value === "debit" ? prev.debit : 0,
      }));
    } else if (name === "credit" || name === "debit") {
      setFormData((prev) => ({
        ...prev,
        credit: formData.type === "credit" ? parseFloat(value) || 0 : 0,
        debit: formData.type === "debit" ? parseFloat(value) || 0 : 0,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      category_id: formData.category_id,
      type: formData.type,
      credit: formData.credit,
      debit: formData.debit,
      remarks: formData.remarks,
      created_by: formData.created_by,
      status: formData.status,
    };

    console.log("Submitting Transaction:", transactionData);

    try {
      const response = await createTransaction(transactionData);
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }

    setFormData({
      category_id: "",
      credit: 0,
      debit: 0,
      type: "credit",
      remarks: "",
      created_by: 1,
      status: true,
    });
  };

  return (
    <div className="max-w-sm mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-md shadow-md space-y-4 border border-gray-200"
      >
        <h2 className="text-xl font-extrabold text-black text-center tracking-tight">
          Add Transaction
        </h2>

        <div className="space-y-3">
          <label className="block">
            <span className="text-gray-800 text-sm font-medium">
              Category ID
            </span>
            <input
              type="text"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm bg-gray-50"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-800 text-sm font-medium">Type</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm bg-gray-50"
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-800 text-sm font-medium">
              {formData.type === "credit" ? "Credit Amount" : "Debit Amount"}
            </span>
            <input
              type="number"
              name={formData.type === "credit" ? "credit" : "debit"}
              step="0.01"
              value={
                formData.type === "credit" ? formData.credit : formData.debit
              }
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm bg-gray-50"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-800 text-sm font-medium">Remarks</span>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y min-h-[80px] text-sm bg-gray-50"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;