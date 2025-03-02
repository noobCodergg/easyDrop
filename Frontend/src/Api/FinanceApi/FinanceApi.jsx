import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/finance", 
    withCredentials: true,
});

export const getFinance = (startDate,endDate) => API.get(`/getfinance/${startDate}/${endDate} `);
