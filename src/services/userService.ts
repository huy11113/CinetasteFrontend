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
 // --- SỬA LẠI HÀM NÀY ---
  updateUserProfile: async (userId: string, data: UpdateProfileRequest): Promise<UserProfileStats> => {
    try {
      // QUAN TRỌNG: Đổi từ `/users/${userId}` thành `/users/me`
      // API Gateway và User Service sẽ tự biết user là ai qua Token
      const response = await apiClient.put(`/users/me`, data);
      return response.data;
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      throw error;
    }
  }
};