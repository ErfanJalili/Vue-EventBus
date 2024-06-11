// src/axios.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // Use your API URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage or Vuex
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;