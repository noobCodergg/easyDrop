import React, { useEffect, useState } from "react";
import { getTransactions } from "../../Api/TransactionApi/TransactionApi";
import TransactionTable from "./TransactionTable";
import { getCatagory } from "../../Api/CatagoryApi/CatagoryApi";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import { Calendar } from "../../Components/ui/calendar"; // ShadCN Calendar
import { Popover, PopoverContent, PopoverTrigger } from "../../Components/ui/popover";
import { CalendarIcon } from "lucide-react"; // Calendar icon for the button
import { format } from "date-fns";
import Summary from "./Summary";
import TransactionForm from "./TransactionForm";

const Search = () => {
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    category: "",
    remarks: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async (formattedData) => {
    try {
      const response = await getTransactions(formattedData);
      if (Array.isArray(response.data.data)) {
        setTransactions(response.data.data);
      } else {
        console.error("Unexpected response format:", response);
        setTransactions([]);
      }
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCatagory();
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions(formData);
  }, []);

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSearch = async () => {
    const formattedData = {
      ...formData,
      fromDate: formData.fromDate ? format(formData.fromDate, "yyyy-MM-dd") : null,
      toDate: formData.toDate ? format(formData.toDate, "yyyy-MM-dd") : null,
    };
    fetchTransactions(formattedData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Filters */}
      <div className="grid grid-cols-5 gap-4 items-end">
        {/* From Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className={formData.fromDate ? "text-gray-900" : "text-gray-500 text-sm"}>
                {formData.fromDate ? format(formData.fromDate, "yyyy-MM-dd") : "Pick a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="bg-white shadow-md rounded-md p-2">
            <Calendar
              mode="single"
              selected={formData.fromDate}
              onSelect={(date) => setFormData({ ...formData, fromDate: date })}
              className="bg-white p-2 rounded-md shadow"
            />
          </PopoverContent>
        </Popover>

        {/* To Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className={formData.toDate ? "text-gray-900" : "text-gray-500 text-sm"}>
                {formData.toDate ? format(formData.toDate, "yyyy-MM-dd") : "Pick a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="bg-white shadow-md rounded-md p-2">
            <Calendar
              mode="single"
              selected={formData.toDate}
              onSelect={(date) => setFormData({ ...formData, toDate: date })}
              className="bg-white p-2 rounded-md shadow"
            />
          </PopoverContent>
        </Popover>

        {/* Category Dropdown */}
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-md">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Remarks */}
        <Input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          placeholder="Remarks"
        />

        {/* Search Button */}
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Summary */}
      <Summary />

      {/* Add Transaction Button (Moved Outside Modal) */}
      <div className="flex justify-end mt-4">
        <Button onClick={handleOpen} className="px-4 py-2 text-lg">
          + Add Transaction
        </Button>
      </div>

      {/* Transaction Form Modal */}
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <TransactionForm />
              <Button
                onClick={handleClose}
                className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200"
              >
                ✕
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Transactions Table */}
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Search;
