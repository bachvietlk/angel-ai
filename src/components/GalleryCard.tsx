import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, User, Image, Video, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface GalleryCardProps {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  mediaUrl: string;
  mediaType: "image" | "video";
  likesCount: number;
  createdAt: string;
  creatorName: string | null;
  creatorAvatar: string | null;
  currentUserId?: string;
  onDelete?: () => void;
}

const GalleryCard = ({
  id,
  userId,
  title,
  description,
  mediaUrl,
  mediaType,
  likesCount: initialLikesCount,
  createdAt,
  creatorName,
  creatorAvatar,
  currentUserId,
  onDelete,
}: GalleryCardProps) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const isOwner = currentUserId === userId;

  useEffect(() => {
    // Check if current user has liked this creation
    const checkLikeStatus = async () => {
      if (!currentUserId) return;

      const { data } = await supabase
        .from("creation_likes")
        .select("id")
        .eq("creation_id", id)
        .eq("user_id", currentUserId)
        .single();

      setIsLiked(!!data);
    };

    checkLikeStatus();
  }, [id, currentUserId]);

  const handleLike = async () => {
    if (!currentUserId) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để thích sáng tạo này.",
        variant: "destructive",
      });
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from("creation_likes")
          .delete()
          .eq("creation_id", id)
          .eq("user_id", currentUserId);

        setIsLiked(false);
        setLikesCount((prev) => Math.max(0, prev - 1));
      } else {
        // Like
        await supabase.from("creation_likes").insert({
          creation_id: id,
          user_id: currentUserId,
        });

        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwner || isDeleting) return;

    if (!confirm("Bạn có chắc muốn xoá sáng tạo này?")) return;

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("shared_creations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Đã xoá",
        description: "Sáng tạo đã được xoá khỏi thư viện.",
      });

      onDelete?.();
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xoá. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Media */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <video
            src={mediaUrl}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        )}

        {/* Media type badge */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm flex items-center gap-1 text-xs">
          {mediaType === "image" ? (
            <Image className="w-3 h-3" />
          ) : (
            <Video className="w-3 h-3" />
          )}
        </div>

        {/* Like button */}
        <motion.button
          onClick={handleLike}
          disabled={isLiking}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>

        {/* Delete button for owner */}
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute bottom-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Creator */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold/50 to-gold-light/50 flex items-center justify-center overflow-hidden">
              {creatorAvatar ? (
                <img
                  src={creatorAvatar}
                  alt={creatorName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
            <span className="text-xs text-muted-foreground truncate max-w-[80px]">
              {creatorName || "Ẩn danh"}
            </span>
          </div>

          {/* Likes & Time */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className={`w-3 h-3 ${isLiked ? "text-red-500 fill-current" : ""}`} />
              {likesCount}
            </span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: vi })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
