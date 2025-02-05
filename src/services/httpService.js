// src/httpService.js
import axios from "axios";

// Create an Axios instance
export const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Exclude login/register requests from adding the token
    if (!config.url.includes("/login") && !config.url.includes("/register")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Hide loader
    return Promise.reject(error);
  }
);
