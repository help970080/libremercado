import axios from "axios";
const baseURL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5000";
const api = axios.create({ baseURL, withCredentials: false });
export async function apiPostForm(path, formData, config = {}) {
  const res = await api.post(path, formData, { headers: { "Content-Type": "multipart/form-data" }, ...config });
  return res.data;
}
export default api;
