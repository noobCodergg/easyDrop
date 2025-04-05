import axios from "axios";

const API = axios.create({
    baseURL: "https://easy-drop-68iz.vercel.app/api/vendor", 
    withCredentials: true,
  });

export const createVendor=(formData)=>API.post('/create-vendor',{formData})
export const venderLogn=(formData)=>API.post('/vendor-login',{formData})
export const getVendorDetail=(vendorId)=>API.get(`/get-vendor-detail/${vendorId}`)
export const updatePersonalDetail=(vendorId,personalDetail)=>API.put(`/update-personal-detail/${vendorId}`,{personalDetail})
export const updateShopDetail=(vendorId,shopDetail)=>API.put(`/update-shop-detail/${vendorId}`,{shopDetail})