import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, LogOut, Grid, Heart, 
  ChefHat, Film, Camera, Award, Utensils,
  MapPin, Calendar, Share2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { recipeService } from '../services/recipeService';
import { userService, UserProfileStats } from '../services/userService'; 
import { RecipeSummary } from '../types';
import RecipeCard from '../components/ui/RecipeCard';

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'recipes' | 'saved'>('recipes');
  const [myRecipes, setMyRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State lưu thông tin thống kê thật từ Server
  const [profileStats, setProfileStats] = useState<UserProfileStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;
      try {
        setLoading(true);
        
        // 1. Gọi API lấy danh sách công thức thật
        // (Backend cần hỗ trợ endpoint: /recipes/author/{id})
        const recipesData = await recipeService.getRecipesByUserId(user.userId);
        setMyRecipes(recipesData.content || []); 

        // 2. Gọi API lấy thông tin Followers/Following
        // (Nếu chưa có endpoint này, nó sẽ catch lỗi và hiển thị 0)
        try {
          const statsData = await userService.getUserProfile(user.userId);
          setProfileStats(statsData);
        } catch (err) {
          console.warn("Chưa lấy được thông tin stats (API có thể chưa sẵn sàng).");
        }

      } catch (error) {
        console.error("Lỗi tải profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // --- TÍNH TOÁN SỐ LIỆU THỰC TẾ ---
  // Tính tổng lượt đánh giá/yêu thích từ các bài viết (nếu Backend chưa trả về tổng)
  const totalLikes = myRecipes.reduce((sum, recipe) => sum + (recipe.ratingsCount || 0), 0);

  const displayStats = {
    recipes: myRecipes.length,
    followers: profileStats?.followersCount || 0,
    following: profileStats?.followingCount || 0,
    likes: totalLikes // Số like thật tính từ các bài viết
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] font-sans pb-20 relative overflow-hidden">
      
      {/* =================================================================
          BACKGROUND ATMOSPHERE
      ================================================================= */}
      {/* Ambient Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#B23A48] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

      {/* =================================================================
          1. HERO HEADER (IMAX STYLE)
      ================================================================= */}
      <div className="relative group mb-12 lg:mb-20">
        {/* Cover Image Container */}
        <div className="h-[300px] lg:h-[400px] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Lớp phủ tối */}
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Profile Cover" 
            className="w-full h-full object-cover opacity-80 transform transition-transform duration-[30s] group-hover:scale-105 filter saturate-[0.8] contrast-[1.1]"
          />
          {/* Gradient hòa trộn xuống nền */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20" />
        </div>

        {/* Profile Card Overlay */}
        <div className="absolute -bottom-16 lg:-bottom-20 left-0 right-0 px-4 z-30">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Hiệu ứng kính bóng (Glass Shine) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50"></div>

              <div className="flex flex-col lg:flex-row items-end lg:items-center gap-6 lg:gap-10">
                
                {/* AVATAR: Spotlight Effect */}
                <div className="relative -mt-20 lg:-mt-0 lg:-ml-4 flex-shrink-0 group/avatar">
                  {/* Glow phía sau */}
                  <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-20 group-hover/avatar:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-gradient-to-b from-[#D4AF37] to-[#8a6e1e] shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] relative z-10">
                    <div className="w-full h-full rounded-full border-4 border-[#121212] overflow-hidden bg-black relative">
                      <img 
                        src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                        alt="Avatar"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                      />
                      {/* Edit Overlay */}
                      <Link to="/profile/edit" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all backdrop-blur-[2px]">
                        <Camera className="w-8 h-8 text-white drop-shadow-md" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Rank Badge */}
                  <div className="absolute bottom-0 right-0 z-20 bg-[#121212] p-1 rounded-full">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#F2C94C] text-black text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4AF37] shadow-lg flex items-center gap-1">
                      <ChefHat className="w-3 h-3" /> CHEF
                    </div>
                  </div>
                </div>

                {/* INFO & ACTIONS */}
                <div className="flex-1 w-full text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold font-display mb-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAEAEA] to-[#999]">
                          {user.displayName || user.username}
                        </span>
                        <Award className="inline-block ml-2 w-6 h-6 text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      </h1>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-gray-400 mb-4">
                        <span className="text-[#D4AF37] font-medium">@{user.username}</span>
                        <span className="hidden lg:inline">•</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Vietnam</span>
                        <span className="hidden lg:inline">•</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined 2024</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3">
                      <Link to="/profile/edit" className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:border-[#D4AF37]/30 flex items-center gap-2 group">
                        <Settings className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                        <span>Thiết lập</span>
                      </Link>
                      <button 
                        onClick={logout} 
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-all" 
                        title="Đăng xuất"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* STATS BAR (BOX OFFICE STYLE) - DỮ LIỆU THẬT */}
                  <div className="mt-6 flex items-center justify-center lg:justify-start divide-x divide-white/10 bg-white/5 rounded-2xl border border-white/5 p-4 w-full lg:w-fit backdrop-blur-md">
                    <div className="px-4 lg:px-6 text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                        {displayStats.recipes}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">Recipes</div>
                    </div>
                    <div className="px-4 lg:px-6 text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                        {displayStats.followers}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">Followers</div>
                    </div>
                    <div className="px-4 lg:px-6 text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                        {displayStats.following}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">Following</div>
                    </div>
                    <div className="px-4 lg:px-6 text-center group cursor-pointer">
                      <div className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                        {displayStats.likes}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">Total Likes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          2. MAIN CONTENT (TABS & GRID)
      ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24 lg:mt-32">
        
        {/* Navigation Tabs - Minimalist Style */}
        <div className="flex justify-center border-b border-white/10 mb-10">
          <div className="flex gap-8 relative">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === 'recipes' 
                  ? 'text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2"><Grid className="w-4 h-4" /> Bộ Sưu Tập</span>
              {activeTab === 'recipes' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_-2px_10px_rgba(212,175,55,0.5)]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === 'saved' 
                  ? 'text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Đã Lưu</span>
              {activeTab === 'saved' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_-2px_10px_rgba(212,175,55,0.5)]" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] animate-fade-in">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
              ))}
            </div>
          ) : activeTab === 'recipes' ? (
            // === TAB: MY RECIPES ===
            <>
              {/* CREATE BUTTON (Big Banner Style) */}
              <Link to="/recipe/submit" className="relative group block mb-12 overflow-hidden rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Grain */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <div className="flex items-center justify-between p-6 lg:p-10 bg-[#121212] relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1A1E] to-black border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                      <Utensils className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors font-display">
                        Sáng Tạo Món Mới
                      </h3>
                      <p className="text-gray-400 text-sm max-w-md">Chia sẻ công thức độc đáo của bạn và truyền cảm hứng cho cộng đồng CineTaste.</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all font-bold text-sm">
                    Viết Ngay <Film className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* RECIPE GRID (Dữ liệu thật) */}
              {myRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {myRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Film className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Chưa có tác phẩm nào</h3>
                  <p className="text-gray-500 mb-6 max-w-sm">Thư viện của bạn đang trống. Hãy bắt đầu hành trình sáng tạo ngay hôm nay.</p>
                </div>
              )}
            </>
          ) : (
            // === TAB: SAVED RECIPES (Placeholder - Chưa có API) ===
            <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-20 rounded-full"></div>
                <Heart className="w-16 h-16 text-gray-700 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display">Danh sách yêu thích trống</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                "Một bộ phim hay cần khán giả, một món ngon cần người thưởng thức." <br/>
                Hãy lưu lại những công thức bạn tâm đắc nhé!
              </p>
              <Link to="/browse" className="px-8 py-3 bg-[#D4AF37] hover:bg-[#F2C94C] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1">
                Khám phá ngay
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}