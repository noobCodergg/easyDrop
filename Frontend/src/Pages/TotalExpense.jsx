import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Components/ui/table';
import CompanyCredentials from '../Components/Common/ComapnyCredentials';
import { getTransactions } from '../Api/TransactionApi/TransactionApi';
import { Popover, PopoverContent, PopoverTrigger } from "../Components/ui/popover";
import { Calendar } from "../Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { Button } from '../Components/ui/button';

const TotalExpense = () => {
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    category: "",
    remarks: "",
  });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;

  // Fetch data with formData as parameters
  const fetchData = async (formData) => {
    try {
      const response = await getTransactions(formData);
      console.log('API Response:', response.data.data);
      if (response && Array.isArray(response.data.data)) {
        return response.data.data.map(row => ({
          ...row,
          dateObj: dayjs(row.date, 'DD/MM/YYYY'), // Adjust date format based on API response
        }));
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return []; // Return empty array on error
    }
  };

  // Get data using the formData
  const getData = async () => {
    const formattedData = {
      ...formData,
      fromDate: formData.fromDate ? format(formData.fromDate, "yyyy-MM-dd") : null,
      toDate: formData.toDate ? format(formData.toDate, "yyyy-MM-dd") : null,
    };
    const fetchedData = await fetchData(formattedData);
    setData(fetchedData);
  };

  // Handle date change for both start and end dates
  const handleDateChange = (field) => (date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  // Handle search
  const handleSearch = () => {
    getData(); // Trigger data fetch with current formData
  };

  useEffect(() => {
    getData();
  }, []); // Initial fetch on component mount

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Render the calendar popovers
  const renderCalendarPopover = (dateType, date) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white"
          mode="single"
          selected={date}
          onSelect={handleDateChange(dateType)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="p-6 max-w-[1300px] w-full mx-auto bg-white  rounded-lg">
      <CompanyCredentials /> {/* Keep CompanyCredentials at the top */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Total Expenses</h2>
      </div>

      {/* Container for the date pickers */}
      <div className="flex gap-2 mb-6">
        {/* Date Pickers */}
        <div className="flex gap-2">
          {renderCalendarPopover("fromDate", formData.fromDate)}
          {renderCalendarPopover("toDate", formData.toDate)}
        </div>
        <Button onClick={handleSearch} variant="Investor" className="self-center">
          Search
        </Button>
      </div>

      {/* Table */}
      <Table className="w-full bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-lg font-semibold p-2">Date</TableHead>
            <TableHead className="text-center text-lg font-semibold p-2">Description</TableHead>
            <TableHead className="text-center text-lg font-semibold p-2">Amount</TableHead>
            <TableHead className="text-center text-lg font-semibold p-2">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
              <TableCell className="text-center text-base p-2">{row.date}</TableCell>
              <TableCell className="text-center text-base p-2">{row.remarks}</TableCell>
              <TableCell className="text-center text-base p-2">
                Tk.{row.debit > 0 ? row.debit.toLocaleString() : row.credit > 0 ? row.credit.toLocaleString() : '0'}
              </TableCell>
              <TableCell className="text-center text-base p-2">{row.type || row.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          className="bg-white hover:bg-[#64439A] hover:text-white text-gray-800 font-semibold border border-gray-300 px-4 py-2 text-base"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNum = i + 1;
          return (
            <Button
              key={pageNum}
              className={`hover:bg-[#64439A] ${page === pageNum ? 'bg-[#64439A] text-white' : 'bg-white text-gray-800 hover:text-white border border-gray-300'} font-semibold px-4 py-2 text-base`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}

        {totalPages > 5 && page < totalPages - 2 && (
          <span className="px-2 text-gray-500">...</span>
        )}

        {totalPages > 5 && (
          <Button
            className={`hover:bg-[#64439A] ${page === totalPages ? 'bg-[#64439A] text-white' : 'bg-white text-gray-800 hover:text-white border border-gray-300'} font-semibold px-4 py-2 text-base`}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        <Button
          className="bg-white hover:bg-[#64439A] hover:text-white text-gray-800 font-semibold border border-gray-300 px-4 py-2 text-base"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TotalExpense;
