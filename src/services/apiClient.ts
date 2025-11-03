// src/services/apiClient.ts
import axios from 'axios';

// API Gateway của bạn đang chạy ở cổng 8080
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Trỏ đến API Gateway
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor (Bộ chặn) này sẽ chạy trước *mỗi* request
// Nó kiểm tra xem có token trong localStorage không và tự động gắn vào header
// Điều này khớp với logic kiểm tra token của API Gateway
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