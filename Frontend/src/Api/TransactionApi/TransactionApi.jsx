import axios from "axios";

const API = axios.create({
    baseURL: "https://easy-drop-68iz.vercel.app/api/transaction", 
    withCredentials: true,
  });

 export const createTransaction=(formData)=>API.post('/create-transaction',formData)
 export const getTransactions = ({ fromDate, toDate, category, remarks }) => 
  API.get(`/get-transactions/${fromDate || null }/${toDate || null }/${category || null }/${remarks || null }`);
 export const updateTransaction=(id,updatedFileds)=>API.put(`/update-transaction/${id}`,updatedFileds)
 export const getSummary=()=>API.get('/get-summary')