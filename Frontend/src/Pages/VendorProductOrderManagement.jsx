import React from 'react'
import Navbar from '../Components/vendor/Navbar'
import ManageOrders from './ManageOrders'
import { Outlet } from 'react-router-dom'
const VendorProductOrderManagement = () => {
  return (
    <div className='p-6 max-w-[1300px] w-full mx-auto '>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default VendorProductOrderManagement


