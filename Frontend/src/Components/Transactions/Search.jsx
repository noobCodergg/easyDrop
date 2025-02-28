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

const Search = () => {
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    category: "",
    remarks: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async (formattedData) => {
    try {
      const response = await getTransactions(formattedData);
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
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
      setCategories(response.data);
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
      <div className="grid grid-cols-5 gap-4 items-end">
        {/* From Date - ShadCN Date Picker with Calendar Icon */}
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

        {/* To Date - ShadCN Date Picker with Calendar Icon */}
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

        {/* Category Dropdown - ShadCN Select */}
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

      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Search;
