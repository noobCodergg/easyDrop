import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/orders", 
    withCredentials: true,
  });

export const getOrders=(userId)=>API.get(`/get-orders/${userId}`)
export const updateOrderStatus=(orderId,status)=>API.put(`/update-order-status/${orderId}`,{status})
export const getOrderDetails=(orderId)=>API.get(`/order-details/${orderId}`)
export const getAdminOrders = (startDate, endDate) => 
  API.get('/admin-order', { 
      params: { startDate, endDate } 
  });
