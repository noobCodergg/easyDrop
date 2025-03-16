import OrderTable from '../Components/vendor/OrderTable'
import DatePicker from '../Components/vendor/DatePicker'
import Dropdown from '../Components/vendor/Dropdown'
import SearchInput from '../Components/vendor/searchInput'
import Cards from '../Components/vendor/Cards'
import React from 'react'



const ManageOrders = () => {
  return (
    <div>
    <Cards/>
    <div className='flex justify-between'>
    <div className='flex gap-2 w-1/2'>
    <SearchInput/>
    <Dropdown/>
      </div>
      <div className='flex gap-2'>
     <DatePicker/>
     <DatePicker/>
      </div>
    </div>
    <OrderTable/>
    </div>
  )
}

export default ManageOrders
