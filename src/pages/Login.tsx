// src/pages/Login.tsx
import { useState } from 'react';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin, {
  type SuccessResponse as FacebookSuccessResponse // <-- SỬA LỖI 1: Thêm kiểu
} from '@greatsumini/react-facebook-login';
import apiClient from '../services/apiClient';
import { LoginResponse } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// --- (Các icon GoogleIcon và FacebookIcon giữ nguyên) ---
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
// ----------------------------

const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID"; // Thay ID của bạn vào đây

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    loginIdentifier: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const { login, handleSocialLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null); 
    setIsLoading(true); 
    try {
      await login(formData.loginIdentifier, formData.password);
      navigate('/'); 
    } catch (err: unknown) { // <-- SỬA LỖI 2: 'err' đã được sử dụng
      console.error('Login failed:', err);
      if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
        setError('Sai tên đăng nhập hoặc mật khẩu.');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false); 
    }
  };

  const handleGoogleLoginSuccess = async (tokenResponse: { access_token: string }) => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/google', 
        { token: tokenResponse.access_token }
      );
      handleSocialLogin(response.data);
      toast.success(`Chào mừng, ${response.data.displayName || response.data.username}!`);
      navigate('/');
    } catch (err: unknown) { // <-- SỬA LỖI 3: Dùng 'err: unknown'
      setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
      console.error("Google Login Failed", err); // In lỗi ra
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({ 
    onSuccess: handleGoogleLoginSuccess, 
    onError: (errorResponse) => { // <-- SỬA LỖI 4: 'errorResponse' đã được sử dụng
      console.error('Google Login Error', errorResponse);
      setError("Lỗi đăng nhập Google.");
    } 
  });

  const handleFacebookLoginSuccess = async (response: FacebookSuccessResponse) => { // <-- SỬA LỖI 5: Dùng kiểu 'FacebookSuccessResponse'
    if (response.accessToken) {
      setIsFacebookLoading(true);
      setError(null);
      try {
        const res = await apiClient.post<LoginResponse>(
          '/auth/facebook',
          { token: response.accessToken }
        );
        handleSocialLogin(res.data);
        toast.success(`Chào mừng, ${res.data.displayName || res.data.username}!`);
        navigate('/');
      } catch (err: unknown) { // <-- SỬA LỖI 6: Dùng 'err: unknown'
        setError("Đăng nhập Facebook thất bại. Vui lòng thử lại.");
        console.error("Facebook Login Failed", err); // In lỗi ra
      } finally {
        setIsFacebookLoading(false);
      }
    } else {
      setError("Không thể lấy token từ Facebook.");
    }
  };

  const handleFacebookLoginFail = (errorResponse: { status?: string }) => { // <-- SỬA LỖI 7: 'errorResponse' đã được sử dụng
    console.error('Facebook Login Error', errorResponse);
    setError("Đăng nhập Facebook bị hủy hoặc thất bại.");
  };

  const anyLoading = isLoading || isGoogleLoading || isFacebookLoading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* (Phần còn lại của JSX giữ nguyên y hệt, chỉ thay đổi 'disabled') */}
      
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/7234394/pexels-photo-7234394.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Cinema background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-cinematic-gray/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-gray-800 shadow-glow-red">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-4 group">
              <Film className="w-10 h-10 text-cinematic-accent group-hover:text-cinematic-gold transition-colors" />
              <span className="text-3xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">CineTaste</span>
            </Link>
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue your culinary journey</p>
          </div>

          {/* Form đăng nhập thường */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email hoặc Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" name="loginIdentifier" value={formData.loginIdentifier} onChange={(e) => setFormData({ ...formData, loginIdentifier: e.target.value })} className="input-field pl-10" placeholder="your@email.com or username" required disabled={anyLoading} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input-field pl-10 pr-10" placeholder="Enter your password" required disabled={anyLoading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.remember} onChange={(e) => setFormData({ ...formData, remember: e.target.checked })} className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-cinematic-accent hover:text-cinematic-accent-light">Forgot password?</Link>
            </div>
            {error && (<p className="text-sm text-red-400 text-center">{error}</p>)}
            <Button type="submit" className="w-full" disabled={anyLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Sign In'}
            </Button>
          </form>

          {/* Các nút Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-cinematic-gray text-gray-400">Or continue with</span></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Nút Google */}
              <button
                type="button"
                onClick={() => googleLogin()}
                disabled={anyLoading}
                className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <GoogleIcon />
                )}
                Google
              </button>
              {/* Nút Facebook */}
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                onSuccess={handleFacebookLoginSuccess}
                onFail={handleFacebookLoginFail}
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    disabled={anyLoading}
                    className="flex items-center justify-center px-4 py-3 bg-blue-600 border border-blue-700 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isFacebookLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FacebookIcon />
                    )}
                    Facebook
                  </button>
                )}
              />
            </div>
          </div>

          {/* Link Đăng ký */}
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