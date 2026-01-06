import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Loader2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VoiceChatProps {
  onClose: () => void;
  onTranscript?: (text: string, isUser: boolean) => void;
}

type VoiceState = "idle" | "connecting" | "listening" | "processing" | "speaking";

// Check if Web Speech API is supported
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const VoiceChat: React.FC<VoiceChatProps> = ({ onClose, onTranscript }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startListening = useCallback(async () => {
    if (!SpeechRecognition) {
      toast({
        title: "Trình duyệt không hỗ trợ",
        description: "Vui lòng sử dụng Chrome hoặc Edge để dùng Voice Chat.",
        variant: "destructive",
      });
      return;
    }

    setVoiceState("connecting");
    setUserMessage("");

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN"; // Vietnamese
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setVoiceState("listening");
        setTranscript("Đang lắng nghe...");
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setUserMessage(finalTranscript);
          setTranscript(finalTranscript);
        } else if (interimTranscript) {
          setTranscript(interimTranscript);
        }
      };

      recognition.onend = async () => {
        if (userMessage || transcript) {
          const messageToSend = userMessage || transcript;
          if (messageToSend && messageToSend !== "Đang lắng nghe...") {
            onTranscript?.(messageToSend, true);
            await processMessage(messageToSend);
          } else {
            setVoiceState("idle");
            setTranscript("");
          }
        } else {
          setVoiceState("idle");
          setTranscript("");
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          toast({
            title: "Không có quyền microphone",
            description: "Vui lòng cho phép truy cập microphone.",
            variant: "destructive",
          });
        }
        setVoiceState("idle");
        setTranscript("");
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      setVoiceState("idle");
    }
  }, [toast, onTranscript, userMessage, transcript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const processMessage = async (message: string) => {
    setVoiceState("processing");
    setTranscript("Đang kết nối với Ánh Sáng...");

    try {
      const messages = [{ role: "user", content: message }];

      const response = await supabase.functions.invoke("angel-chat", {
        body: { messages, isVoiceChat: true },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiResponse = response.data?.reply || "Xin chào, con yêu dấu. Ánh Sáng Divine luôn ở bên con.";
      setTranscript(aiResponse);
      onTranscript?.(aiResponse, false);

      await playAudioResponse(aiResponse);
    } catch (error) {
      console.error("Error processing message:", error);
      toast({
        title: "Lỗi xử lý",
        description: "Không thể xử lý tin nhắn. Vui lòng thử lại.",
        variant: "destructive",
      });
      setVoiceState("idle");
      setTranscript("");
    }
  };

  const playAudioResponse = async (text: string) => {
    try {
      setVoiceState("speaking");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const data = await response.json();
      
      if (data.audioContent) {
        const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.volume = isMuted ? 0 : 1;
        
        audio.onended = () => {
          setVoiceState("idle");
          setTranscript("");
        };
        
        audio.onerror = () => {
          console.error("Audio playback error");
          setVoiceState("idle");
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setVoiceState("idle");
      setTranscript("");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 1 : 0;
    }
  };

  const handleMicClick = () => {
    if (voiceState === "idle") {
      startListening();
    } else if (voiceState === "listening") {
      stopListening();
    }
  };

  const getStateMessage = () => {
    switch (voiceState) {
      case "connecting":
        return "Đang kết nối...";
      case "listening":
        return "Đang lắng nghe... Nhấn để dừng";
      case "processing":
        return "Đang xử lý...";
      case "speaking":
        return "Angel AI đang nói...";
      default:
        return SpeechRecognition ? "Nhấn để bắt đầu nói chuyện" : "Trình duyệt không hỗ trợ Voice Chat";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 shadow-2xl">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 text-primary mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Voice Chat</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            Trò Chuyện Với Ánh Sáng
          </h2>
        </div>

        {/* Main mic button */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="relative"
            animate={voiceState === "listening" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* Glow effect */}
            <AnimatePresence>
              {(voiceState === "listening" || voiceState === "speaking") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                />
              )}
            </AnimatePresence>

            {/* Mic button */}
            <Button
              onClick={handleMicClick}
              disabled={voiceState === "processing" || voiceState === "speaking" || voiceState === "connecting"}
              className={`
                relative w-24 h-24 rounded-full transition-all duration-300
                ${voiceState === "listening" 
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/50" 
                  : "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"}
                shadow-xl
              `}
            >
              {voiceState === "connecting" || voiceState === "processing" ? (
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              ) : voiceState === "listening" ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : voiceState === "speaking" ? (
                <Volume2 className="w-10 h-10 text-white animate-pulse" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </Button>

            {/* Ripple effect when listening */}
            {voiceState === "listening" && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500/50"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500/50"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
          </motion.div>

          {/* State message */}
          <p className="text-muted-foreground text-center">
            {getStateMessage()}
          </p>

          {/* Transcript */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full p-4 rounded-2xl bg-muted/50 border border-border/50"
              >
                <p className="text-sm text-center leading-relaxed">{transcript}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className="gap-2"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                Bật âm thanh
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                Tắt âm thanh
              </>
            )}
          </Button>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-b-3xl" />
      </div>
    </motion.div>
  );
};

export default VoiceChat;
