import React, { useEffect, useState } from 'react';
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
import { Button } from "../Components/ui/button";
import { Calendar } from "../Components/ui/calendar";
import DamagedProductDetail from './DamagedProductDetail';

const CancelledProduct = () => {
  const [activeTab, setActiveTab] = useState("damaged");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    console.log("Selected start date:", selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    console.log("Selected end date:", selectedDate);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchCancelledOrders=async()=>{
    try{
      const response=await getCancelledProducts(startDate,endDate)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
   fetchCancelledOrders();
  },[])

  // Sample data (replace with your actual data source)
  const damagedProducts = [
    { orderId: "ORD001", name: "Product A", image: "url-to-image-a", status: "Damaged" },
    { orderId: "ORD002", name: "Product B", image: "url-to-image-b", status: "Damaged" },
  ];

  const returnedProducts = [
    { orderId: "ORD003", name: "Product C", image: "url-to-image-c", status: "Returned" },
    { orderId: "ORD004", name: "Product D", image: "url-to-image-d", status: "Returned" },
  ];

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-10">
        {[
          { title: "Total Cancelled Product", count: 100 },
          { title: "Total Damaged Product", count: 100 },
          { title: "Total Stocked Product", count: 100 },
        ].map((item, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {item.count}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {item.title}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-1 items-start sm:items-center mt-10 mb-10">
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
              {startDate ? format(startDate, "yyyy-MM-dd") : <span>Pick a start date</span>}
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
              {endDate ? format(endDate, "yyyy-MM-dd") : <span>Pick an end date</span>}
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

      <div>
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "damaged"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("damaged")}
          >
            Damaged Products
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "returned"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("returned")}
          >
            Returned to Stock
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "damaged" && (
          <div className="w-full overflow-x-auto mt-10">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center">Order ID</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Product Name</TableHead>
                  <TableHead className="text-center">Product Image</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {damagedProducts.map((product) => (
                  <TableRow key={product.orderId}>
                    <TableCell className="text-center">{product.orderId}</TableCell>
                    <TableCell className="text-center">22-2-2022</TableCell>
                    <TableCell className="text-center">{product.name}</TableCell>
                    <TableCell className="text-center">
                     hi
                    </TableCell>
                    <TableCell className="text-center">{product.status}</TableCell>
                    <TableCell className="flex items-center justify-center">
                      <Eye
                        className="h-4 w-4 cursor-pointer text-blue-500"
                        onClick={() => openModal(product)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "returned" && (
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
                {returnedProducts.map((product) => (
                  <TableRow key={product.orderId}>
                    <TableCell className="text-center">{product.orderId}</TableCell>
                    <TableCell className="text-center">22-2-2022</TableCell>
                    <TableCell className="text-center">{product.name}</TableCell>
                    <TableCell className="text-center">
                     hi
                    </TableCell>
                    <TableCell className="text-center">{product.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Modal for DamagedProductDetail */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
            <DamagedProductDetail />
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelledProduct;