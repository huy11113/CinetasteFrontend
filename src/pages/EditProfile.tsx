import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, X, Camera, User, FileText, 
  Loader2, Clapperboard, Film, Sparkles, Utensils, ChefHat, Upload
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import toast from 'react-hot-toast';

export default function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State hiển thị ảnh
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    username: '', 
    profileImageUrl: ''
  });

  // Load dữ liệu
  useEffect(() => {
    const fetchCurrentData = async () => {
      if (!user?.userId) return;
      try {
        setIsLoading(true);
        const data = await userService.getUserProfile(user.userId);
        setFormData({
          displayName: data.displayName || '',
          bio: data.bio || '',
          username: data.username || user.username || '',
          profileImageUrl: data.avatarUrl || '' // Lưu URL ảnh hiện tại
        });
        setPreviewImage(data.avatarUrl || null);
      } catch (error) {
        toast.error("Không thể tải thông tin");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentData();
  }, [user]);

  // Xử lý thay đổi Text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- LOGIC MỚI: XỬ LÝ ẢNH BASE64 ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 1. Giới hạn dung lượng (ví dụ < 1MB để tránh quá tải DB)
    if (file.size > 1024 * 1024) {
        toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 1MB.");
        return;
    }

    // 2. Chuyển File thành Base64 String để gửi lên Backend
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String); // Hiện preview ngay
        setFormData(prev => ({ ...prev, profileImageUrl: base64String })); // Lưu vào form data
        toast.success("Đã tải ảnh lên");
    };
    reader.readAsDataURL(file);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;

    try {
      setIsSaving(true);
      
      // Gọi API với đường dẫn /users/me đã sửa
      await userService.updateUserProfile(user.userId, {
        displayName: formData.displayName,
        bio: formData.bio,
        profileImageUrl: formData.profileImageUrl // Chuỗi Base64 hoặc URL cũ
      });

      // Thông báo thành công
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#1A1A1E] border-l-4 border-[#D4AF37] shadow-2xl rounded-r-lg pointer-events-auto flex items-center p-4`}>
          <div className="bg-[#D4AF37]/10 p-2 rounded-full mr-4">
            <Clapperboard className="h-6 w-6 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Cắt! Hoàn hảo.</p>
            <p className="mt-1 text-xs text-gray-400">Hồ sơ đã được lưu vào cuộn phim.</p>
          </div>
        </div>
      ));
      
      // Chờ 1 chút rồi về trang Profile
      setTimeout(() => navigate('/profile'), 1500);

    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lưu thay đổi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#EAEAEA] font-sans flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Texture (Màn chiếu) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>

      {/* ================= FILM STRIP CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-2xl animate-slide-up">
        
        {/* Header Label */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.3em] rounded-sm transform -rotate-2 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Film className="w-3 h-3" /> Casting Profile
          </span>
        </div>

        {/* --- MAIN FILM STRIP --- */}
        <div className="flex bg-[#111] shadow-2xl overflow-hidden rounded-lg">
          
          {/* SPROCKET HOLES (LEFT) */}
          <div className="w-12 bg-[#050505] border-r border-[#222] flex flex-col items-center py-4 gap-6 relative z-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-[#222] rounded-[2px] shadow-inner"></div>
            ))}
          </div>

          {/* CONTENT AREA (CENTER) */}
          <div className="flex-1 bg-[#141414] relative">
            
            {/* Film Frame Lines */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#333]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#333]"></div>

            {/* FORM BODY */}
            <div className="p-8 md:p-12">
              
              <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white font-display uppercase tracking-tight">
                    Hồ Sơ Đầu Bếp
                  </h2>
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1 font-mono">
                    Scene 1 • Take 1 • @{formData.username}
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => navigate('/profile')} 
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isLoading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-2" />
                  <p className="text-xs uppercase tracking-widest text-gray-500">Đang tráng phim...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* --- SCENE 1: THE STAR (AVATAR CLICKABLE) --- */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      
                      {/* Frame viền phim cho Avatar */}
                      <div className="absolute -inset-4 border-2 border-[#D4AF37]/20 rounded-full animate-[spin_30s_linear_infinite]">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                      </div>

                      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#1A1A1E] shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10 bg-black">
                        <img 
                          src={previewImage || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                          alt="Profile"
                          className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500 group-hover:scale-110"
                        />
                        {/* Overlay: Upload Icon */}
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                          <Upload className="w-6 h-6 text-[#D4AF37] mb-1 animate-bounce" />
                          <span className="text-[9px] text-white font-bold uppercase">Đổi Ảnh</span>
                        </div>
                      </div>

                      {/* Icon trang trí */}
                      <div className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full border-4 border-[#141414] z-20 shadow-lg">
                        <ChefHat className="w-4 h-4 text-black" />
                      </div>
                    </div>
                    {/* Input file ẩn */}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>

                  {/* --- SCENE 2: THE SCRIPT (INPUTS) --- */}
                  <div className="space-y-8">
                    
                    {/* Input: Display Name */}
                    <div className="group relative">
                      <label className="absolute -top-3 left-0 text-[10px] font-bold text-[#D4AF37] bg-[#141414] px-2 uppercase tracking-widest flex items-center gap-1">
                        <User className="w-3 h-3" /> Nhân Vật Chính (Tên)
                      </label>
                      <input 
                        type="text" 
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="w-full bg-transparent border-2 border-[#333] rounded-sm px-4 py-4 text-white text-lg font-medium focus:border-[#D4AF37] focus:outline-none transition-all placeholder-gray-700 hover:border-[#444]"
                        placeholder="VD: Chef Remy"
                      />
                    </div>

                    {/* Input: Bio */}
                    <div className="group relative">
                      <label className="absolute -top-3 left-0 text-[10px] font-bold text-[#D4AF37] bg-[#141414] px-2 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Kịch Bản (Tiểu Sử)
                      </label>
                      <div className="relative">
                        <textarea 
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-transparent border-2 border-[#333] rounded-sm px-4 py-4 text-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all resize-none text-sm leading-relaxed placeholder-gray-700 hover:border-[#444]"
                          placeholder="Mô tả phong cách nấu nướng của bạn..."
                        />
                        <Utensils className="absolute bottom-3 right-3 w-4 h-4 text-[#333] group-focus-within:text-[#D4AF37] transition-colors" />
                      </div>
                    </div>

                  </div>

                  {/* --- FINALE: ACTIONS --- */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#333] border-dashed">
                    <button 
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="px-6 py-3 border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all uppercase text-xs font-bold tracking-widest rounded-sm"
                    >
                      Hủy Bỏ
                    </button>
                    
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-6 py-3 bg-[#D4AF37] hover:bg-[#F2C94C] text-black font-bold uppercase text-xs tracking-widest rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Đang Lưu...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Lưu Vào Phim
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* SPROCKET HOLES (RIGHT) */}
          <div className="w-12 bg-[#050505] border-l border-[#222] flex flex-col items-center py-4 gap-6 relative z-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-[#222] rounded-[2px] shadow-inner"></div>
            ))}
          </div>

        </div>
        
        {/* Footer Note */}
        <div className="text-center mt-6 text-[#333] text-[10px] uppercase tracking-[0.2em] font-mono">
          Cinetaste Studios • Est. 2024
        </div>

      </div>
    </div>
  );
}