import React from 'react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const SearchInput = () => {
  return (
    <div className="relative w-2/4 flex">
      <Input
        type="text"
        placeholder="Search by name or ID..."
        className="w-full px-4 py-2 text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder-gray-400"
      />
      <Button variant='Investor'>Search</Button>
      
    </div>
  )
}

export default SearchInput
