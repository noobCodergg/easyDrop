import React, { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../../lib/utils' // Assuming you have this utility from shadcn/ui setup
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

const DatePicker = () => {
  const [date, setDate] = useState(null) // Initialize with null or a default Date object

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate)
    console.log('Selected date:', selectedDate) // Optional: for debugging
  }

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
          onSelect={handleDateChange} // Pass the function directly
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker