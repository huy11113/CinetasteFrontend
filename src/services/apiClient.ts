// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  // Trỏ đến API Gateway đang chạy ở cổng 8080
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Tự động gắn JWT token vào *mỗi* request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;