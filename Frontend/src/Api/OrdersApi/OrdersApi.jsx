import axios from "axios";

const API = axios.create({
    baseURL: "https://easydrop-1.onrender.com/api/orders", 
    withCredentials: true,
  });

  export const getOrders = (userId, text, value, startDate, endDate) => 
    API.get(`/get-orders/${userId}`, {
      params: { text, value, startDate, endDate }, 
    });
export const updateOrderStatus=(orderId,status)=>API.put(`/update-order-status/${orderId}`,{status})
export const getOrderDetails=(orderId)=>API.get(`/order-details/${orderId}`)
export const getAdminOrders = (startDate, endDate) => 
  API.get('/admin-order', { 
      params: { startDate, endDate } 
  });

  export const getOrdersByStatus=(userId)=>API.get(`/get-orders-by-status/${userId}`)
