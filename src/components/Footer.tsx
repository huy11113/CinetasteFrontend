import { Film, ChefHat, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-800 mt-20 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                        bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        {/* Kitchen Texture */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
               backgroundSize: '100% 40px'
             }} />
      </div>

      {/* Film Strip Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Film className="w-7 h-7 text-amber-500" />
                <ChefHat className="w-4 h-4 text-amber-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-white">
                Cine<span className="text-amber-500">Taste</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Kết hợp nghệ thuật điện ảnh với niềm vui nấu nướng. Nơi ẩm thực gặp gỡ phim ảnh.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-2">
              <a href="#" className="group w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg 
                                     hover:border-amber-500/50 hover:bg-zinc-800 transition-all
                                     flex items-center justify-center">
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </a>
              <a href="#" className="group w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg 
                                     hover:border-amber-500/50 hover:bg-zinc-800 transition-all
                                     flex items-center justify-center">
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </a>
              <a href="#" className="group w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg 
                                     hover:border-amber-500/50 hover:bg-zinc-800 transition-all
                                     flex items-center justify-center">
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </a>
              <a href="#" className="group w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg 
                                     hover:border-amber-500/50 hover:bg-zinc-800 transition-all
                                     flex items-center justify-center">
                <Youtube className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Khám phá
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/browse" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Duyệt công thức
                </a>
              </li>
              <li>
                <a href="/scene-to-recipe" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  AI nhận diện cảnh
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Cộng đồng
                </a>
              </li>
              <li>
                <a href="/challenges" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Thử thách nấu ăn
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Hỗ trợ
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="/about" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-500 transition-colors"></span>
                  Chính sách riêng tư
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Nhận tin mới
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Đăng ký để nhận công thức mới và tin tức phim ảnh
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg 
                           text-white text-sm placeholder-gray-600
                           focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg 
                                transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; 2025 CineTaste. Mọi quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/terms" className="text-gray-500 hover:text-amber-500 transition-colors">
                Điều khoản
              </a>
              <span className="text-gray-700">•</span>
              <a href="/privacy" className="text-gray-500 hover:text-amber-500 transition-colors">
                Riêng tư
              </a>
              <span className="text-gray-700">•</span>
              <a href="/cookies" className="text-gray-500 hover:text-amber-500 transition-colors">
                Cookies
              </a>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-xs italic">
              "Nếm trọn hương vị của điện ảnh" 🎬🍳
            </p>
          </div>
        </div>

      </div>

      {/* Film Strip Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      
    </footer>
  );
}