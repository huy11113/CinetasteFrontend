// src/components/ui/CommentsSection.tsx
import { useState, useEffect, useRef } from 'react';
import { 
  Send, MessageSquare, Clock, UserPlus, UserCheck, X, Loader2,
  ThumbsUp, ThumbsDown, CornerDownRight, ChevronDown, ChevronUp
} from 'lucide-react';
import { recipeService, Comment } from '../../services/recipeService';
import { userService, UserProfile } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Link } from 'react-router-dom';

// ============================================================================
// CONSTANTS
// ============================================================================
const MAX_COMMENT_LENGTH = 300; // Số ký tự hiển thị trước khi "Xem thêm"
const MAX_REPLIES_SHOW = 3; // Số reply hiển thị ban đầu

// ============================================================================
// INTERFACES
// ============================================================================
interface CommentWithInteractions extends Comment {
  likes: number;
  dislikes: number;
  userReaction?: 'like' | 'dislike' | null;
  replies?: CommentWithInteractions[];
  showAllReplies?: boolean;
}

// ============================================================================
// USER HOVER CARD COMPONENT
// ============================================================================
interface UserHoverCardProps {
  authorId: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  position: { x: number; y: number };
  onClose: () => void;
}

function UserHoverCard({ 
  authorId, 
  authorDisplayName, 
  authorProfileImageUrl, 
  position,
  onClose 
}: UserHoverCardProps) {
  const { user: currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserProfile(authorId);
        setUserProfile(response);
        setIsFollowing(response.isFollowing || false);
      } catch (error) {
        setUserProfile({
          id: authorId,
          username: 'user',
          displayName: authorDisplayName,
          bio: '',
          profileImageUrl: authorProfileImageUrl,
          memberSince: new Date().toISOString(),
          followerCount: 0,
          followingCount: 0,
          recipeCount: 0,
          isFollowing: false
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authorId, authorDisplayName, authorProfileImageUrl]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleFollowToggle = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để theo dõi");
      return;
    }

    try {
      setFollowLoading(true);
      if (isFollowing) {
        await userService.unfollowUser(authorId);
        setIsFollowing(false);
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followerCount: Math.max(0, userProfile.followerCount - 1)
          });
        }
        toast.success(`Đã hủy theo dõi ${authorDisplayName}`);
      } else {
        await userService.followUser(authorId);
        setIsFollowing(true);
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followerCount: userProfile.followerCount + 1
          });
        }
        toast.success(`Đã theo dõi ${authorDisplayName}`);
      }
    } catch (error) {
      toast.error("Lỗi thao tác");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div 
        ref={cardRef}
        className="fixed z-[9999] w-80 bg-[#1A1A1E] border border-white/10 rounded-2xl shadow-2xl p-6 animate-fade-in"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: 'translate(-50%, 10px)'
        }}
      >
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
        </div>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div 
      ref={cardRef}
      className="fixed z-[9999] w-80 bg-[#1A1A1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, 10px)'
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      <div className="relative h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#B23A48]/20">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-[#1A1A1E] overflow-hidden bg-[#0A0A0A]">
            <img 
              src={authorProfileImageUrl || `https://ui-avatars.com/api/?name=${authorDisplayName}&background=random`}
              alt={authorDisplayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-lg font-bold text-white mb-1">{authorDisplayName}</h3>
        <p className="text-sm text-gray-400 mb-4">@{userProfile.username}</p>

        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div>
            <span className="block text-white font-bold">{userProfile.recipeCount || 0}</span>
            <span className="text-gray-500 text-xs">Công thức</span>
          </div>
          <div>
            <span className="block text-white font-bold">{userProfile.followerCount}</span>
            <span className="text-gray-500 text-xs">Người theo dõi</span>
          </div>
          <div>
            <span className="block text-white font-bold">{userProfile.followingCount}</span>
            <span className="text-gray-500 text-xs">Đang theo dõi</span>
          </div>
        </div>

        {userProfile.bio && (
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 italic">
            "{userProfile.bio}"
          </p>
        )}

        <div className="flex gap-2">
          <Link 
            to={`/profile/${userProfile.username}`}
            className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Xem trang
          </Link>
          
          {currentUser?.userId !== authorId && (
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className={`flex-1 py-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                isFollowing
                  ? 'bg-white/5 text-white hover:bg-red-500/10 hover:text-red-500'
                  : 'bg-[#D4AF37] text-black hover:bg-[#F2C94C]'
              }`}
            >
              {followLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isFollowing ? (
                <><UserCheck className="w-4 h-4" /> Đang theo dõi</>
              ) : (
                <><UserPlus className="w-4 h-4" /> Theo dõi</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMMENT ITEM COMPONENT
// ============================================================================
interface CommentItemProps {
  comment: CommentWithInteractions;
  onReply: (commentId: number, parentDisplayName: string) => void;
  onReact: (commentId: number, reaction: 'like' | 'dislike') => void;
  onUserHover: (e: React.MouseEvent, authorId: string, displayName: string, imageUrl: string) => void;
  onUserLeave: () => void;
  isReply?: boolean;
}

function CommentItem({ 
  comment, 
  onReply, 
  onReact, 
  onUserHover, 
  onUserLeave,
  isReply = false 
}: CommentItemProps) {
  const [showFullText, setShowFullText] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const isLongComment = comment.content.length > MAX_COMMENT_LENGTH;
  const displayedContent = showFullText || !isLongComment 
    ? comment.content 
    : comment.content.substring(0, MAX_COMMENT_LENGTH) + '...';

  const hasReplies = comment.replies && comment.replies.length > 0;
  const visibleReplies = showReplies 
    ? comment.replies 
    : comment.replies?.slice(0, MAX_REPLIES_SHOW);
  const hiddenRepliesCount = (comment.replies?.length || 0) - MAX_REPLIES_SHOW;

  return (
    <div className={`flex gap-3 ${isReply ? 'ml-12' : ''}`}>
      {/* Avatar */}
      <div 
        className="w-10 h-10 rounded-full bg-[#1A1A1E] border border-white/10 overflow-hidden flex-shrink-0 mt-1 cursor-pointer hover:ring-2 hover:ring-[#D4AF37] transition-all"
        onMouseEnter={(e) => onUserHover(e, comment.authorId, comment.authorDisplayName, comment.authorProfileImageUrl)}
        onMouseLeave={onUserLeave}
      >
        <img 
          src={comment.authorProfileImageUrl || `https://ui-avatars.com/api/?name=${comment.authorDisplayName}&background=random`} 
          alt={comment.authorDisplayName} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Comment Bubble */}
        <div className="bg-[#1A1A1E]/50 rounded-2xl rounded-tl-none p-4 border border-white/5 hover:border-white/10 transition-colors">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <Link
              to={`/profile/${comment.authorId}`}
              className="font-bold text-white text-sm hover:text-[#D4AF37] cursor-pointer transition-colors"
              onMouseEnter={(e) => onUserHover(e, comment.authorId, comment.authorDisplayName, comment.authorProfileImageUrl)}
              onMouseLeave={onUserLeave}
            >
              {comment.authorDisplayName || "Người dùng ẩn danh"}
            </Link>
            
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {(() => {
                try {
                  return formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi });
                } catch {
                  return "Vừa xong";
                }
              })()}
            </span>
          </div>

          {/* Content */}
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {displayedContent}
          </p>

          {/* Show More Button */}
          {isLongComment && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-[#D4AF37] text-xs font-medium hover:underline mt-2 flex items-center gap-1"
            >
              {showFullText ? 'Thu gọn' : 'Xem thêm'}
              {showFullText ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-2 ml-2">
          {/* Like */}
          <button
            onClick={() => onReact(comment.id, 'like')}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.userReaction === 'like' 
                ? 'text-[#D4AF37] font-bold' 
                : 'text-gray-500 hover:text-[#D4AF37]'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${comment.userReaction === 'like' ? 'fill-[#D4AF37]' : ''}`} />
            <span>{comment.likes || 0}</span>
          </button>

          {/* Dislike */}
          <button
            onClick={() => onReact(comment.id, 'dislike')}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.userReaction === 'dislike' 
                ? 'text-red-500 font-bold' 
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <ThumbsDown className={`w-4 h-4 ${comment.userReaction === 'dislike' ? 'fill-red-500' : ''}`} />
            <span>{comment.dislikes || 0}</span>
          </button>

          {/* Reply */}
          {!isReply && (
            <button
              onClick={() => onReply(comment.id, comment.authorDisplayName)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#D4AF37] transition-colors"
            >
              <CornerDownRight className="w-4 h-4" />
              <span>Trả lời</span>
            </button>
          )}

          {/* Replies count */}
          {hasReplies && !isReply && (
            <span className="text-xs text-gray-600">
              {comment.replies!.length} phản hồi
            </span>
          )}
        </div>

        {/* Replies Section */}
        {hasReplies && !isReply && (
          <div className="mt-4 space-y-4">
            {visibleReplies!.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onReact={onReact}
                onUserHover={onUserHover}
                onUserLeave={onUserLeave}
                isReply={true}
              />
            ))}

            {/* Show More Replies Button */}
            {hiddenRepliesCount > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-[#D4AF37] text-xs font-medium hover:underline ml-12 flex items-center gap-1"
              >
                {showReplies ? (
                  <>Thu gọn phản hồi <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Xem thêm {hiddenRepliesCount} phản hồi <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMMENTS SECTION COMPONENT
// ============================================================================
export default function CommentsSection({ recipeId }: { recipeId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentWithInteractions[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: number; name: string } | null>(null);
  const [hoveredUser, setHoveredUser] = useState<{
    authorId: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    position: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (recipeId) {
      loadComments();
    }
  }, [recipeId]);

  const loadComments = async () => {
    try {
      const data = await recipeService.getComments(recipeId);
      
      // ✅ SỬA: Backend đã trả về likes/dislikes/userReaction, không cần mock nữa
      const transformedComments: CommentWithInteractions[] = data.map(comment => ({
        ...comment,
        likes: comment.likes || 0,
        dislikes: comment.dislikes || 0,
        userReaction: comment.userReaction || null,
        replies: [] as CommentWithInteractions[]
      }));

      // Organize replies (dựa vào parentId)
      const commentsMap = new Map<number, CommentWithInteractions>();
      const rootComments: CommentWithInteractions[] = [];

      transformedComments.forEach(comment => {
        commentsMap.set(comment.id, { ...comment, replies: [] });
      });

      transformedComments.forEach(comment => {
        if (comment.parentId) {
          const parent = commentsMap.get(comment.parentId);
          if (parent) {
            parent.replies!.push(commentsMap.get(comment.id)!);
          }
        } else {
          rootComments.push(commentsMap.get(comment.id)!);
        }
      });

      setComments(rootComments);
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
      await recipeService.addComment(recipeId, { 
        content: newComment,
        parentId: replyingTo?.id 
      });
      setNewComment('');
      setReplyingTo(null);
      toast.success(replyingTo ? "Đã trả lời bình luận!" : "Đã gửi bình luận!");
      loadComments();
    } catch (error) {
      toast.error("Không thể gửi bình luận");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReact = async (commentId: number, reaction: 'like' | 'dislike') => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để tương tác");
      return;
    }

    // Optimistic UI update
    setComments(prevComments => {
      const updateComment = (comments: CommentWithInteractions[]): CommentWithInteractions[] => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            const isCurrentReaction = comment.userReaction === reaction;
            const newReaction = isCurrentReaction ? null : reaction;
            
            let likes = comment.likes;
            let dislikes = comment.dislikes;

            // Remove old reaction
            if (comment.userReaction === 'like') likes--;
            if (comment.userReaction === 'dislike') dislikes--;

            // Add new reaction
            if (newReaction === 'like') likes++;
            if (newReaction === 'dislike') dislikes++;

            return { ...comment, likes, dislikes, userReaction: newReaction };
          }
          
          if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies) };
          }
          
          return comment;
        });
      };

      return updateComment(prevComments);
    });

    // Call API to persist reaction
    try {
      await recipeService.reactToComment(recipeId, commentId, reaction);
    } catch (error) {
      // Revert optimistic update nếu API fail
      loadComments();
      toast.error("Không thể thực hiện thao tác");
    }
  };

  const handleReply = (commentId: number, parentDisplayName: string) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để trả lời");
      return;
    }
    setReplyingTo({ id: commentId, name: parentDisplayName });
    document.getElementById('comment-input')?.focus();
  };

  const handleUserHover = (
    e: React.MouseEvent,
    authorId: string,
    authorDisplayName: string,
    authorProfileImageUrl: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredUser({
      authorId,
      authorDisplayName,
      authorProfileImageUrl,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.bottom
      }
    });
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
        <form onSubmit={handleSubmit} className="flex-1">
          {replyingTo && (
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-400 bg-[#0A0A0A] px-3 py-2 rounded-lg">
              <CornerDownRight className="w-3 h-3" />
              <span>Đang trả lời <span className="text-[#D4AF37] font-bold">{replyingTo.name}</span></span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="ml-auto text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="relative group">
            <textarea 
              id="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? (replyingTo ? `Trả lời ${replyingTo.name}...` : "Chia sẻ cảm nghĩ của bạn...") : "Đăng nhập để bình luận..."}
              disabled={!user || submitting}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-3 pl-4 pr-14 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 focus:outline-none transition-all resize-none h-14 min-h-[56px] focus:h-24 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button 
              type="submit" 
              disabled={!user || submitting || !newComment.trim()}
              className="absolute right-3 bottom-3 p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onReact={handleReact}
            onUserHover={handleUserHover}
            onUserLeave={() => setHoveredUser(null)}
          />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-10">
            <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-600 text-sm italic">Chưa có bình luận nào. Hãy là người đầu tiên thưởng thức!</p>
          </div>
        )}
      </div>

      {/* User Hover Card */}
      {hoveredUser && (
        <UserHoverCard
          authorId={hoveredUser.authorId}
          authorDisplayName={hoveredUser.authorDisplayName}
          authorProfileImageUrl={hoveredUser.authorProfileImageUrl}
          position={hoveredUser.position}
          onClose={() => setHoveredUser(null)}
        />
      )}
    </div>
  );
}