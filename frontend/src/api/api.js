import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
   withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;