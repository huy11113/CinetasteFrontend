import axios from 'axios';
import { 
  AnalyzeDishResponse, 
  CreateByThemeRequest, 
  CreateByThemeResponse,
  CritiqueDishResponse 
} from '../types/index';

// ĐỊA CHỈ API GATEWAY
// Backend chạy qua Gateway ở port 8080
const API_BASE_URL = 'http://localhost:8080/api/ai'; 

export const aiService = {
  
  /**
   * 1. PHÂN TÍCH MÓN ĂN TỪ ẢNH
   * Gửi file ảnh và context lên server để AI phân tích
   */
  analyzeDish: async (imageFile: File, context?: string): Promise<AnalyzeDishResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile); // Backend yêu cầu key là 'image'
    
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
          },
          timeout: 120000, // Timeout 120s (2 phút) cho tác vụ xử lý ảnh
        }
      );
      return response.data;
    } catch (error) {
      console.error("Analyze Dish Error:", error);
      
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      
      throw new Error("Không thể kết nối đến Server AI để phân tích ảnh. Vui lòng thử lại sau.");
    }
  },

  /**
   * 2. SÁNG TẠO MÓN ĂN THEO CHỦ ĐỀ
   * Gửi chủ đề và loại món để AI tạo công thức mới
   */
  createByTheme: async (request: CreateByThemeRequest): Promise<CreateByThemeResponse> => {
    try {
      const response = await axios.post<CreateByThemeResponse>(
        `${API_BASE_URL}/create-by-theme`,
        request,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 60000, // Timeout 60s
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("Create Recipe Error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("AI không thể sáng tạo món ăn lúc này. Vui lòng thử lại.");
    }
  },

  /**
   * 3. GIÁM KHẢO CHẤM ĐIỂM MÓN ĂN
   * Gửi ảnh và tên món để AI chấm điểm 0-10 (Frontend sẽ tự quy đổi lên 100)
   */
  critiqueDish: async (file: File, dishName: string): Promise<CritiqueDishResponse> => {
    const formData = new FormData();
    // QUAN TRỌNG: Backend yêu cầu key 'image' cho file ảnh
    formData.append('image', file); 
    formData.append('dish_name', dishName); 

    try {
      const response = await axios.post<CritiqueDishResponse>(
        `${API_BASE_URL}/critique-dish`, 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 120000 // Tăng timeout cho tác vụ xử lý ảnh
        }
      );
      return response.data;
    } catch (error) {
      console.error("Critique Dish Error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("Không thể kết nối với Giám khảo AI. Vui lòng thử lại sau.");
    }
  }
};