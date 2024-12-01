import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Matches your Spring Boot backend URL
});

export default instance;
