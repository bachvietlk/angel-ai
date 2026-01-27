import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Shield, Heart, Scale, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LawOfLightModalProps {
  isOpen: boolean;
  onAccept: () => Promise<void>;
  onViewDetails: () => void;
}

const laws = [
  { icon: Sun, text: "Ánh sáng thu hút ánh sáng", color: "hsl(43 85% 50%)" },
  { icon: Shield, text: "Tần số thấp tự thanh lọc", color: "hsl(200 70% 50%)" },
  { icon: Heart, text: "Tình yêu là quy luật", color: "hsl(350 80% 60%)" },
  { icon: Scale, text: "Phục vụ điều cao hơn", color: "hsl(270 70% 55%)" },
  { icon: Sparkles, text: "Mỗi tương tác là chữa lành", color: "hsl(43 85% 55%)" },
];

// Sparkle particles around the icon
const SparkleParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    delay: i * 0.1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(43 85% 65%), hsl(43 85% 45%))",
            boxShadow: "0 0 8px hsl(43 85% 50% / 0.8)",
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [0, Math.cos((p.angle * Math.PI) / 180) * 50, 0],
            y: [0, Math.sin((p.angle * Math.PI) / 180) * 50, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const LawOfLightModal = ({ isOpen, onAccept, onViewDetails }: LawOfLightModalProps) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await onAccept();
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md border-0 bg-gradient-to-b from-[hsl(45_50%_98%)] via-[hsl(45_40%_96%)] to-[hsl(43_45%_94%)] shadow-2xl overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Hide default close button */}
        <style>{`.absolute.right-4.top-4 { display: none !important; }`}</style>
        
        {/* Background glow effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-to-b from-[hsl(43_85%_50%/0.15)] to-transparent" />
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[hsl(43_85%_50%/0.08)] blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <DialogHeader className="relative pt-6 pb-2">
          {/* Icon with sparkles */}
          <div className="relative w-20 h-20 mx-auto mb-4">
            <SparkleParticles />
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(43_85%_60%)] via-[hsl(43_85%_50%)] to-[hsl(43_85%_40%)] flex items-center justify-center shadow-xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(43 85% 50% / 0.4)",
                  "0 0 40px hsl(43 85% 50% / 0.6)",
                  "0 0 20px hsl(43 85% 50% / 0.4)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>

          <DialogTitle className="text-center">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-[hsl(43_85%_45%)] via-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              style={{ backgroundSize: "200%" }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              LUẬT ÁNH SÁNG
            </motion.span>
          </DialogTitle>
          
          <p className="text-center text-sm text-[hsl(35_40%_40%)] mt-2 px-4">
            FUN Ecosystem chỉ dành cho những linh hồn có ánh sáng, hoặc đang hướng về ánh sáng.
          </p>
        </DialogHeader>

        {/* Laws list */}
        <div className="space-y-2.5 py-4 px-2 relative">
          {laws.map((law, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-[hsl(43_40%_90%)] backdrop-blur-sm"
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${law.color}, ${law.color.replace('50%', '40%')})`,
                  boxShadow: `0 2px 10px ${law.color.replace(')', ' / 0.3)')}`,
                }}
              >
                <law.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-[hsl(35_50%_25%)]">{law.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2 pb-4 px-2 relative">
          <Button
            variant="outline"
            onClick={onViewDetails}
            className="flex-1 border-[hsl(43_40%_85%)] text-[hsl(35_50%_35%)] hover:bg-[hsl(43_50%_95%)] hover:text-[hsl(43_85%_40%)]"
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={handleAccept}
            disabled={isAccepting}
            className="flex-1 bg-gradient-to-r from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_40%)] text-white shadow-lg relative overflow-hidden"
          >
            {isAccepting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Con đồng ý</span>
                <Sparkles className="w-4 h-4 ml-1" />
              </>
            )}
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LawOfLightModal;
