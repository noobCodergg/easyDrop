import axios from "axios";

const API = axios.create({
    baseURL: "https://easydrop-1.onrender.com/api/admin", 
    withCredentials: true,
  });

export const updateDamageStatus=(orderId,damaged,remarks)=>API.put(`/update-damaged-status/${orderId}`,{damaged,remarks})
export const getCancelledOrders=(startDate,endDate)=>API.get('/get-cancelled-orders',{
    params : {startDate,endDate}
})