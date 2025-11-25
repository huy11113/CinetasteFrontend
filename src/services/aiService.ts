// src/services/aiService.ts
import axios from 'axios';
import { AnalyzeDishResponse } from '../types';

// ĐỊA CHỈ API GATEWAY
// Backend của bạn chạy qua Gateway ở port 8080
const API_BASE_URL = 'http://localhost:8080/api/ai'; 

export const aiService = {
  analyzeDish: async (imageFile: File, context?: string): Promise<AnalyzeDishResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Chỉ gửi context nếu người dùng có nhập
    if (context && context.trim()) {
      formData.append('context', context);
    }

    try {
      const response = await axios.post<AnalyzeDishResponse>(
        `${API_BASE_URL}/analyze-dish`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Nếu API yêu cầu đăng nhập, bạn cần thêm token vào đây:
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 120000, // Tăng timeout lên 120s vì AI phân tích ảnh phim khá lâu
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI Service Error:", error);
      // Ném lỗi ra để Component hiển thị thông báo cho user
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("Không thể kết nối đến Server AI. Vui lòng thử lại sau.");
    }
  }
};