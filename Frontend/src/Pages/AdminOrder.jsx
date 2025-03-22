import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../Components/ui/popover';
import { Button } from '../Components/ui/button';
import { Calendar } from '../Components/ui/calendar';
import { getAdminOrders } from '../Api/OrdersApi/OrdersApi';

const AdminOrder = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchAdminOrder = async () => {
    if (!startDate || !endDate) {
      console.log("Please select both start and end dates.");
      return;
    }

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    console.log("Fetching orders for:", formattedStartDate, formattedEndDate);

    try {
      const response = await getAdminOrders(formattedStartDate, formattedEndDate);
      console.log("Orders:", response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
};


  const handleClick = () => {
    
    fetchAdminOrder();
  };

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    console.log('Selected start date:', selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    console.log('Selected end date:', selectedDate);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Start Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "yyyy-MM-dd") : <span>Pick a start date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            className="bg-white"
            mode="single"
            selected={startDate}
            onSelect={handleStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* End Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "yyyy-MM-dd") : <span>Pick an end date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            className="bg-white"
            mode="single"
            selected={endDate}
            onSelect={handleEndDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Search Button */}
      <Button onClick={handleClick} className="mt-2">
        Search
      </Button>
    </div>
  );
};

export default AdminOrder;

