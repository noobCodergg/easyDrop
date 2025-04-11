import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/info", 
    withCredentials: true,
  });

export const postInfo=(phone,email,result)=>API.post('/post-info',{phone,email,result})
export const getInfo=()=>API.get('/get-info')
export const isUserExist=(phone)=>API.get(`/is-user-exist/${phone}`)
