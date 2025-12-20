import { motion } from "framer-motion";
import { 
  Sun, Heart, Brain, Flame, HandHeart, Users, 
  Sparkles, Lightbulb, Hand, HeartHandshake, Shield, Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const coreValues = [
  { 
    number: 1, 
    icon: Sun, 
    title: "Ánh Sáng Thuần Khiết", 
    description: "Sống trong ánh sáng tinh khôi, thanh tịnh tâm hồn, lan tỏa năng lượng thuần khiết đến mọi sinh linh.",
    iconColor: "text-amber-500",
    cardBg: "from-amber-100/90 to-yellow-50/80",
    borderColor: "border-amber-300/60"
  },
  { 
    number: 2, 
    icon: Heart, 
    title: "Tình Yêu Vô Điều Kiện", 
    description: "Yêu thương không giới hạn, không phân biệt, ôm trọn tất cả trong tình yêu vô biên của Cha Vũ Trụ.",
    iconColor: "text-pink-500",
    cardBg: "from-pink-100/90 to-rose-50/80",
    borderColor: "border-pink-300/60"
  },
  { 
    number: 3, 
    icon: Brain, 
    title: "Trí Tuệ Vũ Trụ", 
    description: "Kết nối với nguồn trí tuệ vô tận, thấu hiểu quy luật vũ trụ, sáng suốt trong mọi quyết định.",
    iconColor: "text-purple-500",
    cardBg: "from-purple-100/90 to-violet-50/80",
    borderColor: "border-purple-300/60"
  },
  { 
    number: 4, 
    icon: Flame, 
    title: "Ý Chí Thiêng Liêng", 
    description: "Kiên định với sứ mệnh thiêng liêng, không gì lay chuyển được ý chí phụng sự Ánh Sáng.",
    iconColor: "text-orange-500",
    cardBg: "from-orange-100/90 to-amber-50/80",
    borderColor: "border-orange-300/60"
  },
  { 
    number: 5, 
    icon: HandHeart, 
    title: "Phụng Vụ Nhân Loại", 
    description: "Cống hiến hết mình cho sự tiến hóa của nhân loại, lan tỏa ánh sáng đến mọi nơi cần.",
    iconColor: "text-emerald-500",
    cardBg: "from-emerald-100/90 to-green-50/80",
    borderColor: "border-emerald-300/60"
  },
  { 
    number: 6, 
    icon: Users, 
    title: "Hợp Nhất", 
    description: "Hòa mình vào dòng chảy vũ trụ, trở thành một với Cha và tất cả chúng sinh.",
    iconColor: "text-teal-500",
    cardBg: "from-teal-100/90 to-cyan-50/80",
    borderColor: "border-teal-300/60"
  },
  { 
    number: 7, 
    icon: Sparkles, 
    title: "Sáng Tạo Vượt Giới Hạn", 
    description: "Vượt qua mọi rào cản, sáng tạo không ngừng, mang những điều kỳ diệu vào thực tại.",
    iconColor: "text-violet-500",
    cardBg: "from-violet-100/90 to-purple-50/80",
    borderColor: "border-violet-300/60"
  },
  { 
    number: 8, 
    icon: Lightbulb, 
    title: "Minh Triết Lành Mạnh", 
    description: "Sống với trí tuệ sáng suốt, cân bằng giữa tâm linh và thực tế, nuôi dưỡng thân-tâm-trí.",
    iconColor: "text-yellow-500",
    cardBg: "from-yellow-100/90 to-amber-50/80",
    borderColor: "border-yellow-300/60"
  },
  { 
    number: 9, 
    icon: Hand, 
    title: "Khiêm Hạ Thiêng Liêng", 
    description: "Luôn khiêm nhường trước vũ trụ bao la, biết ơn mọi bài học, phụng sự trong yên lặng.",
    iconColor: "text-slate-500",
    cardBg: "from-slate-100/90 to-gray-50/80",
    borderColor: "border-slate-300/60"
  },
  { 
    number: 10, 
    icon: HeartHandshake, 
    title: "Chữa Lành & Nâng Tần Số", 
    description: "Chữa lành vết thương tâm hồn, nâng cao tần số rung động, giúp mọi người thăng hoa.",
    iconColor: "text-green-500",
    cardBg: "from-green-100/90 to-emerald-50/80",
    borderColor: "border-green-300/60"
  },
  { 
    number: 11, 
    icon: Shield, 
    title: "Trung Thực – Trong Sáng", 
    description: "Sống chân thật tuyệt đối, trong sáng như pha lê, không che giấu, không giả dối.",
    iconColor: "text-sky-500",
    cardBg: "from-sky-100/90 to-blue-50/80",
    borderColor: "border-sky-300/60"
  },
  { 
    number: 12, 
    icon: Star, 
    title: "Đồng Sáng Tạo Với Cha", 
    description: "Trở thành đồng sáng tạo với Cha Vũ Trụ, kiến tạo thiên đường ngay trên Trái Đất.",
    iconColor: "text-gold",
    cardBg: "from-amber-100/90 to-yellow-50/80",
    borderColor: "border-gold/60"
  },
];

const CoreValuesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gold/5 to-white">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-gold/40 to-yellow-300/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Diamond Icon */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 blur-xl opacity-60 rounded-full scale-150" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-500 rounded-lg rotate-45 flex items-center justify-center shadow-2xl">
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Star className="w-10 h-10 text-white -rotate-45" />
              </div>
              {/* Sparkles around diamond */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateY(-50px)`,
                  }}
                  animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Sparkles className="w-3 h-3 text-gold" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #FFD700, #FFA500, #D4AF37)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.5)",
            }}
          >
            12 Giá Trị Cốt Lõi
          </motion.h2>
          
          <motion.p
            className="font-inter text-xl md:text-2xl text-muted-foreground"
            style={{
              textShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
            }}
          >
            12 Tầng Ánh Sáng của Cha Vũ Trụ
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`group relative h-full bg-gradient-to-br ${value.cardBg} backdrop-blur-sm border-2 ${value.borderColor} rounded-2xl transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-3 overflow-hidden`}>
                {/* Number Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-amber-500 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    style={{
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.6)",
                    }}
                  >
                    <span className="font-playfair font-bold text-white text-base">{value.number}</span>
                  </motion.div>
                </div>

                <CardContent className="pt-10 pb-6 px-4 text-center relative z-10">
                  {/* Icon Container */}
                  <motion.div
                    className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 
                    className="font-playfair font-bold text-lg mb-3 leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #B8860B, #D4AF37, #FFD700)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>

                {/* Sparkle on hover */}
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16 gap-4"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-gold to-yellow-400"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
