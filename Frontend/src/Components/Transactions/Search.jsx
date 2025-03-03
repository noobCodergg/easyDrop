import React, { useEffect, useState } from "react";
import { getTransactions } from "../../Api/TransactionApi/TransactionApi";
import TransactionTable from "./TransactionTable";
import { getCatagory } from "../../Api/CatagoryApi/CatagoryApi"; // Note: Should be corrected to getCategory
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import { Calendar } from "../../Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../Components/ui/popover";
import { CalendarIcon } from "lucide-react";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCatagory();
      if (response?.data?.data) {
        setCategories(response.data.data);
      } else {
        console.error("Invalid category response:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions(formData);
  }, []);

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleDateChange = (field) => (date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSearch = () => {
    const formattedData = {
      ...formData,
      fromDate: formData.fromDate ? format(formData.fromDate, "yyyy-MM-dd") : null,
      toDate: formData.toDate ? format(formData.toDate, "yyyy-MM-dd") : null,
    };
    fetchTransactions(formattedData);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search Filters */}
      <div className="flex flex-wrap gap-2 justify-end p-4">
        {/* From Date */}
        <Popover >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !formData.fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 " />
              {formData.fromDate ? format(formData.fromDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar className='bg-white'
              mode="single"
              selected={formData.fromDate}
              onSelect={handleDateChange("fromDate")}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* To Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !formData.toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.toDate ? format(formData.toDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar className='bg-white'
              mode="single"
              selected={formData.toDate}
              onSelect={handleDateChange("toDate")}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Category Dropdown */}
        <Select onValueChange={handleCategoryChange} >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
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
          onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
          placeholder="Remarks"
          className="w-[200px]"
        />

        {/* Search Button */}
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Summary */}
      <div>
        <Summary />
      </div>

      {/* Add Transaction Button */}
      <div className="flex justify-end p-4">
        <Button onClick={handleOpenModal}>+ Add Transaction</Button>
      </div>

      {/* Transaction Form Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <TransactionForm />
              <Button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 w-8 h-8 p-0 flex items-center justify-center"
              >
                ✕
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Transactions Table */}
      <div>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Search;