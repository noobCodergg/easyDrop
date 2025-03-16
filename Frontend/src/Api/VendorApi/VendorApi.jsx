import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/vendor", 
    withCredentials: true,
  });

export const createVendor=(formData)=>API.post('/create-vendor',{formData})
export const venderLogn=(formData)=>API.post('/vendor-login',{formData})