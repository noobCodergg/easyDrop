import React, { useState } from "react";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../Components/ui/popover";
import { Button } from "../Components/ui/button";
import { Calendar } from "../Components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu";

const DamagedProduct = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState([
    { id: "3345", name: "Suzuki Zixer", image: "Hi", status: "Pending" },
    { id: "3346", name: "Suzuki Zixer", image: "Hi", status: "Pending" },
  ]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    console.log("Selected start date:", selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    console.log("Selected end date:", selectedDate);
  };

  const handleSelect = (orderId, value) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: value } : order
      )
    );
    if (value === "Received") {
      setSelectedOrderId(orderId);
    } else {
      setSelectedOrderId(null);
    }
  };

  const closeModal = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className='max-w-[1300px] w-full mx-auto bg-white p-6'>
      {/* Summary Cards */}
     

      {/* Date Pickers */}
      <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center mt-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal border-gray-300",
                !startDate && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              {startDate ? (
                format(startDate, "yyyy-MM-dd")
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateChange}
              initialFocus
              className="rounded-md border-none"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal border-gray-300",
                !endDate && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              {endDate ? (
                format(endDate, "yyyy-MM-dd")
              ) : (
                <span>Pick an end date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndDateChange}
              initialFocus
              className="rounded-md border-none"
            />
          </PopoverContent>
        </Popover>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Search
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto mt-10">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center">Order ID</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Product Name</TableHead>
              <TableHead className="text-center">Product Image</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id} >
                <TableCell className="text-center whitespace-nowrap">{row.id}</TableCell>
                <TableCell className="text-center whitespace-nowrap">22-2-2222</TableCell>
                <TableCell className="text-center whitespace-nowrap">{row.name}</TableCell>
                <TableCell className="text-center whitespace-nowrap">{row.image}</TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[120px] justify-between border-gray-300"
                      >
                        {row.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                      <DropdownMenuItem
                        onClick={() => handleSelect(row.id, "Pending")}
                        className="hover:bg-gray-100"
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSelect(row.id, "Acknowledge")}
                        className="hover:bg-gray-100"
                      >
                        Acknowledge
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSelect(row.id, "Received")}
                        className="hover:bg-gray-100"
                      >
                        Received
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {selectedOrderId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Order Status Update</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-700 mb-6">
        The order status for Order ID {selectedOrderId} has been updated to "Received". Please confirm the details.
      </p>
      
      {/* New form elements */}
      <div className="mb-6">
        <label htmlFor="remarks" className="block text-gray-700 font-medium mb-2">
          Remarks
        </label>
        <input
          type="text"
          id="remarks"
          placeholder="Condition of the product"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="damaged"
              name="status"
              className="mr-2"
            />
            <label htmlFor="damaged" className="text-gray-700">
              Damaged
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="return"
              name="status"
              className="mr-2"
            />
            <label htmlFor="return" className="text-gray-700">
              Return to Stock
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          onClick={closeModal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={closeModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default DamagedProduct;