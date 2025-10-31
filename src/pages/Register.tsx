// src/pages/Register.tsx
import { useState } from 'react';
import { Film, Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext'; // <-- Import
import { useNavigate, Link } from 'react-router-dom'; // <-- Import

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '', // <-- Đổi 'name' thành 'username' cho khớp DTO
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false); // <-- Thêm state thành công

  const { register } = useAuth(); // <-- Lấy hàm register
  const navigate = useNavigate();

  // ... (Hàm passwordStrength giữ nguyên) ...
  const passwordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 8) return { strength: 1, text: 'Weak', color: 'text-red-400' };
    // Thêm kiểm tra regex khớp với backend
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    if (strongRegex.test(password)) {
       return { strength: 3, text: 'Strong', color: 'text-green-400' };
    }
    return { strength: 2, text: 'Medium', color: 'text-yellow-400' };
  };

  const strength = passwordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError("Mật khẩu không khớp.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    try {
      // Gọi API đăng ký
      await register(formData.username, formData.email, formData.password);
      setSuccess(true);
      // Đợi 2 giây rồi điều hướng
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data) {
        // Lỗi từ backend (ví dụ: "Username already taken")
        setError(err.response.data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
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
            <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join the cinematic culinary community</p>
          </div>
          
          {/* Form đăng ký */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username {/* <-- Đổi từ Full Name thành Username */}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-field pl-10"
                    placeholder="Chọn username của bạn"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field pl-10"
                    placeholder="your@email.com"
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
                    placeholder="Tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt"
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
                {/* ... (Phần hiển thị độ mạnh mật khẩu giữ nguyên) ... */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* ... (Phần kiểm tra mật khẩu khớp giữ nguyên) ... */}
              </div>
              
              {/* Hiển thị lỗi */}
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !passwordsMatch || strength.strength < 2}>
                {isLoading ? 'Đang tạo...' : 'Create Account'}
              </Button>
            </form>
          ) : (
            // Hiển thị thông báo thành công
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-300">
                Đang điều hướng bạn đến trang đăng nhập...
              </p>
            </div>
          )}

          {/* ... (Phần "Or sign up with" giữ nguyên) ... */}

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cinematic-accent hover:text-cinematic-accent-light font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}