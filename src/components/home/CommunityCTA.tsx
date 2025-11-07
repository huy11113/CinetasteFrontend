// src/components/home/CommunityCTA.tsx
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Users, ChefHat, Film, ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react';

export default function CommunityCTA() {
  const { user } = useAuth();

  // Nếu user đã đăng nhập, không hiển thị
  if (user) {
    return null;
  }

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Spotlight from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                        bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Kitchen texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
               backgroundSize: '100% 40px'
             }} />
        
        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      {/* Film strip decorations */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Card */}
        <div className="relative">
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-amber-500/20 rounded-full blur-sm" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 border-2 border-amber-500/20 rounded-full blur-sm" />
          
          {/* Content Container */}
          <div className="relative bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/80 
                          backdrop-blur-xl rounded-2xl border border-zinc-800/50 
                          shadow-2xl overflow-hidden">
            
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            
            <div className="relative p-8 sm:p-12 lg:p-16">
              
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 
                                bg-amber-500/10 backdrop-blur-sm rounded-full 
                                border border-amber-500/30">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="text-sm font-semibold text-amber-500 tracking-wide uppercase">
                    Tham gia ngay hôm nay
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-white mb-6">
                Trở thành thành viên của{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    CineTaste
                  </span>
                  <div className="absolute bottom-2 left-0 right-0 h-3 bg-amber-500/20 blur-sm" />
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-center text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-12">
                Kết nối với cộng đồng đam mê ẩm thực điện ảnh, chia sẻ công thức 
                và khám phá những món ăn kinh điển từ các bộ phim yêu thích
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-5xl mx-auto">
                {[
                  { icon: Users, value: '1.2K+', label: 'Thành viên', color: 'from-blue-500 to-cyan-500' },
                  { icon: ChefHat, value: '500+', label: 'Công thức', color: 'from-orange-500 to-amber-500' },
                  { icon: Film, value: '50+', label: 'Phim', color: 'from-purple-500 to-pink-500' },
                  { icon: Star, value: '4.9/5', label: 'Đánh giá', color: 'from-yellow-500 to-orange-500' },
                ].map((stat, index) => (
                  <div key={index} className="group relative">
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-300`} />
                    
                    {/* Card */}
                    <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 
                                    rounded-xl p-4 sm:p-6 text-center
                                    group-hover:border-amber-500/30 group-hover:bg-zinc-900/70
                                    transition-all duration-300 group-hover:scale-105">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full 
                                     bg-gradient-to-br ${stat.color} mb-3`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
                {[
                  { icon: Sparkles, title: 'Công thức độc quyền', desc: 'Truy cập hàng trăm công thức từ phim' },
                  { icon: Users, title: 'Cộng đồng sôi động', desc: 'Kết nối với người cùng đam mê' },
                  { icon: TrendingUp, title: 'Học hỏi nâng cao', desc: 'Tips từ các đầu bếp chuyên nghiệp' },
                  { icon: Film, title: 'Phân tích chi tiết', desc: 'Deep dive vào ẩm thực điện ảnh' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg 
                                              bg-zinc-900/30 border border-zinc-800/50
                                              hover:bg-zinc-900/50 hover:border-amber-500/30
                                              transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 
                                    flex items-center justify-center flex-shrink-0
                                    group-hover:bg-amber-500/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link to="/register" className="w-full sm:w-auto">
                  <button className="group relative w-full sm:w-auto px-8 py-4 
                                     bg-gradient-to-r from-amber-500 to-orange-500 
                                     hover:from-amber-600 hover:to-orange-600
                                     text-black font-bold rounded-lg 
                                     shadow-lg shadow-amber-500/30
                                     hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105
                                     transition-all duration-300
                                     flex items-center justify-center gap-2 overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                    translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative">Đăng ký Miễn phí</span>
                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 
                                     bg-transparent border-2 border-zinc-700 
                                     hover:border-amber-500/50 hover:bg-zinc-800/50
                                     text-white font-semibold rounded-lg
                                     transition-all duration-300 hover:scale-105
                                     flex items-center justify-center gap-2">
                    <span>Đã có tài khoản?</span>
                  </button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>Miễn phí hoàn toàn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
              </div>

            </div>
            
            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}