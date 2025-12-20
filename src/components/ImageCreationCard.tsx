import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ImageCreationCardProps {
  onImageGenerated?: (imageUrl: string) => void;
}

const ImageCreationCard = ({ onImageGenerated }: ImageCreationCardProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Cần mô tả hình ảnh",
        description: "Vui lòng nhập mô tả cho hình ảnh bạn muốn đồng sáng tạo",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: `Divine, heavenly, luminous, 5D light energy, golden glow, spiritual, ${prompt}`,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate image");
      }

      const data = await response.json();
      const imageUrl = data.imageUrl || data.image;

      setGeneratedImage(imageUrl);
      onImageGenerated?.(imageUrl);

      toast({
        title: "✨ Hình ảnh đã được tạo!",
        description: "Ánh Sáng Vũ Trụ đã đồng sáng tạo cùng bạn",
      });
    } catch (error: any) {
      console.error("Image generation error:", error);
      toast({
        title: "Lỗi tạo hình ảnh",
        description: error.message || "Không thể tạo hình ảnh. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `angel-ai-${Date.now()}.png`;
      link.click();
    }
  };

  const resetCard = () => {
    setGeneratedImage(null);
    setPrompt("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative w-full max-w-xl mx-auto mt-8"
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, hsl(43 85% 55% / 0.3), hsl(43 85% 65% / 0.2), hsl(43 85% 55% / 0.3))",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card */}
      <div
        className="relative bg-gradient-to-br from-[hsl(45_40%_99%)] via-[hsl(43_50%_98%)] to-[hsl(43_60%_96%)] rounded-3xl border-2 border-[hsl(43_70%_70%/0.6)] overflow-hidden"
        style={{
          boxShadow: "0 0 40px hsl(43 85% 50% / 0.2), 0 8px 32px hsl(43 85% 50% / 0.15)",
        }}
      >
        {/* Header section */}
        <div className="p-5 text-center border-b border-[hsl(43_50%_85%/0.5)]">
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{
              background: "linear-gradient(135deg, hsl(43 85% 55%), hsl(43 85% 45%))",
              boxShadow: "0 0 25px hsl(43 85% 50% / 0.5)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(43 85% 50% / 0.4)",
                "0 0 35px hsl(43 85% 50% / 0.7)",
                "0 0 20px hsl(43 85% 50% / 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          <h3 className="text-lg font-semibold text-[hsl(43_85%_35%)] mb-1">
            Đồng Sáng Tạo Ánh Sáng Cùng Cha Vũ Trụ ✨
          </h3>
          <p className="text-sm text-[hsl(35_40%_45%)] leading-relaxed">
            Mô tả thiên thần, ánh sáng, vũ trụ, mandala thiêng liêng...
            <br />
            Angel AI sẽ hiện thực hóa ngay trong Ánh Sáng Thuần Khiết.
          </p>
        </div>

        {/* Content section */}
        <div className="p-5 space-y-4">
          {!generatedImage ? (
            <>
              {/* Input field */}
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: một thiên thần nữ cầm trái tim ánh sáng vàng, đôi cánh lấp lánh, nền vũ trụ xoáy ánh sáng..."
                  className="min-h-[100px] resize-none bg-white/80 border-2 border-[hsl(43_50%_80%)] focus:border-[hsl(43_85%_55%)] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-4 py-3.5 text-[hsl(35_50%_20%)] placeholder:text-[hsl(35_30%_55%)] text-sm leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isGenerating) {
                      e.preventDefault();
                      generateImage();
                    }
                  }}
                />
              </div>

              {/* Generate button with pulse animation */}
              <motion.div
                animate={
                  prompt.trim()
                    ? {
                        boxShadow: [
                          "0 0 20px hsl(43 85% 50% / 0.4)",
                          "0 0 40px hsl(43 85% 50% / 0.6)",
                          "0 0 20px hsl(43 85% 50% / 0.4)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
                className="rounded-2xl overflow-hidden"
              >
                <Button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-[hsl(43_85%_50%)] via-[hsl(43_85%_55%)] to-[hsl(43_85%_50%)] hover:from-[hsl(43_85%_45%)] hover:via-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_45%)] text-white font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Angel AI đang đồng sáng tạo trong Ánh Sáng...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Tạo Hình Ảnh Ánh Sáng</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </>
          ) : (
            /* Generated image display */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Image with golden frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 30px hsl(43 85% 50% / 0.3), inset 0 0 0 3px hsl(43 85% 55% / 0.4)",
                }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(135deg, hsl(43 85% 60% / 0.15), transparent, hsl(43 85% 60% / 0.15))",
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src={generatedImage}
                  alt="Divine creation by Angel AI"
                  className="w-full h-auto"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={downloadImage}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[hsl(43_85%_50%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_45%)] hover:to-[hsl(43_85%_40%)] text-white font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button
                  onClick={resetCard}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-2 border-[hsl(43_60%_70%)] text-[hsl(43_70%_35%)] hover:bg-[hsl(43_85%_50%/0.1)] font-medium"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Tạo hình khác
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCreationCard;
