import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default instance;

// || "http://localhost:8080" import.meta.env.VITE_BACKEND_URL,
