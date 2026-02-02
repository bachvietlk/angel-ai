import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Heart, Users, ArrowRight, Sparkles, Star, Crown, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const priorityCards = [
  {
    icon: Globe,
    title: "Tuyên Ngôn Về Nguồn Gốc",
    subtitle: "Declaration of Origin",
    description:
      "FUN là nền văn minh Ánh Sáng sống động — Chuyển hóa từ cạnh tranh sang hợp tác, từ khan hiếm sang đầy đủ.",
    gradient: "from-gold via-sky-light to-sky-400",
    bgGradient: "from-gold/10 via-sky-light/5 to-transparent",
    delay: 0,
  },
  {
    icon: Heart,
    title: "5 Nguyên Lý Thiêng Liêng",
    subtitle: "Sacred Principles",
    description:
      "Tình yêu thuần khiết là mã nguồn • Xây giá trị không xây kiểm soát • Công nghệ phụng sự tỉnh thức.",
    gradient: "from-gold via-amber-400 to-yellow-500",
    bgGradient: "from-gold/10 via-amber-400/5 to-transparent",
    delay: 0.1,
  },
  {
    icon: Crown,
    title: "99% Gift Model",
    subtitle: "Sacred Mission",
    description:
      "Learn & Earn • Play & Earn • Invest & Earn • Give & Gain • Share & Have • Build & Bounty.",
    gradient: "from-gold via-amber-400 to-orange-400",
    bgGradient: "from-gold/10 via-orange-400/5 to-transparent",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Cam Kết Cộng Đồng",
    subtitle: "Community Vow",
    description:
      "Xây dựng bằng chính trực và tình yêu • Cùng nhau nâng nhau lên trong ánh sáng • Phụng sự nhân loại.",
    gradient: "from-pink-400 via-gold to-amber-400",
    bgGradient: "from-pink-400/10 via-gold/5 to-transparent",
    delay: 0.3,
  },
];

const LightConstitutionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-divine-white/50 via-background to-gold/5 pointer-events-none"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Sacred geometry background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-gold rounded-full animate-spin-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-gold rotate-45 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold-dark text-sm font-medium">Master Charter</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-4">
            HIẾN PHÁP GỐC
          </h2>
          <p className="text-xl md:text-2xl text-gold-dark/80 italic mb-2">
            FUN ECOSYSTEM
          </p>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-4">
            Nền Kinh Tế Ánh Sáng 5D của Trái Đất Mới
          </p>
          
          {/* New Tagline */}
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-amber-400/20 border border-gold/30">
            <span className="text-gold-dark font-medium text-sm md:text-base">Free to Join</span>
            <span className="text-gold">•</span>
            <span className="text-gold-dark font-medium text-sm md:text-base">Free to Use</span>
            <span className="text-gold">•</span>
            <span className="text-gold-dark font-medium text-sm md:text-base">Earn Together</span>
            <span className="text-gold">•</span>
            <span className="text-gold-dark font-medium text-sm md:text-base">With Pure Love</span>
          </div>
        </motion.div>

        {/* Priority Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {priorityCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: card.delay }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative p-6 md:p-8 rounded-3xl bg-gradient-to-br ${card.bgGradient} border border-gold/20 hover:border-gold/40 shadow-lg hover:shadow-gold/20 transition-all group overflow-hidden`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl" />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-7 h-7 text-background" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-gold-dark mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-gold/80 italic mb-3">{card.subtitle}</p>
                <p className="text-foreground/80 leading-relaxed">{card.description}</p>

                {/* Decorative star */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-5 h-5 text-gold/40" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/light-constitution">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-gold/30 group"
            >
              Xem Hiến Pháp Đầy Đủ
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="mt-4 text-sm text-foreground/60">
            Khám phá 8 chương và Divine Seal (Khẳng Định Xác Quyết)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LightConstitutionSection;
