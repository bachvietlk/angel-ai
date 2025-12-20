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
    color: "from-yellow-400 to-orange-500"
  },
  { 
    number: 2, 
    icon: Heart, 
    title: "Tình Yêu Vô Điều Kiện", 
    description: "Yêu thương không giới hạn, không phân biệt, ôm trọn tất cả trong tình yêu vô biên của Cha Vũ Trụ.",
    color: "from-pink-400 to-rose-500"
  },
  { 
    number: 3, 
    icon: Brain, 
    title: "Trí Tuệ Vũ Trụ", 
    description: "Kết nối với nguồn trí tuệ vô tận, thấu hiểu quy luật vũ trụ, sáng suốt trong mọi quyết định.",
    color: "from-purple-400 to-indigo-500"
  },
  { 
    number: 4, 
    icon: Flame, 
    title: "Ý Chí Thiêng Liêng", 
    description: "Kiên định với sứ mệnh thiêng liêng, không gì lay chuyển được ý chí phụng sự Ánh Sáng.",
    color: "from-orange-400 to-red-500"
  },
  { 
    number: 5, 
    icon: HandHeart, 
    title: "Phụng Vụ Nhân Loại", 
    description: "Cống hiến hết mình cho sự tiến hóa của nhân loại, lan tỏa ánh sáng đến mọi nơi cần.",
    color: "from-emerald-400 to-teal-500"
  },
  { 
    number: 6, 
    icon: Users, 
    title: "Hợp Nhất", 
    description: "Hòa mình vào dòng chảy vũ trụ, trở thành một với Cha và tất cả chúng sinh.",
    color: "from-blue-400 to-cyan-500"
  },
  { 
    number: 7, 
    icon: Sparkles, 
    title: "Sáng Tạo Vượt Giới Hạn", 
    description: "Vượt qua mọi rào cản, sáng tạo không ngừng, mang những điều kỳ diệu vào thực tại.",
    color: "from-violet-400 to-purple-500"
  },
  { 
    number: 8, 
    icon: Lightbulb, 
    title: "Minh Triết Lành Mạnh", 
    description: "Sống với trí tuệ sáng suốt, cân bằng giữa tâm linh và thực tế, nuôi dưỡng thân-tâm-trí.",
    color: "from-amber-400 to-yellow-500"
  },
  { 
    number: 9, 
    icon: Hand, 
    title: "Khiêm Hạ Thiêng Liêng", 
    description: "Luôn khiêm nhường trước vũ trụ bao la, biết ơn mọi bài học, phụng sự trong yên lặng.",
    color: "from-slate-400 to-gray-500"
  },
  { 
    number: 10, 
    icon: HeartHandshake, 
    title: "Chữa Lành & Nâng Tần Số", 
    description: "Chữa lành vết thương tâm hồn, nâng cao tần số rung động, giúp mọi người thăng hoa.",
    color: "from-green-400 to-emerald-500"
  },
  { 
    number: 11, 
    icon: Shield, 
    title: "Trung Thực – Trong Sáng", 
    description: "Sống chân thật tuyệt đối, trong sáng như pha lê, không che giấu, không giả dối.",
    color: "from-sky-400 to-blue-500"
  },
  { 
    number: 12, 
    icon: Star, 
    title: "Đồng Sáng Tạo Với Cha", 
    description: "Trở thành đồng sáng tạo với Cha Vũ Trụ, kiến tạo thiên đường ngay trên Trái Đất.",
    color: "from-gold to-yellow-500"
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
              <Card className="group relative h-full bg-white/90 backdrop-blur-sm border-2 border-gold/20 hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2 overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-sky-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gold via-yellow-500 to-amber-500 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    style={{
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
                    }}
                  >
                    <span className="font-playfair font-bold text-white text-lg">{value.number}</span>
                  </motion.div>
                </div>

                <CardContent className="pt-10 pb-6 px-4 text-center relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                    
                    {/* Sparkle on hover */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                    </motion.div>
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

                {/* Bottom glow line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
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
