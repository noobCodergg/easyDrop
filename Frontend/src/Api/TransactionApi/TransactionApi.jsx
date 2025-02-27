import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/accounts/transaction", 
    withCredentials: true,
  });

 export const createTransaction=(formData)=>API.post('/createtransaction',formData)
 export const getTransactions=()=>API.get('/gettransactions')
 export const updateTransaction=(id,updatedFileds)=>API.put(`/updatetransaction/${id}`,updatedFileds)
 export const getSummary=()=>API.get('/getsummary')