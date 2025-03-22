import React, { useContext, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { OrderContext } from '../../Pages/ManageOrders';

const DatePicker = ({ type }) => {
  const [date, setDate] = useState(null);
  const { setStartDate, setEndDate } = useContext(OrderContext);

  const handleStartDateChange = (selectedDate) => {
    setDate(selectedDate); // Update local state
    setStartDate(selectedDate); // Update context state
    console.log('Selected date:', selectedDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setDate(selectedDate); // Update local state
    setEndDate(selectedDate); // Update context state
    console.log('Selected date:', selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
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
          onSelect={type === 'start' ? handleStartDateChange : handleEndDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;