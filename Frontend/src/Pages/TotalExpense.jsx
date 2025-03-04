import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../Components/ui/table'
import { Button } from '../Components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../Components/ui/select'

const fetchData = async () => {
    return [
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
        { date: '17/07/2024', method: 'Bank', details: 'Rent', amount: 50000, id: '0123' },
        { date: '01/02/2024', method: 'Cash', details: 'Grocery', amount: 2000, id: '0456' },
        { date: '10/05/2023', method: 'Card', details: 'Shopping', amount: 15000, id: '0789' },
    ]
}

const TotalExpense = () => {
  const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [filterYear, setFilterYear] = useState('')
    const [filterMonth, setFilterMonth] = useState('')
    const [page, setPage] = useState(1)
    const rowsPerPage = 9
  
    useEffect(() => {
      const getData = async () => {
        const fetchedData = await fetchData()
        const processedData = fetchedData.map(row => ({
          ...row,
          dateObj: dayjs(row.date, 'DD/MM/YYYY')
        }))
        setData(processedData)
        applyFilter(processedData, filterYear, filterMonth)
      }
      getData()
    }, [filterYear,filterMonth])
  
    const applyFilter = (data, type) => {
      let filtered = []
      if (type === 'This Tonth') {
        filtered = data.filter(row => row.dateObj.isAfter(dayjs().startOf('month')))
      } else if (type === '1 Year') {
        filtered = data.filter(row => row.dateObj.isAfter(dayjs().subtract(1, 'year')))
      } else {
        filtered = data
      }
      setFilteredData(filtered)
    }
  
    const totalPages = Math.ceil(filteredData.length / rowsPerPage)
    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  
  return (
    <div className="p-4 max-w-[1300px] w-full mx-auto">
      <div className='flex w-full justify-between items-center'>
        <h2 className="max-sm:text-sm text-center text-xl font-bold mb-4">Total Expenses</h2>
        <div className="flex justify-end w-[235px] gap-2 mb-2">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>{filterYear}</SelectTrigger>
            <SelectContent>
              <SelectItem value="1 year">1 year</SelectItem>
              <SelectItem value="2 year">2 year</SelectItem>
              <SelectItem value="3 year">3 year</SelectItem>
              <SelectItem value="4 year">4 year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger>{filterMonth}</SelectTrigger>
            <SelectContent>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Prev Month">Prev Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center p-0">SL NO</TableHead>
            <TableHead className="text-center p-0">Date</TableHead>
            <TableHead className="text-center p-0">Description</TableHead>
            <TableHead className="text-center p-0">Amount</TableHead>
            <TableHead className="text-center p-0">Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow className="text-center" key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.details}</TableCell>
              <TableCell>{row.amount.toLocaleString()}</TableCell>
              <TableCell>{row.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-10 gap-2">
        <Button 
          className="bg-white hover:bg-[#64439A] hover:text-white text-black font-bold border border-gray-400" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        {/* First 3 Pages */}
        {[...Array(Math.min(3, totalPages))].map((_, i) => (
          <Button 
            key={i} 
            className={`hover:bg-[#64439A] ${page === i + 1 ? 'bg-[#64439A] text-white' : 'bg-white text-black hover:text-white border border-gray-400'} font-bold`} 
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        {/* Ellipsis if more pages exist */}
        {totalPages > 4 && (
          <span className="px-2 text-gray-500">...</span>
        )}

        {/* Last Page */}
        {totalPages > 3 && (
          <Button 
            className={`hover:bg-[#64439A] ${page === totalPages ? 'bg-[#64439A] text-white' : 'bg-white text-black hover:text-white border border-gray-400'} font-bold`} 
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        <Button 
          className="bg-white hover:bg-[#64439A] hover:text-white text-black font-bold border border-gray-400" 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default TotalExpense