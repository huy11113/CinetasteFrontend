// src/pages/Register.tsx
import { useState } from 'react';
import { Film, Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth'; // Import hook
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios để kiểm tra lỗi

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '', // Đổi 'name' thành 'username'
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State cho thông báo thành công

  const { register } = useAuth(); // Lấy hàm register từ Context
  const navigate = useNavigate();

  // Kiểm tra độ mạnh mật khẩu (khớp với regex của DTO)
  const passwordStrength = (password: string) => {
    // Regex: 8+ ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt
    const strongRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (strongRegex.test(password)) {
       return { strength: 3, text: 'Strong', color: 'text-green-400' };
    }
    if (password.length > 7) {
       return { strength: 2, text: 'Medium', color: 'text-yellow-400' };
    }
    return { strength: 1, text: 'Weak', color: 'text-red-400' };
  };

  const strength = passwordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError("Mật khẩu không khớp.");
      return;
    }
    if (strength.strength < 3) {
      setError("Mật khẩu chưa đủ mạnh. Cần 8+ ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    try {
      // Gọi hàm register từ AuthContext
      await register(formData.username, formData.email, formData.password);
      setSuccess(true);
      // Đợi 2 giây rồi điều hướng đến trang đăng nhập
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) { // Sửa 'any' thành 'unknown'
      console.error('Registration failed:', err);
      // Xử lý lỗi từ backend
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        if (typeof data === 'string') {
          // Lỗi chung (vd: "Username already taken")
          setError(data); 
        } else if (data && typeof data === 'object') {
          // Lỗi validation (lấy lỗi đầu tiên)
          const firstError = Object.values(data)[0];
          setError(firstError as string);
        } else {
          setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
      } else {
        setError('Đã xảy ra lỗi không xác định.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7234394/pexels-photo-7234394.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Cinema background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-cinematic-gray/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-gray-800 shadow-glow-red">
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

          {/* Chỉ hiển thị form khi chưa đăng ký thành công */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username {/* Sửa từ 'Full Name' */}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="username" // Sửa từ 'name'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-field pl-10"
                    placeholder="JohnDoe"
                    required
                    disabled={isLoading}
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
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field pl-10"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
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
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field pl-10 pr-10"
                    placeholder="8+ chars, 1 upper, 1 num, 1 special"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Thanh độ mạnh mật khẩu */}
                {formData.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Password strength:</span>
                      <span className={strength.color}>{strength.text}</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= strength.strength
                              ? level === 1 ? 'bg-red-400' : level === 2 ? 'bg-yellow-400' : 'bg-green-400'
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Kiểm tra mật khẩu khớp */}
                {formData.confirmPassword.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2 text-xs">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Hiển thị lỗi */}
              {error && (
                <p className="text-sm text-red-400 text-center break-words">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !passwordsMatch || strength.strength < 3}
              >
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

          {/* Phần đăng nhập bằng Google/Facebook */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cinematic-gray text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

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