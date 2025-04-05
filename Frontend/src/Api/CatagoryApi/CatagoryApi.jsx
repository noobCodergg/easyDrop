import axios from "axios";

const API = axios.create({
    baseURL: "https://easydrop-1.onrender.com/api/category", 
    withCredentials: true,
  });

 export const createCatagory=(name)=>API.post('/create-category',name)
 export const getCatagory=()=>API.get('/get-category')