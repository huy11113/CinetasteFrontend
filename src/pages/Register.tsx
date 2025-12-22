// src/pages/Register.tsx
import { useState } from 'react';
import { Film, Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin, {
  type SuccessResponse as FacebookSuccessResponse 
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

const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID"; 

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const { register, handleSocialLogin } = useAuth();
  const navigate = useNavigate();

  const isUsernameValid = formData.username.length >= 3;
  const showUsernameError = formData.username.length > 0 && !isUsernameValid;

  const passwordStrength = (password: string) => {
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
    if (!isUsernameValid) {
      setError("Username phải có ít nhất 3 ký tự.");
      return;
    }
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
      await register(formData.username, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) { // <-- SỬA LỖI 2: 'err' đã được sử dụng
      console.error('Registration failed:', err);
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        if (typeof data === 'string') {
          setError(data); 
        } else if (data && typeof data === 'object') {
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
    } catch (err: unknown) { 
      setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
      console.error("Google Login Failed", err); //
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({ 
    onSuccess: handleGoogleLoginSuccess, 
    onError: (errorResponse) => { 
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
      } catch (err: unknown) { 
        setError("Đăng nhập Facebook thất bại. Vui lòng thử lại.");
        console.error("Facebook Login Failed", err); 
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
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
            <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join the cinematic culinary community</p>
          </div>

          {/* Form đăng ký */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className={`input-field pl-10 ${showUsernameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`} placeholder="JohnDoe (ít nhất 3 ký tự)" required disabled={anyLoading} />
                </div>
                {showUsernameError && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span>Username phải có ít nhất 3 ký tự.</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field pl-10" placeholder="your@email.com" required disabled={anyLoading} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input-field pl-10 pr-10" placeholder="8+ chars, 1 upper, 1 num, 1 special" required disabled={anyLoading} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1"><span className="text-gray-400">Password strength:</span><span className={strength.color}>{strength.text}</span></div>
                    <div className="flex space-x-1">{[1, 2, 3].map((level) => (<div key={level} className={`h-1 flex-1 rounded ${level <= strength.strength ? (level === 1 ? 'bg-red-400' : level === 2 ? 'bg-yellow-400' : 'bg-green-400') : 'bg-gray-700'}`} />))}</div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="input-field pl-10 pr-10" placeholder="Confirm your password" required disabled={anyLoading} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2 text-xs">
                    {passwordsMatch ? (<><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-green-400">Passwords match</span></>) : (<><XCircle className="w-4 h-4 text-red-400" /><span className="text-red-400">Passwords don't match</span></>)}
                  </div>
                )}
              </div>
              {error && (<p className="text-sm text-red-400 text-center break-words">{error}</p>)}
              <Button type="submit" className="w-full" disabled={anyLoading || !isUsernameValid || !passwordsMatch || strength.strength < 3}>
                {isLoading ? 'Đang tạo...' : 'Create Account'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-300">Đang điều hướng bạn đến trang đăng nhập...</p>
            </div>
          )}

          {/* Các nút Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-cinematic-gray text-gray-400">Or sign up with</span></div>
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

          {/* Link Đăng nhập */}
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