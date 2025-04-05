import axios from "axios";

const API = axios.create({
    baseURL: "https://easydrop-1.onrender.com/api/finance", 
    withCredentials: true,
});

export const getFinance = (startDate,endDate) => API.get(`/get-finance/${startDate}/${endDate} `);
