import axios from "axios";

const API = axios.create({
  baseURL: "https://easydrop-1.onrender.com/api/webinar",
  withCredentials: true,
});

export const postWebinarRequest = (inputdata) =>
  API.post("/post-webinar-request", { inputdata });
export const getWebinarList = (startDate, endDate) =>
  API.get("/get-webinar-list", {
    params: {
      startDate,
      endDate,
    },
  });
export const updateWebinarStatus = (id, value) =>
  API.put(`/update-webinar-status/${id}`, { value });
