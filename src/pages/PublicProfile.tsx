import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChefHat, Film, Award, MapPin, Calendar, 
  UserPlus, UserCheck, Loader2 
} from 'lucide-react';
import { userService, UserProfile } from '../services/userService';
import { recipeService } from '../services/recipeService';
import { RecipeSummary } from '../types';
import RecipeCard from '../components/ui/RecipeCard';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth(); // Để kiểm tra xem có đang xem chính mình không
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (!username) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Lấy thông tin User (Backend đã trả về isFollowing dựa trên token của người xem)
        const userData = await userService.getUserProfileByUsername(username);
        setProfile(userData);

        // 2. Lấy danh sách món ăn của họ
        const userRecipes = await recipeService.getRecipesByUserId(userData.id);
        setRecipes(userRecipes.content || []);
      } catch (error) {
        console.error("Lỗi tải trang cá nhân:", error);
        toast.error("Không tìm thấy người dùng này");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Xử lý Follow/Unfollow
  const handleFollowToggle = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để theo dõi");
      return;
    }
    if (!profile) return;

    try {
      setFollowLoading(true);
      if (profile.isFollowing) {
        // Đang follow -> Hủy
        await userService.unfollowUser(profile.id);
        setProfile(prev => prev ? {
          ...prev, 
          isFollowing: false, 
          followerCount: Math.max(0, prev.followerCount - 1)
        } : null);
        toast.success(`Đã hủy theo dõi ${profile.displayName}`);
      } else {
        // Chưa follow -> Theo dõi
        await userService.followUser(profile.id);
        setProfile(prev => prev ? {
          ...prev, 
          isFollowing: true, 
          followerCount: prev.followerCount + 1
        } : null);
        toast.success(`Đã theo dõi ${profile.displayName}`);
      }
    } catch (error) {
      toast.error("Lỗi thao tác. Vui lòng thử lại.");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] font-sans pb-20">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#1a1a1a] to-[#050505] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-24">
        
        {/* HEADER PROFILE */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16 animate-fade-in-up">
          
          {/* Avatar Lớn */}
          <div className="relative">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#B23A48] shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <img 
                src={profile.profileImageUrl || `https://ui-avatars.com/api/?name=${profile.displayName}&background=random`} 
                alt={profile.displayName}
                className="w-full h-full rounded-full object-cover border-4 border-[#050505]"
              />
            </div>
            {/* Rank Badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#121212] p-2 rounded-full border border-[#333]">
              <ChefHat className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>

          {/* Thông tin & Nút Follow */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Tên & Bio */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-display mb-2 flex items-center gap-3">
                  {profile.displayName}
                  <Award className="w-6 h-6 text-[#D4AF37]" />
                </h1>
                <p className="text-gray-400 font-mono text-sm mb-4">@{profile.username}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Vietnam</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4"/> Tham gia {new Date(profile.memberSince).getFullYear()}
                  </span>
                </div>

                {/* Bio Box */}
                <div className="text-gray-300 italic border-l-2 border-[#D4AF37]/50 pl-4 py-1 max-w-2xl text-sm md:text-base">
                  "{profile.bio || "Người dùng này là một ẩn số của thế giới ẩm thực..."}"
                </div>
              </div>

              {/* Action Button */}
              {currentUser?.userId !== profile.id && (
                <button 
                  onClick={handleFollowToggle}
                  disabled={followLoading}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg min-w-[180px] ${
                    profile.isFollowing 
                      ? 'bg-[#1A1A1E] text-white border border-[#333] hover:border-red-500 hover:text-red-500' 
                      : 'bg-[#D4AF37] text-black hover:bg-[#F2C94C] shadow-[#D4AF37]/20'
                  }`}
                >
                  {followLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : profile.isFollowing ? (
                    <><UserCheck className="w-5 h-5" /> Đang theo dõi</>
                  ) : (
                    <><UserPlus className="w-5 h-5" /> Theo dõi</>
                  )}
                </button>
              )}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-0 mt-8 bg-[#121212] rounded-2xl border border-white/5 max-w-lg divide-x divide-white/5 overflow-hidden">
              <div className="p-4 text-center hover:bg-white/5 transition-colors cursor-default">
                <span className="block text-2xl font-bold text-white mb-1">{recipes.length}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Món Ăn</span>
              </div>
              <div className="p-4 text-center hover:bg-white/5 transition-colors cursor-default">
                <span className="block text-2xl font-bold text-white mb-1">{profile.followerCount}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Người Hâm Mộ</span>
              </div>
              <div className="p-4 text-center hover:bg-white/5 transition-colors cursor-default">
                <span className="block text-2xl font-bold text-white mb-1">{profile.followingCount}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Đang Theo Dõi</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECIPE LIST */}
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2 font-display">
            <Film className="w-5 h-5 text-[#D4AF37]" /> 
            Tác Phẩm Của {profile.displayName}
          </h2>
          
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <Film className="w-12 h-12 text-gray-700 mb-4" />
              <p className="text-gray-500">Người dùng này chưa đăng tải công thức nào.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}