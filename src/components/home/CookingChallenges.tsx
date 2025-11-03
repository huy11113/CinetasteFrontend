// src/components/home/CookingChallenges.tsx
import { Trophy } from 'lucide-react';
import Button from '../Button';
import { Link } from 'react-router-dom';

// Dữ liệu này vẫn là tĩnh vì chúng ta chưa có API cho nó
const challenges = [
  {
    title: 'Marathon Phim Mùa Đông',
    description: 'Nấu 5 món từ phim chủ đề mùa đông',
    participants: 1234,
    daysLeft: 12,
  },
  {
    title: 'Tuần Lễ Tráng Miệng',
    description: 'Làm chủ các món tráng miệng kinh điển',
    participants: 892,
    daysLeft: 5,
  },
  {
    title: 'Thử Thách Nhanh Gọn',
    description: 'Công thức phim dưới 30 phút',
    participants: 2156,
    daysLeft: 8,
  },
];

export default function CookingChallenges() {
  return (
    <section className="bg-cinematic-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Thử thách Nấu ăn</h2>
            <p className="text-gray-400">Tham gia cộng đồng và giành huy hiệu</p>
          </div>
          <Button as="link" href="/community" variant="secondary" className="hidden md:flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>Xem tất cả Thử thách</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-cinematic-gray rounded-xl p-6 border border-gray-800 hover:border-cinematic-gold transition-all duration-300 hover:shadow-glow-gold"
            >
              <div className="flex items-start justify-between mb-4">
                <Trophy className="w-8 h-8 text-cinematic-gold" />
                <span className="text-sm text-gray-400">{challenge.daysLeft} ngày còn lại</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
              <p className="text-gray-400 mb-4">{challenge.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{challenge.participants.toLocaleString()} người tham gia</span>
                <Button size="sm">Tham gia</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}