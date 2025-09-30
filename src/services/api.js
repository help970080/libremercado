// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const apiPostForm = (url, data, config = {}) =>
  api.post(url, data, {
    ...config,
    headers: { ...config.headers, "Content-Type": "multipart/form-data" }
  });
