import axios from "axios";

const API = axios.create({
    baseURL: "https://easy-drop-68iz.vercel.app/api/finance", 
    withCredentials: true,
});

export const getFinance = (startDate,endDate) => API.get(`/get-finance/${startDate}/${endDate} `);
