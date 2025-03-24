import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getOrdersByStatus } from "../../Api/OrdersApi/OrdersApi"

const Cards = () => {
  const [data,setData]=useState([]);
  const fetchOrders = async () =>{
    try{
      const response = await getOrdersByStatus(3)
      setData(response.data.result)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
   fetchOrders();
  },[])
  

  return (
<div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pb-6">
  
    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.total_orders}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            Total Orders
          </span>
        </div>
      </CardContent>
    </Card>

    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Approved Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.approved_count}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            Approved Count
          </span>
        </div>
      </CardContent>
    </Card>


    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Pending Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.pending_count}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            Pending Count
          </span>
        </div>
      </CardContent>
    </Card>

    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Shipped Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.shipped_count}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
            Shipped Count
          </span>
        </div>
      </CardContent>
    </Card>

    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Delivered Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.delivered_count}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
            Delivered Count
          </span>
        </div>
      </CardContent>
    </Card>

    <Card  className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Cancelled Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {data.cancelled_count}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            Cancelled Count
          </span>
        </div>
      </CardContent>
    </Card>
</div>
  )
}

export default Cards
