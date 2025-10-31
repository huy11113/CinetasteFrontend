// src/components/Navbar.tsx
import { useState } from 'react';
import { Film, Search, User, Menu, X, Upload, Home, BookOpen, Users, LogOut, Plus } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom'; // <-- Dùng Link/NavLink
import { useAuth } from '../contexts/AuthContext'; // <-- Import
import Button from './Button'; // <-- Import Button

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth(); // <-- Lấy trạng thái user và hàm logout

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-white bg-cinematic-accent'
        : 'text-gray-300 hover:text-white hover:bg-cinematic-gray'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? 'text-white bg-cinematic-accent'
        : 'text-gray-300 hover:text-white hover:bg-cinematic-gray'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cinematic-dark/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <Film className="w-8 h-8 text-cinematic-accent group-hover:text-cinematic-gold transition-colors" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">
                CineTaste
              </span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/" className={navLinkClass}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/browse" className={navLinkClass}>
                <BookOpen className="w-4 h-4" />
                <span>Browse</span>
              </NavLink>
              <NavLink to="/scene-to-recipe" className={navLinkClass}>
                <Upload className="w-4 h-4" />
                <span>AI Scene</span>
              </NavLink>
              <NavLink to="/community" className={navLinkClass}>
                <Users className="w-4 h-4" />
                <span>Community</span>
              </NavLink>
            </div>
          </div>

          {/* Nút bên phải (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  // Đã đăng nhập
                  <>
                    <Button as="link" href="/recipe/submit" variant="outline" size="sm" className="flex items-center space-x-2">
                       <Plus className="w-4 h-4" />
                       <span>Submit Recipe</span>
                    </Button>
                    <Link to="/profile" className="p-2 rounded-full bg-cinematic-gray-light hover:bg-cinematic-gray transition-colors">
                      {/* TODO: Thay bằng ảnh avatar của user */}
                      <User className="w-5 h-5 text-gray-300" />
                    </Link>
                    <button
                      onClick={logout}
                      title="Đăng xuất"
                      className="p-2 rounded-full text-gray-400 hover:text-cinematic-accent hover:bg-cinematic-gray transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  // Chưa đăng nhập
                  <>
                    <button className="p-2 text-gray-300 hover:text-cinematic-accent transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                    <Link to="/login" className="text-gray-300 hover:text-cinematic-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Button as="link" href="/register" size="sm">
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Nút mở Menu (Mobile) */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-cinematic-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-cinematic-gray border-t border-gray-800">
          <div className="px-4 py-4 space-y-2">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/browse" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Browse Recipes</NavLink>
            <NavLink to="/scene-to-recipe" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>AI Scene</NavLink>
            <NavLink to="/community" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Community</NavLink>
            
            <div className="pt-3 border-t border-gray-700 space-y-2">
              {!isLoading && (
                <>
                  {user ? (
                    // Đã đăng nhập (Mobile)
                    <>
                      <NavLink to="/profile" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>
                      <NavLink to="/recipe/submit" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Submit Recipe</NavLink>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-cinematic-gray"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    // Chưa đăng nhập (Mobile)
                    <>
                      <NavLink to="/login" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full text-center">Sign Up</Button>
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
  );
}

// Cập nhật Button.tsx để hỗ trợ 'as="link"'
// Sửa file `src/components/Button.tsx`:

/* Thêm `Link` từ `react-router-dom` và cập nhật `ButtonProps`
và logic render trong `Button.tsx`
*/
// Ví dụ:
// import { ReactNode } from 'react';
// import { Link } from 'react-router-dom';

// interface BaseButtonProps {
//   children: ReactNode;
//   variant?: 'primary' | 'secondary' | 'outline';
//   size?: 'sm' | 'md' | 'lg';
//   className?: string;
//   disabled?: boolean;
// }

// type ButtonAsButton = BaseButtonProps & {
//   as?: 'button';
//   onClick?: () => void;
//   type?: 'button' | 'submit' | 'reset';
//   href?: never;
// };

// type ButtonAsLink = BaseButtonProps & {
//   as: 'link';
//   href: string;
//   onClick?: never;
//   type?: never;
// };

// type ButtonProps = ButtonAsButton | ButtonAsLink;

// export default function Button(props: ButtonProps) {
//   const { 
//     children, 
//     variant = 'primary', 
//     size = 'md', 
//     className = '', 
//     disabled = false 
//   } = props;

//   const baseStyles = 'font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

//   const variants = {
//     primary: 'bg-cinematic-accent text-white hover:bg-cinematic-accent-light hover:shadow-glow-red transform hover:scale-105',
//     secondary: 'bg-cinematic-gray-light text-white hover:bg-cinematic-gray border border-gray-700',
//     outline: 'bg-transparent text-cinematic-accent border-2 border-cinematic-accent hover:bg-cinematic-accent hover:text-white',
//   };

//   const sizes = {
//     sm: 'px-4 py-2 text-sm',
//     md: 'px-6 py-3 text-base',
//     lg: 'px-8 py-4 text-lg',
//   };

//   const appliedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

//   if (props.as === 'link') {
//     return (
//       <Link to={props.href} className={appliedClasses}>
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button
//       type={props.type || 'button'}
//       onClick={props.onClick}
//       disabled={disabled}
//       className={appliedClasses}
//     >
//       {children}
//     </button>
//   );
// }