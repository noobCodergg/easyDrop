import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/accounts/catagory", 
    withCredentials: true,
  });

 export const createCatagory=(name)=>API.post('/createcatagory',name)
 export const getCatagory=()=>API.get('/getcatagory')