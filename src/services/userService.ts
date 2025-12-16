import apiClient from './apiClient';

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  profileImageUrl: string;
  memberSince: string;
  followerCount: number;
  followingCount: number;
  recipeCount?: number;
  isFollowing?: boolean; // Quan trọng: Backend trả về trường này
}

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
}

export const userService = {
  /**
   * Lấy thông tin đầy đủ của chính mình
   */
  getMyFullProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get('/users/me/profile');
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      throw error;
    }
  },

  /**
   * Lấy profile theo username (dùng cho trang Profile public)
   */
  getUserProfileByUsername: async (username: string): Promise<UserProfile> => {
    try {
      const response = await apiClient.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy profile theo username:", error);
      throw error;
    }
  },

  /**
   * Lấy profile theo User ID (dùng cho Hover Card)
   */
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    try {
      // Backend cần có endpoint này hoặc dùng username
      // Tạm thời fallback sang getUserProfileByUsername nếu không có
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      throw error;
    }
  },

  /**
   * Cập nhật profile của chính mình
   */
  updateUserProfile: async (userId: string, data: UpdateProfileRequest): Promise<UserProfile> => {
    try {
      const response = await apiClient.put(`/users/me`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      throw error;
    }
  },

  /**
   * FOLLOW một user khác
   */
  followUser: async (userId: string): Promise<void> => {
    try {
      await apiClient.post(`/users/${userId}/follow`);
    } catch (error) {
      console.error("Lỗi follow user:", error);
      throw error;
    }
  },

  /**
   * UNFOLLOW một user khác
   */
  unfollowUser: async (userId: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${userId}/follow`);
    } catch (error) {
      console.error("Lỗi unfollow user:", error);
      throw error;
    }
  }
};