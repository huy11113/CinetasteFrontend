import apiClient from './apiClient';
import { Recipe } from '../types'; 

// Định nghĩa kiểu dữ liệu cho Bình luận
export interface Comment {
  id: number;
  authorId: string;
  authorDisplayName: string;      
  authorProfileImageUrl: string;
  content: string;
  createdAt: string;
  parentId?: number;
}

export const recipeService = {
  /**
   * Lấy danh sách công thức (Phân trang & Sắp xếp)
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
   */
  getRecipeById: async (id: string): Promise<Recipe> => {
    try {
      const response = await apiClient.get<Recipe>(`/recipes/${id}`);
      const recipe = response.data;

      // --- XỬ LÝ DỮ LIỆU AN TOÀN (Giữ nguyên code của bạn) ---
      if (typeof recipe.nutritionInfo === 'string') {
        try {
          (recipe as any).nutrition = JSON.parse(recipe.nutritionInfo);
        } catch (e) {
          console.warn("Không thể parse nutritionInfo JSON", e);
          (recipe as any).nutrition = {};
        }
      } 
      
      return recipe;
    } catch (error) {
      console.error(`Lỗi khi lấy công thức ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy danh sách công thức của một User cụ thể
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
   */
  toggleFavorite: async (id: string) => {
    try {
      await apiClient.post(`/recipes/${id}/favorites`);
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
      throw error;
    }
  },

  // --- PHẦN MỚI THÊM VÀO CHO TÍNH NĂNG CỘNG ĐỒNG ---

  /**
   * Lấy danh sách bình luận
   */
  getComments: async (recipeId: string): Promise<Comment[]> => {
    try {
      const response = await apiClient.get(`/recipes/${recipeId}/comments`);
      return response.data;
    } catch (error) {
      console.error("Lỗi tải bình luận:", error);
      throw error;
    }
  },

  /**
   * Thêm bình luận mới
   */
  addComment: async (recipeId: string, data: { content: string, parentId?: number }) => {
    try {
      const response = await apiClient.post(`/recipes/${recipeId}/comments`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi gửi bình luận:", error);
      throw error;
    }
  }
};