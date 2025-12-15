import apiClient from './apiClient';

export interface UserProfileStats {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  profileImageUrl: string; // ✅ Đổi từ avatarUrl
  recipeCount?: number;
  followerCount: number;
  followingCount: number;
  memberSince?: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
}

export const userService = {
  // ✅ Lấy thông tin đầy đủ của chính mình (dùng cho Edit Profile)
  getMyFullProfile: async (): Promise<UserProfileStats> => {
    try {
      const response = await apiClient.get('/users/me/profile');
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      throw error;
    }
  },

  // ✅ HÀM MỚI: Lấy profile theo username (dùng cho trang Profile public)
  getUserProfileByUsername: async (username: string): Promise<UserProfileStats> => {
    try {
      const response = await apiClient.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy profile theo username:", error);
      throw error;
    }
  },

  // Hàm cũ giữ nguyên (cho public profile)
  getUserProfile: async (userId: string): Promise<UserProfileStats> => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      throw error;
    }
  },

  updateUserProfile: async (userId: string, data: UpdateProfileRequest): Promise<UserProfileStats> => {
    try {
      const response = await apiClient.put(`/users/me`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      throw error;
    }
  }
};