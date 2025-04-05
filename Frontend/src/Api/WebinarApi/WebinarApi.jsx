import axios from "axios";

const API = axios.create({
  baseURL: "https://easy-drop-68iz.vercel.app/api/webinar",
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
