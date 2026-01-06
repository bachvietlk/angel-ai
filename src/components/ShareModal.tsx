import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Loader2, Sparkles, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType: "image" | "video";
  onSuccess?: () => void;
}

const ShareModal = ({ isOpen, onClose, mediaUrl, mediaType, onSuccess }: ShareModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    if (!title.trim()) {
      toast({
        title: "Vui lòng nhập tiêu đề",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Vui lòng đăng nhập",
          description: "Bạn cần đăng nhập để chia sẻ sáng tạo.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("shared_creations").insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim() || null,
        media_url: mediaUrl,
        media_type: mediaType,
      });

      if (error) throw error;

      toast({
        title: "✨ Chia sẻ thành công!",
        description: "Sáng tạo của bạn đã được thêm vào Thư Viện Ánh Sáng.",
      });

      onSuccess?.();
      onClose();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Share error:", error);
      toast({
        title: "Lỗi chia sẻ",
        description: "Không thể chia sẻ. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-2xl border border-gold/30 shadow-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 60px hsl(43 85% 50% / 0.15)"
            }}
          >
            {/* Header */}
            <div className="relative p-4 border-b border-border/50 bg-gradient-to-r from-gold/10 to-transparent">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-gold" />
                <h2 className="text-lg font-semibold">Chia sẻ vào Thư Viện Ánh Sáng</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Media Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                {mediaType === "image" ? (
                  <img
                    src={mediaUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
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
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm flex items-center gap-1 text-xs">
                  {mediaType === "image" ? (
                    <>
                      <Image className="w-3 h-3" />
                      Hình ảnh
                    </>
                  ) : (
                    <>
                      <Video className="w-3 h-3" />
                      Video
                    </>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Tiêu đề *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Thiên Thần Ánh Sáng của tôi..."
                  maxLength={100}
                  className="border-gold/30 focus:border-gold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Mô tả (tuỳ chọn)
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Chia sẻ cảm hứng đằng sau sáng tạo này..."
                  maxLength={500}
                  rows={3}
                  className="border-gold/30 focus:border-gold resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/50 flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Huỷ
              </Button>
              <Button
                onClick={handleShare}
                disabled={isSharing || !title.trim()}
                className="flex-1 bg-gradient-to-r from-gold to-gold-light text-background gap-2"
              >
                {isSharing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang chia sẻ...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Chia sẻ
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
