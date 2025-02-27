import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { createTransaction } from "../../Api/TransactionApi/TransactionApi";
import { createCatagory, getCatagory } from "../../Api/CatagoryApi/CatagoryApi";

const TransactionForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_name: "",
    credit: 0,
    debit: 0,
    type: "credit",
    remarks: "",
    created_by: 1,
    status: true,
  });

  const fetchCategory = async () => {
    try {
      const response = await getCatagory();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryChange = async (selectedOption) => {
    if (selectedOption.__isNew__) {
      try {
        const addedCategory = await createCatagory({ name: selectedOption.label });
        setCategories([...categories, addedCategory]);
        setFormData({ ...formData, category_name: addedCategory.name });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      setFormData({ ...formData, category_name: selectedOption.label });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      credit: name === "credit" && formData.type === "credit" ? parseFloat(value) || 0 : formData.credit,
      debit: name === "debit" && formData.type === "debit" ? parseFloat(value) || 0 : formData.debit,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      setFormData({
        category_name: "",
        credit: 0,
        debit: 0,
        type: "credit",
        remarks: "",
        created_by: 1,
        status: true,
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md space-y-4 border border-gray-200">
        <h2 className="text-xl font-extrabold text-black text-center">Add Transaction</h2>

        {/* Category Dropdown with Creatable Select */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Select Category</span>
          <CreatableSelect
            options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            onChange={handleCategoryChange}
            placeholder="Choose or create a category"
            isSearchable
            className="mt-1"
          />
        </label>

        {/* Transaction Type */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Type</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm bg-gray-50"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </label>

        {/* Credit/Debit Amount */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">
            {formData.type === "credit" ? "Credit Amount" : "Debit Amount"}
          </span>
          <input
            type="number"
            name={formData.type === "credit" ? "credit" : "debit"}
            step="0.01"
            value={formData.type === "credit" ? formData.credit : formData.debit}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm bg-gray-50"
            required
          />
        </label>

        {/* Remarks */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Remarks</span>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm bg-gray-50"
          />
        </label>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;