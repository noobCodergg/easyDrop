import React, { useEffect, useState } from "react";
import moment from "moment";
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
import { getCancelledOrders, updateDamageStatus } from "../Api/AdminApi/AdminApi";

const DamagedProduct =AzureADOptions => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [damaged, setDamaged] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const handleSelect = (orderId, value) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId ? { ...order, status: value } : order
      )
    );
    if (value === "Received") {
      setSelectedOrderId(orderId);
      setDamaged(null);
      setRemarks("");
    } else {
      setSelectedOrderId(null);
    }
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setDamaged(null);
    setRemarks("");
  };

  const fetchCancelledOrders = async () => {
    try {
      const response = await getCancelledOrders(startDate, endDate);
      let filteredOrders = response.data;
      if (filterStatus !== "All") {
        filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
      }
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
    }
  };

  useEffect(() => {
    fetchCancelledOrders();
  }, [startDate, endDate, filterStatus]);

  const handleSubmit = async (orderId) => {
    try {
      const response = await updateDamageStatus(orderId, damaged, remarks);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: "Received", damaged, remarks } : order
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating damage status:", error);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6 rounded-lg ">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !startDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {startDate ? format(startDate, "yyyy-MM-dd") : <span>Start Date</span>}
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
                  "w-[200px] justify-start text-left font-normal",
                  !endDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {endDate ? format(endDate, "yyyy-MM-dd") : <span>End Date</span>}
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
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[120px] justify-between">
              {filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md">
            <DropdownMenuItem onClick={() => handleFilterChange("All")} className="hover:bg-gray-100 cursor-pointer">
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterChange("Acknowledge")} className="hover:bg-gray-100 cursor-pointer">
              Acknowledge
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilterChange("Pending")} className="hover:bg-gray-100 cursor-pointer">
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto mt-10">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center font-semibold text-gray-700 py-3">Order ID</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 py-3">Date</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 py-3">Product Name</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 py-3">Product Image</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 py-3">Remarks</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 py-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((row) => (
                <TableRow key={row.order_id} className="hover:bg-gray-50">
                  <TableCell className="text-center py-4">{row.order_id || "N/A"}</TableCell>
                  <TableCell className="text-center py-4">
                    {row.order_date ? moment(row.order_date).format("YYYY-MM-DD") : "N/A"}
                  </TableCell>
                  <TableCell className="text-center py-4">{row.name || "N/A"}</TableCell>
                  <TableCell className="text-center py-4">
                    {row.image ? (
                      <img src={row.image} alt={row.name} className="w-16 h-16 object-cover mx-auto rounded" />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-center py-4">{row.remarks}</TableCell>
                  <TableCell className="text-center py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[120px] justify-between">
                          Received
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                        <DropdownMenuItem
                          onClick={() => handleSelect(row.order_id, "Received")}
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          Received
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Update Order Status</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Updating status for Order ID <span className="font-medium">{selectedOrderId}</span> to "Received".
            </p>

            <div className="mb-6">
              <label htmlFor="remarks" className="block text-gray-700 font-medium mb-2">
                Remarks
              </label>
              <input
                type="text"
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter product condition"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="damaged"
                    name="status"
                    value="1"
                    checked={damaged === 1}
                    onChange={() => setDamaged(1)}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="damaged" className="text-gray-700">Damaged</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="return"
                    name="status"
                    value="0"
                    checked={damaged === 0}
                    onChange={() => setDamaged(0)}
                    className="mr-2 h-4 w-4 text-blue-600"
                  />
                  <label htmlFor="return" className="text-gray-700">Return to Stock</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(selectedOrderId)}
                disabled={damaged === null || remarks.trim() === ""}
                className={`${
                  damaged === null || remarks.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-md transition-colors`}
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