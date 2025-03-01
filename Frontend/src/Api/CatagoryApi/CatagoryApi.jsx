import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/category", 
    withCredentials: true,
  });

 export const createCatagory=(name)=>API.post('/createcategory',name)
 export const getCatagory=()=>API.get('/getcategory')