// src/components/home/CommunityCTA.tsx
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Import useAuth

export default function CommunityCTA() {
  const { user } = useAuth(); // Kiểm tra xem user đã đăng nhập chưa

  // Nếu user đã đăng nhập, không cần hiển thị mục này
  if (user) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-r from-cinematic-accent to-cinematic-gold rounded-2xl p-12 text-center">
        <h2 className="text-4xl font-display font-bold text-white mb-4">
          Tham gia Cộng đồng CineTaste
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Chia sẻ sáng tạo, kết nối với những người đam mê ẩm thực điện ảnh, và khám phá công thức mới mỗi ngày.
        </p>
        <Button as="link" href="/register" variant="secondary" size="lg" className="bg-white text-cinematic-accent hover:bg-gray-100">
          Đăng ký Miễn phí
        </Button>
      </div>
    </section>
  );
}