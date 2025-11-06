import React, { useState, useEffect } from 'react';
import { Star, ChefHat, Film } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Maria Chen",
      role: "Food Blogger & Film Critic",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      content: "Nơi đây đã thay đổi hoàn toàn cách tôi nhìn nhận về ẩm thực trong điện ảnh. Mỗi bài viết đều là một hành trình đầy cảm hứng!",
      rating: 5,
      type: "film"
    },
    {
      id: 2,
      name: "James Anderson",
      role: "Professional Chef",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      content: "Tôi đã tìm thấy vô số công thức tuyệt vời được lấy cảm hứng từ phim ảnh. Đội ngũ phân tích chi tiết từng món ăn.",
      rating: 5,
      type: "culinary"
    },
    {
      id: 3,
      name: "Sophie Dubois",
      role: "Culinary Cinematographer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      content: "Website này không chỉ đẹp mắt mà còn có chiều sâu chuyên môn đáng kinh ngạc. Đây là cầu nối hoàn hảo giữa hai nghệ thuật!",
      rating: 5,
      type: "film"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Cinema Spotlight Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.03),transparent_50%)]"></div>
      </div>

      {/* Kitchen Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
        backgroundSize: '100% 40px'
      }}></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">Testimonials</span>
            <ChefHat className="w-5 h-5 text-amber-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Người Dùng Nói Gì
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="relative p-8 md:p-12">
              {/* Film Strip Border Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-900 via-amber-500 to-zinc-900"></div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-lg">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  {/* Type Badge */}
                  <div className="mt-3 flex justify-center">
                    {testimonials[activeIndex].type === 'film' ? (
                      <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                        <Film className="w-3 h-3 text-amber-500" />
                        <span className="text-xs text-amber-500">Cinema</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">
                        <ChefHat className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-500">Culinary</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex gap-1 justify-center md:justify-start mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Film Strip Border Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-900 via-amber-500 to-zinc-900"></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 h-2 bg-amber-500' 
                    : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-600'
                } rounded-full`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className="text-2xl font-bold text-amber-500 mb-1">50K+</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="text-center p-4 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className="text-2xl font-bold text-amber-500 mb-1">1000+</div>
            <div className="text-xs text-gray-500">Recipes</div>
          </div>
          <div className="text-center p-4 bg-zinc-900/50 border border-zinc-800 rounded">
            <div className="text-2xl font-bold text-amber-500 mb-1">4.9/5</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;