// src/components/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import {
  Film,
  Search,
  User as UserIcon,
  Menu,
  X,
  LogOut,
  Heart,
  Bell,
  ChefHat  // <-- THÊM ICON MỚI
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';
import { type User } from '../../contexts/AuthContext';
import SearchBar from './SearchBar';
import ThemeToggleButton from '../ThemeToggleButton'; // <-- IMPORT COMPONENT MỚI

// --- COMPONENT AVATAR (Dùng để hiển thị ảnh hoặc chữ cái) ---
const Avatar = ({ user }: { user: User }) => {
  const { displayName, username, profileImageUrl } = user;
  
  if (profileImageUrl) {
    return (
      <img 
        src={profileImageUrl} 
        alt={displayName || username} 
        className="w-8 h-8 rounded-full object-cover" 
      />
    );
  }
  
  const firstLetter = (displayName || username)?.[0]?.toUpperCase();
  
  return (
    <div className="w-8 h-8 rounded-full bg-cinematic-accent flex items-center justify-center text-white font-bold text-sm">
      {firstLetter || <UserIcon className="w-5 h-5" />}
    </div>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false); // <-- State cho chuông thông báo
  
  // --- THÊM MỚI: State cho modal tìm kiếm ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // ------------------------------------------
  
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifyMenuRef = useRef<HTMLDivElement>(null); // <-- Ref cho chuông thông báo
  const { user, logout, isLoading } = useAuth();

  // --- THÊM MỚI: useNavigate ---
  const navigate = useNavigate();
  // -----------------------------

  // --- Logic hiệu ứng cuộn chuột ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Logic đóng dropdown khi click ra ngoài ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifyMenuRef.current && !notifyMenuRef.current.contains(event.target as Node)) {
        setIsNotifyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- THÊM MỚI: Logic đóng modal search khi chuyển trang ---
  useEffect(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  }, [isSearchOpen, location.pathname]);
  // ----------------------------------------------------

  // --- THÊM MỚI: Hàm xử lý tìm kiếm ---
  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/browse?q=${encodeURIComponent(query)}`);
    }
  };
  // ------------------------------------

  // --- Class styles ---
  // Style link mới (gạch chân)
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-cinematic-accent font-semibold'
        : 'text-gray-300 hover:text-white'
    } after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-0 after:h-0.5 after:bg-cinematic-accent after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100' : 'after:scale-x-0'
    } hover:after:scale-x-100`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? 'text-white bg-cinematic-accent'
        : 'text-gray-300 hover:text-white hover:bg-cinematic-gray'
    }`;
  
  const dropdownLinkClass = "flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cinematic-gray-light hover:text-white w-full text-left rounded-md transition-colors";

  // Class động cho Navbar (cho hiệu ứng cuộn)
  const navClasses = `
    fixed top-0 left-0 right-0 z-50 
    transition-all duration-300 ease-in-out
    ${(scrolled || !isOnHomePage) 
      ? 'bg-cinematic-dark/95 backdrop-blur-sm border-b border-gray-800' 
      : 'bg-transparent border-b border-transparent'
    }
  `;

  return (
    <> {/* <-- THÊM: Bọc bằng Fragment */}
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* 1. Logo (Bên trái) */}
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <Film className="w-8 h-8 text-cinematic-accent group-hover:text-cinematic-gold transition-colors" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">
                CineTaste
              </span>
            </Link>

            {/* 2. Menu chính và Auth (Bên phải) - THEO YÊU CẦU MỚI */}
            <div className="hidden md:flex items-center space-x-6">
              
              {/* Các link điều hướng */}
              <div className="flex items-center space-x-4">
                <NavLink to="/" className={navLinkClass}>
                  <span>Trang chủ</span>
                </NavLink>
                <NavLink to="/browse" className={navLinkClass}>
                  <span>Khám phá</span>
                </NavLink>
                <NavLink to="/scene-to-recipe" className={navLinkClass}>
                  <span>AI Scene</span>
                </NavLink>
                <NavLink to="/community" className={navLinkClass}>
                  <span>Cộng đồng</span>
                </NavLink>
              </div>

              {/* Ngăn cách */}
              <div className="h-6 w-px bg-gray-700"></div>

              {/* Các nút Auth */}
              <div className="flex items-center space-x-4">
                {/* --- THÊM NÚT TÌM KIẾM (LUÔN HIỂN THỊ) --- */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-300 hover:text-cinematic-accent transition-colors" 
                  title="Tìm kiếm"
                >
                  <Search className="w-5 h-5" />
                </button>
                {/* ------------------------------------------- */}

                {!isLoading && (
                  <>
                    {user ? (
                      // --- ĐÃ ĐĂNG NHẬP ---
                      <>
                        {/* --- THÊM MỚI: NÚT THÔNG BÁO --- */}
                        <div ref={notifyMenuRef} className="relative">
                          <button
                            onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                            className="relative p-2 rounded-full text-gray-300 hover:text-cinematic-accent hover:bg-cinematic-gray transition-colors"
                            title="Thông báo"
                          >
                            <Bell className="w-5 h-5" />
                            {/* Dấu chấm đỏ (ví dụ) */}
                            <span className="absolute top-2 right-2 block w-2 h-2 bg-cinematic-accent rounded-full"></span>
                          </button>

                          {/* Dropdown Thông báo */}
                          {isNotifyOpen && (
                            <div className="absolute right-0 top-12 mt-2 w-80 bg-cinematic-gray rounded-lg shadow-lg border border-gray-700 z-50 animate-slideDown origin-top-right">
                              <div className="p-3 border-b border-gray-700">
                                <h3 className="text-base font-semibold text-white">Thông báo</h3>
                              </div>
                              <div className="py-2 max-h-80 overflow-y-auto">
                                {/* --- Thông báo mẫu --- */}
                                <div className="px-4 py-3 hover:bg-cinematic-gray-light cursor-pointer">
                                  <p className="text-sm text-white font-medium">Chào mừng đến với CineTaste!</p>
                                  <p className="text-xs text-gray-400">Hãy khám phá các công thức ngay.</p>
                                </div>
                                <div className="px-4 py-3 hover:bg-cinematic-gray-light cursor-pointer border-t border-gray-700">
                                  <p className="text-sm text-white">Công thức "Bánh Táo" của bạn đã được duyệt.</p>
                                  <p className="text-xs text-gray-400">2 giờ trước</p>
                                </div>
                                <div className="px-4 py-3 hover:bg-cinematic-gray-light cursor-pointer border-t border-gray-700">
                                  <p className="text-sm text-white">@chef_auguste đã theo dõi bạn.</p>
                                  <p className="text-xs text-gray-400">1 ngày trước</p>
                                </div>
                              </div>
                              <div className="p-2 border-t border-gray-700 text-center">
                                <Link to="/notifications" className="text-sm text-cinematic-accent hover:underline">
                                  Xem tất cả
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* --- MENU PROFILE (USER) --- */}
                        <div ref={profileMenuRef} className="relative">
                          <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="rounded-full flex items-center transition-opacity hover:opacity-80"
                            title="Tài khoản"
                          >
                            <Avatar user={user} />
                          </button>

                          {/* Dropdown Profile */}
{isProfileOpen && (
  <div className="absolute right-0 top-12 mt-2 w-64 bg-cinematic-gray rounded-lg 
                  shadow-lg border border-gray-700 py-2 z-50 animate-slideDown origin-top-right">
    
    {/* Header với avatar và tên */}
    <div className="px-4 py-3 border-b border-gray-700 flex items-center space-x-3">
      <div className="flex-shrink-0">
        <Avatar user={user} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">
          {user.displayName || user.username}
        </p>
        <p className="text-xs text-gray-400 truncate">
          @{user.username}
        </p>
      </div>
    </div>
    
    {/* Menu items */}
    <div className="p-2 space-y-1">
      {/* Link đến profile */}
      <Link 
        to="/profile" 
        className={dropdownLinkClass}
        onClick={() => setIsProfileOpen(false)}
      >
        <UserIcon className="w-4 h-4 mr-3 text-gray-400" />
        Hồ sơ của tôi
      </Link>
      
      {/* Link đến favorites */}
      <Link 
        to="/profile/favorites"
        className={dropdownLinkClass}
        onClick={() => setIsProfileOpen(false)}
      >
        <Heart className="w-4 h-4 mr-3 text-gray-400" />
        Công thức yêu thích
      </Link>
      
      {/* ===== THÊM NÚT CHUYỂN THEME Ở ĐÂY ===== */}
      <ThemeToggleButton />
      {/* ======================================== */}
      
      {/* Divider */}
      <div className="border-t border-gray-700 my-1 !mt-2 !mb-1"></div>

      {/* Nút logout */}
      <button
        onClick={() => {
          logout();
          setIsProfileOpen(false);
        }}
        className={`${dropdownLinkClass} text-cinematic-accent hover:!text-cinematic-accent-light`}
      >
        <LogOut className="w-4 h-4 mr-3" />
        Đăng xuất
      </button>
    </div>
  </div>
)}
                        </div>
                      </>
                    ) : (
                      // --- CHƯA ĐĂNG NHẬP ---
                      <>
                        {/* Nút search đã bị chuyển ra ngoài */}
                        <Link to="/login" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">
                          Đăng nhập
                        </Link>
                        <Button as="link" href="/register" size="sm" variant="primary">
                          Đăng ký
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 3. Nút mở Menu (Mobile) */}
            <div className="md:hidden flex items-center space-x-2"> {/* THÊM: Nút search cho mobile */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-cinematic-accent transition-colors" 
                title="Tìm kiếm"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                className="p-2 text-gray-300 hover:text-cinematic-accent transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* 4. Menu Mobile (Đã dịch) */}
        {isMenuOpen && (
          <div className="md:hidden bg-cinematic-gray border-t border-gray-800 animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Trang chủ</NavLink>
              <NavLink to="/browse" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Khám phá</NavLink>
              <NavLink to="/scene-to-recipe" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>AI Scene</NavLink>
              <NavLink to="/community" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Cộng đồng</NavLink>
              
              <div className="pt-3 border-t border-gray-700 space-y-2">
                {!isLoading && (
                  <>
                    {user ? (
                      <>
                        <NavLink to="/profile" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                          Hồ sơ của tôi
                        </NavLink>
                        <NavLink to="/profile/favorites" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                          Công thức yêu thích
                        </NavLink>
                        <button
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-cinematic-accent hover:bg-cinematic-gray"
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                          Đăng nhập
                        </NavLink>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full text-center" variant="primary">Đăng ký</Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- THÊM MỚI: MODAL TÌM KIẾM --- */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-center items-start pt-20"
        >
          {/* Lớp nền mờ */}
          <div 
            className="absolute inset-0 bg-cinematic-darker/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsSearchOpen(false)}
          ></div>
          
          {/* Nội dung Modal */}
          <div className="relative z-10 w-full max-w-3xl px-4 animate-slideDown">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Tìm kiếm công thức, phim, hoặc nguyên liệu..."
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute -top-10 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
      {/* --------------------------------- */}
    </>
  );
}