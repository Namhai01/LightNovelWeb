import axios from "axios";
const urlTruyen = "http://localhost:3001/api";
const axiosClient = axios.create({
  baseURL: urlTruyen,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export const getParam = (url, params) => axiosClient.get(url, { params });
export const get = (url) => axiosClient.get(url);
export const postBody = (url, data) => axiosClient.post(url, data);
export const getWithQuery = (url, data, params) =>
  axiosClient.get(url, data, { params });
export default axiosClient;
