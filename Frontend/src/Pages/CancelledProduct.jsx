import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { CalendarIcon, Eye } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../Components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu";
import { Button } from "../Components/ui/button";
import { Calendar } from "../Components/ui/calendar";
import DamagedProductDetail from './DamagedProductDetail';
import { getCancelledOrders } from '../Api/AdminApi/AdminApi';

const CancelledProduct = () => {
  const [activeTab, setActiveTab] = useState("damaged");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [damagedProducts, setDamagedProducts] = useState([]);
  const [returnedProducts, setReturnedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchCancelledOrders = async () => {
    try {
      const response = await getCancelledOrders(startDate, endDate);
      setDamagedProducts(response.data.data.filter(order => order.damaged === 1));
      setReturnedProducts(response.data.data.filter(order => order.damaged === 0));
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
    }
  };

  useEffect(() => {
    fetchCancelledOrders();
  }, [startDate, endDate]);

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { title: "Total Cancelled Product", count: damagedProducts.length + returnedProducts.length },
          { title: "Total Damaged Product", count: damagedProducts.length },
          { title: "Total Stocked Product", count: returnedProducts.length },
        ].map((item, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {item.title.split(" ")[1]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10 mb-10">
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
              All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md">
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Acknowledge</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs and Tables */}
      <div>
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "damaged"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("damaged")}
          >
            Damaged Products
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "returned"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("returned")}
          >
            Returned to Stock
          </button>
        </div>

        {activeTab === "damaged" && (
          <div className="w-full overflow-x-auto">
            <Table className="min-w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Order ID</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Date</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Product Name</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Product Image</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Remarks</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Status</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {damagedProducts.length > 0 ? (
                  damagedProducts.map((product) => (
                    <TableRow key={product.order_id} className="hover:bg-gray-50">
                      <TableCell className="text-center py-4">{product.order_id || "N/A"}</TableCell>
                      <TableCell className="text-center py-4">
                        {product.order_date ? moment(product.order_date).format("YYYY-MM-DD") : "N/A"}
                      </TableCell>
                      <TableCell className="text-center py-4">{product.name || "N/A"}</TableCell>
                      <TableCell className="text-center py-4">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto rounded" />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className="text-center py-4">{product.remarks || "N/A"}</TableCell>
                      <TableCell className="text-center py-4">Damaged</TableCell>
                      <TableCell className="text-center py-4">
                        <Eye
                          className="h-5 w-5 cursor-pointer text-blue-500 mx-auto"
                          onClick={() => openModal(product)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No damaged products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "returned" && (
          <div className="w-full overflow-x-auto">
            <Table className="min-w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Order ID</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Date</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Product Name</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Product Image</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700 py-3">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returnedProducts.length > 0 ? (
                  returnedProducts.map((product) => (
                    <TableRow key={product.order_id} className="hover:bg-gray-50">
                      <TableCell className="text-center py-4">{product.order_id || "N/A"}</TableCell>
                      <TableCell className="text-center py-4">
                        {product.order_date ? moment(product.order_date).format("YYYY-MM-DD") : "N/A"}
                      </TableCell>
                      <TableCell className="text-center py-4">{product.name || "N/A"}</TableCell>
                      <TableCell className="text-center py-4">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto rounded" />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className="text-center py-4">Returned</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      No returned products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            <DamagedProductDetail data={selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelledProduct;