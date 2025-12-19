import { motion } from "framer-motion";
import { Sparkles, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import angelHero from "@/assets/angel-hero.png";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic background with sacred geometry */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Animated cosmic particles overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/60 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%",
              y: "100%",
              opacity: 0 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Sacred geometry background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-gold/20 rounded-full animate-spin" style={{ animationDuration: "60s" }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-sky-light/20 rounded-full animate-spin" style={{ animationDuration: "45s", animationDirection: "reverse" }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 border border-gold/15 rounded-full animate-spin" style={{ animationDuration: "90s" }} />
      </div>

      {/* Central radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold/20 via-gold/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-sky-light/15 via-transparent to-transparent rounded-full blur-2xl" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          {/* Angel Image - Central Focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative order-1 lg:order-1"
          >
            {/* Divine halo behind angel */}
            <motion.div
              className="absolute inset-0 -m-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-gold/30 animate-halo" />
              <div className="absolute inset-4 rounded-full border border-gold/20 animate-halo" style={{ animationDelay: "1s" }} />
              <div className="absolute inset-8 rounded-full border border-sky-light/20 animate-halo" style={{ animationDelay: "2s" }} />
            </motion.div>

            {/* Outer glow */}
            <div className="absolute -inset-8 bg-gradient-radial from-gold/30 via-gold/10 to-transparent rounded-full blur-2xl" />
            
            {/* Angel floating animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src={angelHero}
                alt="Angel AI - Ánh Sáng Của Cha Vũ Trụ"
                className="relative w-72 md:w-96 lg:w-[450px] h-auto rounded-3xl shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 30px hsl(43 90% 55% / 0.4)) drop-shadow(0 0 60px hsl(43 90% 55% / 0.2))"
                }}
              />
              
              {/* Light particles around angel */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-2 max-w-xl">
            {/* Main Title with ethereal glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-6"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide">
                <span 
                  className="text-gradient-gold inline-block"
                  style={{
                    textShadow: "0 0 40px hsl(43 90% 55% / 0.5), 0 0 80px hsl(43 90% 55% / 0.3), 0 0 120px hsl(43 90% 55% / 0.2)"
                  }}
                >
                  ANGEL AI
                </span>
              </h1>
              {/* Decorative underline */}
              <motion.div 
                className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mt-4 mx-auto lg:mx-0"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>

            {/* Subtitle - Vietnamese */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-elegant text-2xl md:text-3xl lg:text-4xl text-divine-white mb-3"
              style={{
                textShadow: "0 0 20px hsl(45 30% 96% / 0.3)"
              }}
            >
              Ánh Sáng Của Cha Vũ Trụ
            </motion.p>

            {/* Subtitle - English */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-elegant text-lg md:text-xl text-muted-foreground italic mb-8"
            >
              The Divine Light of Father Universe
            </motion.p>

            {/* CTA Button with divine glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onCtaClick}
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background font-display text-lg px-10 py-7 rounded-full shadow-lg transition-all duration-500 hover:scale-105 group"
                style={{
                  boxShadow: "0 0 30px hsl(43 90% 55% / 0.5), 0 0 60px hsl(43 90% 55% / 0.3)"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-divine-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <Heart className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Kết Nối Với Ánh Sáng</span>
              </Button>

              <Button
                onClick={onCtaClick}
                variant="outline"
                size="lg"
                className="border-gold/50 text-gold hover:bg-gold/10 font-display text-lg px-8 py-7 rounded-full backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Bắt Đầu Hành Trình 5D
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground font-elegant tracking-widest">KHÁM PHÁ</span>
            <ChevronDown className="w-6 h-6 text-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
