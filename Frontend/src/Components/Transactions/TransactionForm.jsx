import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { createTransaction } from "../../Api/TransactionApi/TransactionApi";
import { createCatagory, getCatagory } from "../../Api/CatagoryApi/CatagoryApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

const TransactionForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    category_name: "",
    credit: 0,
    debit: 0,
    type: "credit",
    remarks: "",
    created_by: 1,
    status: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCatagory();
        if (response?.data.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Invalid category response:", response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData((prev) => ({
      ...prev,
      category_name: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      credit: name === "credit" && formData.type === "credit" ? parseFloat(value) || 0 : prev.credit,
      debit: name === "debit" && formData.type === "debit" ? parseFloat(value) || 0 : prev.debit,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name) {
      console.error("Category name is required.");
      return;
    }

    try {
      let categoryId = null;
      let existingCategory = categories.find((cat) => cat.name === formData.category_name);

      if (!existingCategory) {
        const response = await createCatagory({ name: formData.category_name });
        if (response.data && response.data.id) {
          const newCategory = { id: response.data.id, name: formData.category_name };
          setCategories((prev) => [...prev, newCategory]);
          existingCategory = newCategory;
        }
      }

      if (existingCategory) {
        categoryId = existingCategory.id;
      }

      await createTransaction({ ...formData, category_id: categoryId });

      setFormData({
        category_name: "",
        credit: 0,
        debit: 0,
        type: "credit",
        remarks: "",
        created_by: 1,
        status: true,
      });

      setSelectedCategory(null);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md space-y-4 border border-gray-200">
        <h2 className="text-xl font-extrabold text-black text-center">Add Transaction</h2>

        {/* Category Dropdown */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Select Category</span>
          <CreatableSelect
            options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            onChange={handleCategoryChange}
            placeholder="Choose or create a category"
            isSearchable
            isClearable
            value={selectedCategory}
            className="mt-1"
            isLoading={loading}
          />
        </label>

        {/* Transaction Type */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Type</span>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 mt-1">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
            </SelectContent>
          </Select>
        </label>

        {/* Credit/Debit Amount */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">
            {formData.type === "credit" ? "Credit Amount" : "Debit Amount"}
          </span>
          <Input
            type="number"
            name={formData.type === "credit" ? "credit" : "debit"}
            step="0.01"
            value={formData.type === "credit" ? formData.credit : formData.debit}
            onChange={handleChange}
            required
          />
        </label>

        {/* Remarks */}
        <label className="block">
          <span className="text-gray-800 text-sm font-medium">Remarks</span>
          <Textarea name="remarks" value={formData.remarks} onChange={handleChange} />
        </label>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TransactionForm;
