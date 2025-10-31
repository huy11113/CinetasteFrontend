// src/pages/Login.tsx
import { useState } from 'react';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext'; // <-- Import
import { useNavigate, Link } from 'react-router-dom'; // <-- Import

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    loginIdentifier: '', // <-- Đổi tên cho khớp với DTO backend
    password: '',
    remember: false,
  });
  const [error, setError] = useState<string | null>(null); // <-- Thêm state cho lỗi
  const [isLoading, setIsLoading] = useState(false); // <-- Thêm state loading

  const { login } = useAuth(); // <-- Lấy hàm login từ context
  const navigate = useNavigate(); // <-- Lấy hook điều hướng

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(formData.loginIdentifier, formData.password);
      // Đăng nhập thành công, điều hướng về trang chủ
      navigate('/'); 
    } catch (err: any) {
      console.error('Login failed:', err);
      // Hiển thị lỗi cho người dùng
      if (err.response && err.response.status === 401) {
        setError('Sai tên đăng nhập hoặc mật khẩu.');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* ... (Phần ảnh nền giữ nguyên) ... */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7234394/pexels-photo-7234394.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Cinema background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-cinematic-gray/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-gray-800 shadow-glow-red">
          {/* ... (Phần logo header giữ nguyên) ... */}
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-4 group">
              <Film className="w-10 h-10 text-cinematic-accent group-hover:text-cinematic-gold transition-colors" />
              <span className="text-3xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">
                CineTaste
              </span>
            </Link>
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue your culinary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email hoặc Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text" // Đổi từ email sang text để chấp nhận username
                  value={formData.loginIdentifier}
                  onChange={(e) => setFormData({ ...formData, loginIdentifier: e.target.value })}
                  className="input-field pl-10"
                  placeholder="your@email.com or username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-cinematic-accent hover:text-cinematic-accent-light">
                Forgot password?
              </Link>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Sign In'}
            </Button>
          </form>

          {/* ... (Phần "Or continue with" giữ nguyên) ... */}
          <div className="mt-6">
             {/* ... */}
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cinematic-accent hover:text-cinematic-accent-light font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}