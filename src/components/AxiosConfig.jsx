import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

axiosInstance.interceptors.request.use((config) => {
  console.log('Interceptor fired');
  const token = localStorage.getItem('access_token');
  console.log('Token:', token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;