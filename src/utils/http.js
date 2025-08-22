// src/utils/http.js
import axios from 'axios';
import { Notify } from 'quasar';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


http.interceptors.response.use(
  response => {
    return response?.data
  },
  error => {
    const msg = error.response?.data?.message || 'Something went wrong';
    Notify.create({
      type: 'negative',
      message: msg,
    });
    return Promise.reject(error);
  }
);
export default http;
