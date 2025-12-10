import apiClient from './apiClient';

export interface UserProfileStats {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  recipeCount: number;
  followerCount: number;
  followingCount: number;
}
// Interface cho dữ liệu gửi lên Backend để update
export interface UpdateProfileRequest {
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
}
export const userService = {
  // Gọi API: GET /api/users/{userId} (đã có sẵn trong User Service của bạn)
  getUserProfile: async (userId: string): Promise<UserProfileStats> => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      throw error;
    }
  },
  // --- THÊM HÀM MỚI ---
  updateUserProfile: async (userId: string, data: UpdateProfileRequest): Promise<UserProfileStats> => {
    try {
      // Gọi API: PUT /users/{userId}
      const response = await apiClient.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      throw error;
    }
  }
};