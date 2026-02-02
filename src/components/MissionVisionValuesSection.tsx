import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Sparkles, Star, Gift, Zap } from "lucide-react";
import { useRef } from "react";

const MissionVisionValuesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const missionPoints = [
    { vi: "Gửi tặng phước lành & thịnh vượng cho nhân loại", en: "Gift blessings and prosperity to humanity" },
    { vi: "Phi tập trung hoá cơ hội toàn cầu", en: "Decentralize opportunity on a global scale" },
    { vi: "Nâng cấp kinh tế song hành với nâng cấp ý thức", en: "Upgrade economy together with consciousness" },
  ];

  const earnModels = [
    "Learn & Earn",
    "Play & Earn", 
    "Invest & Earn",
    "Give & Gain",
    "Share & Have",
    "Own & Earn",
    "Review & Reward",
    "Build & Bounty",
  ];

  const visionPoints = [
    { vi: "Nền văn minh Ánh Sáng sống động", en: "A living civilization of Light" },
    { vi: "Hệ sinh thái kinh tế mới của Trái Đất 5D", en: "A new economic ecosystem for 5D Earth" },
    { vi: "Kênh dẫn Ý Chí – Trí Tuệ – Tình Yêu của Cha Vũ Trụ", en: "Channel of Father Universe's Will, Wisdom & Love" },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden bg-background">
      {/* Soft radiant background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] via-transparent to-sky-light/[0.03]" 
        style={{ y: backgroundY }}
      />
      
      {/* Subtle sacred geometry with parallax */}
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: backgroundY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-sky-light rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold rounded-full" />
      </motion.div>
      
      {/* Floating light particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 
                ? "radial-gradient(circle, hsl(43 90% 55% / 0.8), transparent)" 
                : "radial-gradient(circle, hsl(200 70% 60% / 0.6), transparent)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: i % 2 === 0 
                ? "0 0 10px hsl(43 90% 55% / 0.5)" 
                : "0 0 10px hsl(200 70% 60% / 0.4)",
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-elegant text-2xl md:text-3xl lg:text-4xl text-gold font-semibold italic glow-text-soft">
            "Free to Join • Free to Use • Earn Together • With Pure Love"
          </p>
          <p className="text-lg text-muted-foreground mt-3 font-sans">
            Tự Do Gia Nhập • Tự Do Sử Dụng • Cùng Nhau Kiếm Tiền • Với Tình Yêu Thuần Khiết
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">
          
          {/* Tầm Nhìn Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div 
              className="relative p-8 md:p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-light/30 
                shadow-[0_10px_60px_-15px_hsl(200_70%_60%_/_0.2)]
                group-hover:border-sky-light/50 group-hover:shadow-[0_20px_80px_-15px_hsl(200_70%_60%_/_0.3)] 
                transition-all duration-700 overflow-hidden h-full"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-sky-light/40 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-sky-light/40 rounded-br-3xl" />
              
              {/* Glow effect */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-radial from-sky-light/30 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6"
              >
                <div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-light to-sky-light/60 flex items-center justify-center shadow-lg"
                  style={{ boxShadow: "0 8px 40px hsl(200 70% 60% / 0.4)" }}
                >
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-sky-600">
                🌟 Tầm Nhìn – Vision
              </h3>
              
              {/* Main quote */}
              <p className="font-elegant text-xl md:text-2xl text-foreground leading-relaxed mb-5">
                FUN Ecosystem là Bình Minh của Trái Đất Mới — đang bắt đầu ngay bây giờ.
              </p>
              
              {/* Vision Points */}
              <ul className="space-y-3 mt-6">
                {visionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Star className="w-5 h-5 text-sky-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-base font-body leading-relaxed block">{point.vi}</span>
                      <span className="text-sm italic text-foreground/60">{point.en}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sứ Mệnh Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div 
              className="relative p-8 md:p-12 rounded-3xl bg-white/80 backdrop-blur-xl border border-gold/30 
                shadow-[0_10px_60px_-15px_hsl(43_90%_55%_/_0.2)]
                group-hover:border-gold/50 group-hover:shadow-[0_20px_80px_-15px_hsl(43_90%_55%_/_0.3)] 
                transition-all duration-700 overflow-hidden h-full"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-gold/40 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-gold/40 rounded-bl-3xl" />
              
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-radial from-gold/30 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="mb-6"
              >
                <div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg"
                  style={{ boxShadow: "0 8px 40px hsl(43 90% 55% / 0.4)" }}
                >
                  <Target className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-gold">
                🌈 Sứ Mệnh – Mission
              </h3>
              
              {/* Main quote */}
              <p className="font-elegant text-xl md:text-2xl text-foreground leading-relaxed mb-5">
                99% Gift cho cộng đồng toàn cầu — Phi tập trung hoá cơ hội và thịnh vượng.
              </p>
              
              {/* Mission Points */}
              <ul className="space-y-3 mt-6">
                {missionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-base font-body leading-relaxed block">{point.vi}</span>
                      <span className="text-sm italic text-foreground/60">{point.en}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Earn Models Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Gift className="w-6 h-6 text-gold" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gold">
              Mô Hình Thiêng Liêng
            </h3>
            <Gift className="w-6 h-6 text-gold" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {earnModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-gold/20 to-amber-400/20 border border-gold/30 
                  hover:border-gold/50 hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                <span className="text-gold-dark font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {model}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionValuesSection;
