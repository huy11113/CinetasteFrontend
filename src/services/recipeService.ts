import apiClient from './apiClient';
import { Recipe } from '../types'; 

export const recipeService = {
  /**
   * Lấy danh sách công thức (Phân trang & Sắp xếp)
   * Dùng cho: Trang chủ (Home), Trang duyệt (Browse)
   */
  getAllRecipes: async (page = 0, size = 10, sort = 'createdAt,desc') => {
    try {
      const response = await apiClient.get('/recipes', {
        params: { page, size, sort }
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải danh sách công thức:", error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết công thức theo ID
   * Dùng cho: Trang chi tiết (RecipeDetail)
   */
  getRecipeById: async (id: string): Promise<Recipe> => {
    try {
      const response = await apiClient.get<Recipe>(`/recipes/${id}`);
      const recipe = response.data;

      // --- XỬ LÝ DỮ LIỆU AN TOÀN ---
      
      // 1. Xử lý nutrition/nutritionInfo
      // Backend của bạn có thể trả về 'nutrition' (Map) hoặc 'nutritionInfo' (String JSON)
      // Code này kiểm tra và chuẩn hóa về dạng Object để UI dễ dùng
      if (typeof recipe.nutritionInfo === 'string') {
        try {
          // Nếu là chuỗi JSON, parse ra object
          // Gán vào nutrition để thống nhất
          (recipe as any).nutrition = JSON.parse(recipe.nutritionInfo);
        } catch (e) {
          console.warn("Không thể parse nutritionInfo JSON", e);
          (recipe as any).nutrition = {};
        }
      } 
      // Nếu backend đã trả về nutrition dạng Map/Object thì giữ nguyên

      return recipe;
    } catch (error) {
      console.error(`Lỗi khi lấy công thức ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy danh sách công thức của một User cụ thể
   * Dùng cho: Trang cá nhân (Profile)
   */
/**
   * Lấy danh sách công thức của một User cụ thể
   * API MỚI: /recipes/author/{authorId}
   */
  getRecipesByUserId: async (userId: string, page = 0, size = 10) => {
    try {
   
      const response = await apiClient.get(`/recipes/author/${userId}`, {
        params: { page, size, sort: 'createdAt,desc' }
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải công thức của user:", error);
      throw error;
    }
  },

  /**
   * Tạo công thức mới
   */
  createRecipe: async (data: any) => {
    try {
      const response = await apiClient.post('/recipes', data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo công thức:", error);
      throw error;
    }
  },

  /**
   * Cập nhật công thức
   */
  updateRecipe: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/recipes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật công thức:", error);
      throw error;
    }
  },

  /**
   * Xóa công thức
   */
  deleteRecipe: async (id: string) => {
    try {
      await apiClient.delete(`/recipes/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa công thức:", error);
      throw error;
    }
  },

  /**
   * Gửi đánh giá (Rating)
   */
  rateRecipe: async (id: string, rating: number, review: string) => {
    try {
      await apiClient.post(`/recipes/${id}/ratings`, { rating, review });
    } catch (error) {
      console.error("Lỗi khi đánh giá:", error);
      throw error;
    }
  },

  /**
   * Toggle Yêu thích (Favorite)
   * Lưu ý: Cần Backend hỗ trợ endpoint này
   */
  toggleFavorite: async (id: string) => {
    try {
      // Nếu Backend chưa có endpoint này, hàm này sẽ lỗi 404
      await apiClient.post(`/recipes/${id}/favorites`);
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
      throw error;
    }
  }
  
};