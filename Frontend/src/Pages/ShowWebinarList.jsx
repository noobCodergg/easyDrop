import React, { useEffect, useState } from "react";
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
import { Button } from "../Components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  getWebinarList,
  updateWebinarStatus,
} from "../Api/WebinarApi/WebinarApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../Components/ui/popover";
import { Calendar } from "../Components/ui/calendar";
import { CalendarIcon, Eye } from "lucide-react";
import { format } from "date-fns";

const ShowWebinarList = () => {
  const [webinarData, setWebinarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const fetchWebinarData = async () => {
    try {
      setLoading(true);
      const response = await getWebinarList(startDate, endDate);
      setWebinarData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const previousData = [...webinarData];
    setWebinarData(
      webinarData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    try {
      setLoading(true);
      const response = await updateWebinarStatus(id, newStatus);
      console.log(response.data.data);
      await fetchWebinarData();
    } catch (error) {
      console.log(error);
      setWebinarData(previousData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarData();
  }, [startDate, endDate]);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };

  // Calculate statistics
  const totalRequests = webinarData.length;
  const pendingRequests = webinarData.filter(
    (item) => item.status === 0
  ).length;
  const acknowledgedRequests = webinarData.filter(
    (item) => item.status === 1
  ).length;

  // Card data array
  const cardData = [
    { title: "Total Requests", count: totalRequests },
    { title: "Pending Requests", count: pendingRequests },
    { title: "Acknowledged Requests", count: acknowledgedRequests },
  ];

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6 rounded-lg">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-10">
        {cardData.map((item, index) => (
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
                  {item.title.split(" ")[0]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                {startDate ? (
                  format(startDate, "yyyy-MM-dd")
                ) : (
                  <span>Start Date</span>
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
                  "w-[200px] justify-start text-left font-normal",
                  !endDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {endDate ? (
                  format(endDate, "yyyy-MM-dd")
                ) : (
                  <span>End Date</span>
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
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              SL
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              Date
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              Email
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              Phone
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              Status
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3">
              Remarks
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webinarData.map((webinar, index) => (
            <TableRow key={webinar.id} className="hover:bg-gray-50">
              <TableCell className="text-center py-4">{index + 1}</TableCell>
              <TableCell className="text-center py-4">
                {webinar.datetime}
              </TableCell>
              <TableCell className="text-center py-4">
                {webinar.email}
              </TableCell>
              <TableCell className="text-center py-4">
                {webinar.phone}
              </TableCell>
              <TableCell className="text-center py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="capitalize">
                      {webinar.status === 0 ? "Pending" : "Acknowledged"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(webinar.id, 1)}
                    >
                      Acknowledge
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(webinar.id, 0)}
                    >
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="text-center py-4">
                {webinar.remarks}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowWebinarList;
