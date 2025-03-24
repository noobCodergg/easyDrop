import React from 'react'
import Navbar from '../Components/vendor/Navbar'
import { Outlet } from 'react-router-dom'
const VendorProductOrderManagement = () => {
  return (
    <div className='max-w-[1300px] w-full mx-auto bg-white p-6'>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default VendorProductOrderManagement


