import React from 'react'
import Navbar from '../Components/vendor/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'

const VendorProductOrderManagement = () => {
  const navigate = useNavigate();

  const handleManage = () => {
    navigate('/manage')
  }

  const handleAccount = () => {
    navigate('/myaccount');
  }

  return (
    <div className='max-w-[1300px] w-full mx-auto bg-white p-6'>
      <div className="flex space-x-4 mb-6">
        {/* Button for Manage */}
        <button 
          onClick={handleManage} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Manage Orders
        </button>
        
        {/* Button for Account */}
        <button 
          onClick={handleAccount} 
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          My Account
        </button>
      </div>

      <Navbar />
      <Outlet />
    </div>
  )
}

export default VendorProductOrderManagement
