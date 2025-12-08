import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your backend API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
