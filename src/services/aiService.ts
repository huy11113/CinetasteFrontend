import axios from 'axios';
import { 
  AnalyzeDishResponse, 
  CreateByThemeRequest, 
  CreateByThemeResponse 
} from '../types/index';

// ĐỊA CHỈ API GATEWAY
// Backend chạy qua Gateway ở port 8080
// Lưu ý: Đảm bảo Backend (ai-service) và Gateway đang chạy
const API_BASE_URL = 'http://localhost:8080/api/ai'; 

export const aiService = {
  
  /**
   * 1. PHÂN TÍCH MÓN ĂN TỪ ẢNH
   * Gửi file ảnh và context lên server để AI phân tích
   */
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
            // Nếu sau này cần Auth, bỏ comment dòng dưới:
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 120000, // Timeout 120s (2 phút) vì xử lý ảnh + Gemini Vision tốn thời gian
        }
      );
      return response.data;
    } catch (error) {
      console.error("Analyze Dish Error:", error);
      
      // Xử lý lỗi trả về từ Backend (FastAPI detail)
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      
      // Lỗi mạng hoặc không xác định
      throw new Error("Không thể kết nối đến Server AI để phân tích ảnh. Vui lòng thử lại sau.");
    }
  },

  /**
   * 2. SÁNG TẠO MÓN ĂN THEO CHỦ ĐỀ
   * Gửi chủ đề và loại món để AI tạo công thức mới
   */
 createByTheme: async (request: CreateByThemeRequest): Promise<CreateByThemeResponse> => {
    try {
      // Gửi JSON payload đúng chuẩn mới
      const response = await axios.post<CreateByThemeResponse>(
        `${API_BASE_URL}/create-by-theme`,
        request,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 60000, 
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Create Recipe Error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("AI không thể sáng tạo món ăn lúc này. Vui lòng thử lại.");
    }
  }
};