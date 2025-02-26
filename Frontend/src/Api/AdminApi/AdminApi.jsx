import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/admin/announcement", 
    withCredentials: true,
  });

 export const Print=()=>API.get('/print')