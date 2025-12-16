import { useState, useEffect } from 'react';
import { Send, MessageSquare, Clock, Trash2 } from 'lucide-react';
import { recipeService, Comment } from '../../services/recipeService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function CommentsSection({ recipeId }: { recipeId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load comment khi component được mount hoặc recipeId thay đổi
  useEffect(() => {
    if (recipeId) {
      loadComments();
    }
  }, [recipeId]);

  const loadComments = async () => {
    try {
      const data = await recipeService.getComments(recipeId);
      setComments(data);
    } catch (error) {
      console.error("Lỗi tải bình luận:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return;
    }

    try {
      setSubmitting(true);
      await recipeService.addComment(recipeId, { content: newComment });
      setNewComment('');
      toast.success("Đã gửi bình luận!");
      loadComments(); // Refresh lại danh sách ngay lập tức
    } catch (error) {
      toast.error("Không thể gửi bình luận");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#121212] rounded-3xl border border-white/5 p-6 md:p-8 mt-12 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#D4AF37]/10 p-2 rounded-full">
          <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">
          Bình Luận <span className="text-gray-500 text-base ml-1 font-sans">({comments.length})</span>
        </h3>
      </div>

      {/* Form Nhập Bình Luận */}
      <div className="flex gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-[#1A1A1E] border border-white/10 overflow-hidden flex-shrink-0">
          <img 
            src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.displayName || 'Guest'}&background=random`} 
            alt="My Avatar" 
            className="w-full h-full object-cover" 
          />
        </div>
        <form onSubmit={handleSubmit} className="flex-1 relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? "Chia sẻ cảm nghĩ của bạn về món ăn này..." : "Đăng nhập để bình luận..."}
            disabled={!user || submitting}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-3 pl-4 pr-14 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 focus:outline-none transition-all resize-none h-14 min-h-[56px] focus:h-24 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button 
            type="submit" 
            disabled={!user || submitting || !newComment.trim()}
            className="absolute right-3 bottom-3 p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group animate-fade-in">
            {/* Avatar Người khác */}
            <div className="w-10 h-10 rounded-full bg-[#1A1A1E] border border-white/10 overflow-hidden flex-shrink-0 mt-1">
              <img 
                // ✅ SỬA TÊN BIẾN CHO KHỚP BACKEND: authorProfileImageUrl
                src={comment.authorProfileImageUrl || `https://ui-avatars.com/api/?name=${comment.authorDisplayName}&background=random`} 
                // ✅ SỬA TÊN BIẾN CHO KHỚP BACKEND: authorDisplayName
                alt={comment.authorDisplayName} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1">
              <div className="bg-[#1A1A1E]/50 rounded-2xl rounded-tl-none p-4 border border-white/5 hover:border-white/10 transition-colors relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm hover:text-[#D4AF37] cursor-pointer transition-colors">
                    {/* ✅ HIỂN THỊ TÊN ĐÚNG */}
                    {comment.authorDisplayName || "Người dùng ẩn danh"}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {/* Xử lý ngày tháng an toàn */}
                    {(() => {
                        try {
                            return formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi });
                        } catch {
                            return "Vừa xong";
                        }
                    })()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-sm italic">Chưa có bình luận nào. Hãy là người đầu tiên thưởng thức!</p>
          </div>
        )}
      </div>
    </div>
  );
}