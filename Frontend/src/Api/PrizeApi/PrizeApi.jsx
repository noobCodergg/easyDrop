import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/prize", 
    withCredentials: true,
  });

export const getPrizes = () =>API.get('/get-prizes')
export const updatePrize=(id,value)=>API.put('/update-prize',{id,value})
export const postPrize=(name)=>API.post('/post-prize',{name})