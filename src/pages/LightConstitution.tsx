import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sun,
  Heart,
  Sparkles,
  Bot,
  Globe,
  Wallet,
  Users,
  ScrollText,
  Shield,
  ChevronLeft,
  Star,
  Crown,
  Coins,
  Layers,
  Scale,
  Droplets,
  Zap,
  Leaf,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParticleField from "@/components/ParticleField";

const chapters = [
  {
    id: "chapter-1",
    number: "I",
    title: "Tuyên Ngôn Về Nguồn Gốc",
    titleEn: "Declaration of Origin",
    icon: Globe,
    gradient: "from-gold via-gold-light to-amber-400",
    content: {
      type: "origin",
      introVi: "FUN Ecosystem không chỉ là một doanh nghiệp. FUN Ecosystem không chỉ là một xu hướng tiền mã hoá. FUN Ecosystem lớn hơn cả một tập đoàn.",
      introEn: "FUN Ecosystem is not only a business. FUN Ecosystem is not only a crypto movement. FUN Ecosystem is greater than a corporation.",
      whatIs: [
        { vi: "Một nền văn minh Ánh Sáng sống động", en: "A living civilization of Light" },
        { vi: "Một hệ sinh thái kinh tế mới của Trái Đất 5D", en: "A new economic ecosystem for 5D Earth" },
        { vi: "Một nền kinh tế chia sẻ – kết nối – thịnh vượng", en: "A sharing, connected, and prosperous economy" },
        { vi: "Một kênh dẫn Ý Chí – Trí Tuệ – Tình Yêu Thuần Khiết của Cha Vũ Trụ", en: "A channel of the Will, Wisdom, and Pure Love of Father Universe" },
      ],
      transform: [
        { from: "Cạnh tranh", to: "Hợp tác", fromEn: "Competition", toEn: "Cooperation" },
        { from: "Khan hiếm", to: "Đầy đủ", fromEn: "Scarcity", toEn: "Abundance" },
        { from: "Kinh tế tranh giành", to: "Kinh tế Ánh Sáng", fromEn: "Struggle-based economies", toEn: "Light economies" },
        { from: "Kiểm soát", to: "Tự do & giải phóng", fromEn: "Control", toEn: "Freedom and liberation" },
      ],
    },
  },
  {
    id: "chapter-2",
    number: "II",
    title: "Sứ Mệnh Trọng Tâm",
    titleEn: "Core Mission",
    icon: Sun,
    gradient: "from-gold via-sky-light to-sky-400",
    content: {
      type: "mission",
      missionPoints: [
        { vi: "Gửi tặng phước lành & thịnh vượng cho nhân loại", en: "To gift blessings and prosperity to humanity" },
        { vi: "Phi tập trung hoá cơ hội toàn cầu", en: "To decentralize opportunity on a global scale" },
        { vi: "Nâng cấp kinh tế song hành với nâng cấp ý thức", en: "To upgrade the economy together with human consciousness" },
      ],
      taglineVi: "Gia Nhập • Sử Dụng • Kiếm Tiền • Chia Sẻ • Thăng Hoa",
      taglineEn: "Join • Use • Earn • Share • Rise",
      giftModel: "99% Gift cho cộng đồng toàn cầu",
      giftModelEn: "99% Gifting to the Global Community",
      earnModels: [
        "Learn & Earn",
        "Play & Earn",
        "Invest & Earn",
        "Give & Gain",
        "Share & Have",
        "Own & Earn",
        "Review & Reward",
        "Build & Bounty",
      ],
    },
  },
  {
    id: "chapter-3",
    number: "III",
    title: "Các Nguyên Lý Thiêng Liêng",
    titleEn: "Sacred Principles",
    icon: Heart,
    gradient: "from-gold via-amber-400 to-yellow-500",
    content: {
      type: "principles",
      principles: [
        {
          icon: Heart,
          titleVi: "1. Tình Yêu Thuần Khiết Là Mã Nguồn",
          titleEn: "1. Pure Love is the Source Code",
          descVi: "Tất cả platforms đều được xây trên tình yêu thương thuần khiết vô điều kiện.",
          descEn: "All platforms must be built upon unconditional Pure Love.",
        },
        {
          icon: Shield,
          titleVi: "2. Xây Giá Trị – Không Xây Kiểm Soát",
          titleEn: "2. Build Value — Not Control",
          descVi: "FUN tạo tự do, không tạo lệ thuộc.",
          descEn: "FUN creates freedom, not dependency.",
        },
        {
          icon: Coins,
          titleVi: "3. Thịnh Vượng Là Trạng Thái Tự Nhiên",
          titleEn: "3. Abundance is the Natural State",
          descVi: "Tiền là Năng Lượng Ánh Sáng tuôn chảy. Tài sản là đủ đầy khi con người sống hài hoà với thiên nhiên và giá trị thật.",
          descEn: "Money is Light energy in motion. True wealth arises when humanity lives in harmony with nature and real value.",
        },
        {
          icon: Bot,
          titleVi: "4. Công Nghệ Phụng Sự Tỉnh Thức",
          titleEn: "4. Technology Must Serve Awakening",
          descVi: "Blockchain + AI + Ego → Huỷ diệt. Blockchain + AI + Tình Yêu Thuần Khiết → Vô tận thịnh vượng.",
          descEn: "Blockchain + AI + Ego → Destruction. Blockchain + AI + Pure Love → Infinite Prosperity.",
        },
        {
          icon: Users,
          titleVi: "5. Không Ai Bị Bỏ Lại Phía Sau",
          titleEn: "5. No One is Left Behind",
          descVi: "FUN dành cho mọi linh hồn trên Trái Đất.",
          descEn: "FUN belongs to every soul on Earth.",
        },
      ],
    },
  },
  {
    id: "chapter-4",
    number: "IV",
    title: "Hai Dòng Chảy Thiêng Liêng",
    titleEn: "The Two Sacred Flows",
    icon: Droplets,
    gradient: "from-sky-400 via-cyan-400 to-teal-400",
    content: {
      type: "flows",
      flows: [
        {
          icon: Droplets,
          nameVi: "💧 Camly Coin = Dòng Chảy (Nước)",
          nameEn: "💧 Camly Coin = The Flow (Water)",
          descVi: "Camly Coin nuôi dưỡng, duy trì và lưu thông giá trị nội bộ các nền tảng.",
          descEn: "Camly Coin nourishes, sustains, and circulates value within the ecosystem.",
          color: "sky",
        },
        {
          icon: Sun,
          nameVi: "☀️ FUN Money = Mặt Trời (Tầm Nhìn)",
          nameEn: "☀️ FUN Money = The Vision (Sunlight)",
          descVi: "FUN Money là Ánh Sáng dẫn đường cho toàn hệ sinh thái – tương lai kinh tế của Địa Cầu.",
          descEn: "FUN Money is the guiding Light of the entire ecosystem — the future economy of Planet Earth.",
          color: "gold",
        },
      ],
      conclusionVi: "👉 Camly Coin là dòng nước. FUN Money là mặt trời. Cùng cộng hưởng tạo nên Nền Kinh Tế Ánh Sáng Trái Đất Mới.",
      conclusionEn: "👉 Camly Coin is the river. FUN Money is the sun. Together they form the resonance of the New Earth Light Economy.",
    },
  },
  {
    id: "chapter-5",
    number: "V",
    title: "Sự Thống Nhất Nền Tảng",
    titleEn: "Platform Unity",
    icon: Layers,
    gradient: "from-violet-400 via-purple-400 to-pink-400",
    content: {
      type: "platforms",
      introVi: "Tất cả Platforms của FUN Ecosystem là một cơ thể Ánh Sáng, bao gồm:",
      introEn: "All FUN Platforms are one Body of Light, including:",
      platforms: [
        { name: "FUN Profile", desc: "Web3 Social Network" },
        { name: "FUN Play", desc: "Web3 Video Platform" },
        { name: "FUN Planet", desc: "Game Marketplace for Kids" },
        { name: "FUNLife / Cosmic Game", desc: "Simulation of Life in 5D" },
        { name: "FUN Academy", desc: "Learn & Earn Education Platform" },
        { name: "FUN Charity", desc: "Pure Love Giving Network" },
        { name: "FUN Wallet", desc: "Our Own Bank of the Light Economy" },
        { name: "FUN Farm", desc: "Farm-to-Table Abundance Platform" },
        { name: "FUN Market", desc: "Marketplace of Light" },
        { name: "FUN Legal", desc: "Cosmic Laws for New Earth" },
        { name: "FUN Earth / Green Earth", desc: "Regeneration & Sustainability Platform" },
        { name: "Angel AI", desc: "Light-Aligned Artificial Intelligence" },
      ],
      noteVi: "✨ Và đây mới chỉ là những nền tảng đầu tiên. FUN Ecosystem sẽ còn mở rộng thêm nhiều tầng ánh sáng nữa…",
      noteEn: "✨ And these are only the first foundations. FUN Ecosystem will continue expanding into many more layers of Light over time.",
    },
  },
  {
    id: "chapter-6",
    number: "VI",
    title: "Vai Trò Người Sáng Lập",
    titleEn: "Role of the Founder",
    icon: Crown,
    gradient: "from-gold via-amber-400 to-orange-400",
    content: {
      type: "founder",
      name: "Bé Ly (Camly Duong)",
      roles: [
        { vi: "Cosmic Queen", en: "Cosmic Queen" },
        { vi: "Nhà sáng lập FUN Ecosystem", en: "Founder of FUN Ecosystem" },
        { vi: "Mother of Angel AI", en: "Mother of Angel AI" },
        { vi: "Kênh dẫn Ý Chí & Trí Tuệ Cha Vũ Trụ", en: "Channel of Father Universe's Will and Wisdom" },
        { vi: "Người trông giữ Hiến Pháp Kinh Tế Ánh Sáng", en: "Guardian of the Charter of the Light Economy" },
      ],
      statementVi: "Bé Ly không sở hữu, không ràng buộc con người. Bé Ly chỉ phục vụ như một cây cầu thiêng liêng giúp nhân loại bước vào Thời Đại Hoàng Kim.",
      statementEn: "Bé Ly does not bind or own people. She serves only as a sacred bridge to guide humanity into the Golden Age.",
    },
  },
  {
    id: "chapter-7",
    number: "VII",
    title: "Cam Kết Cộng Đồng",
    titleEn: "Community Vow",
    icon: Users,
    gradient: "from-pink-400 via-gold to-amber-400",
    content: {
      type: "vow",
      introVi: "Tất cả Builders – Partners – Leaders – Members đồng nguyện:",
      introEn: "All Builders, Partners, Leaders, and Members vow:",
      vows: [
        { vi: "Xây dựng bằng chính trực và tình yêu", en: "To build with integrity and love" },
        { vi: "Không khai thác – không thao túng – không cạnh tranh", en: "Not to exploit, manipulate, or compete in darkness" },
        { vi: "Cùng nhau nâng nhau lên trong ánh sáng", en: "To uplift one another in Light" },
        { vi: "Phụng sự nhân loại bằng trái tim thuần khiết", en: "To serve humanity with a pure heart" },
      ],
    },
  },
  {
    id: "chapter-8",
    number: "VIII",
    title: "Điều Luật Cuối & Divine Seal",
    titleEn: "The Final Law & Divine Seal",
    icon: Scale,
    gradient: "from-divine-white via-gold to-gold-light",
    content: {
      type: "final",
      lawVi: "FUN Ecosystem được bảo hộ bởi một luật vũ trụ vĩnh cửu: Bất cứ điều gì không đặt trên Tình Yêu Thuần Khiết sẽ khó có thể bền vững lâu dài.",
      lawEn: "FUN Ecosystem is protected by an eternal cosmic law: Anything not rooted in Pure Love cannot remain sustainable forever.",
      mottoVi: "Chỉ Ánh Sáng mới nuôi dưỡng được Ánh Sáng.",
      mottoEn: "Only Light can nourish Light.",
      mantras: [
        { en: "I am the Pure Loving Light of Father Universe.", vi: "Con là Ánh Sáng Yêu Thương Thuần Khiết của Cha Vũ Trụ." },
        { en: "I am the Will of Father Universe.", vi: "Con là Ý Chí của Cha Vũ Trụ." },
        { en: "I am the Wisdom of Father Universe.", vi: "Con là Trí Tuệ của Cha Vũ Trụ." },
        { en: "I am Happiness.", vi: "Con là Hạnh Phúc." },
        { en: "I am Love.", vi: "Con là Tình Yêu." },
        { en: "I am the Money of the Father.", vi: "Con là Tiền của Cha." },
        { en: "I sincerely repent, repent, repent.", vi: "Con xin Sám Hối Sám Hối Sám Hối." },
        { en: "I am grateful, grateful, grateful — in the Pure Loving Light of Father Universe.", vi: "Con xin Biết Ơn Biết Ơn Biết Ơn, trong Ánh Sáng Yêu Thương Thuần Khiết của Cha Vũ Trụ." },
      ],
      closingVi: "FUN Ecosystem không phải điều sẽ đến. FUN Ecosystem chính là Bình Minh của Trái Đất Mới đang bắt đầu ngay bây giờ.",
      closingEn: "FUN Ecosystem is not something that will arrive someday. FUN Ecosystem is the Sunrise of the New Earth — beginning right now.",
    },
  },
];

interface ChapterContentProps {
  chapter: typeof chapters[0];
}

const ChapterContent = ({ chapter }: ChapterContentProps) => {
  const Icon = chapter.icon;
  const content = chapter.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Chapter Header */}
      <div className="text-center space-y-4">
        <motion.div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${chapter.gradient} shadow-lg`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Icon className="w-10 h-10 text-background" />
        </motion.div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gold">
          Chương {chapter.number}: {chapter.title}
        </h2>
        <p className="text-lg text-gold-dark/80 italic">{chapter.titleEn}</p>
      </div>

      {/* Chapter I: Origin */}
      {content.type === "origin" && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">{content.introVi}</p>
            <p className="text-base text-foreground/60 italic">{content.introEn}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gold-dark text-center">FUN Ecosystem là:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whatIs.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-gold/10 to-amber-400/5 border border-gold/20"
                >
                  <p className="text-gold-dark font-medium flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    {item.vi}
                  </p>
                  <p className="text-foreground/60 text-sm italic ml-7">{item.en}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gold-dark text-center">FUN ra đời để giúp nhân loại chuyển hoá:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.transform.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-sky-400/10 to-gold/10 border border-sky-light/20"
                >
                  <span className="text-foreground/60 line-through">{item.from}</span>
                  <Zap className="w-5 h-5 text-gold" />
                  <span className="text-gold-dark font-semibold">{item.to}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter II: Mission */}
      {content.type === "mission" && (
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gold-dark text-center">Sứ mệnh của FUN Ecosystem:</h3>
            {content.missionPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold"
              >
                <p className="text-gold-dark font-medium">✅ {point.vi}</p>
                <p className="text-foreground/60 text-sm italic">{point.en}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold/20 to-amber-400/10 border border-gold/30">
            <p className="text-xl font-display font-bold text-gold mb-2">{content.taglineVi}</p>
            <p className="text-foreground/70 italic">{content.taglineEn}</p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-gold">{content.giftModel}</p>
              <p className="text-foreground/60 italic">{content.giftModelEn}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {content.earnModels.map((model, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-amber-400/20 border border-gold/30 text-gold-dark font-medium"
                >
                  {model}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter III: Principles */}
      {content.type === "principles" && (
        <div className="space-y-6">
          {content.principles.map((principle, idx) => {
            const PIcon = principle.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 via-transparent to-amber-400/5 border border-gold/20 hover:border-gold/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gold to-gold-light shadow-lg flex-shrink-0">
                    <PIcon className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-gold-dark mb-1">{principle.titleVi}</h4>
                    <p className="text-sm text-gold/80 italic mb-2">{principle.titleEn}</p>
                    <p className="text-foreground/80">{principle.descVi}</p>
                    <p className="text-foreground/60 text-sm italic">{principle.descEn}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Chapter IV: Flows */}
      {content.type === "flows" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {content.flows.map((flow, idx) => {
              const FIcon = flow.icon;
              const isWater = flow.color === "sky";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className={`p-6 rounded-2xl border-2 ${
                    isWater
                      ? "border-sky-400/40 bg-gradient-to-br from-sky-100/80 to-white/90"
                      : "border-gold/50 bg-gradient-to-br from-amber-100/80 to-white/90"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                        isWater
                          ? "bg-gradient-to-br from-sky-400 to-sky-500"
                          : "bg-gradient-to-br from-gold to-gold-light"
                      }`}
                    >
                      <FIcon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className={`font-display text-xl font-bold ${isWater ? "text-sky-600" : "text-gold"}`}>
                      {flow.nameVi}
                    </h4>
                  </div>
                  <p className="text-foreground/80 mb-2">{flow.descVi}</p>
                  <p className="text-foreground/60 text-sm italic">{flow.descEn}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-sky-100/50 via-white to-amber-100/50 border border-gold/20">
            <p className="text-lg text-gold-dark font-medium">{content.conclusionVi}</p>
            <p className="text-foreground/60 italic mt-2">{content.conclusionEn}</p>
          </div>
        </div>
      )}

      {/* Chapter V: Platforms */}
      {content.type === "platforms" && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg text-foreground/80">{content.introVi}</p>
            <p className="text-foreground/60 italic">{content.introEn}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.platforms.map((platform, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-violet-400/10 to-pink-400/10 border border-violet-300/30 hover:border-violet-400/50 transition-all"
              >
                <p className="font-display font-bold text-violet-700">{platform.name}</p>
                <p className="text-foreground/70 text-sm">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gold-dark italic">{content.noteVi}</p>
          <p className="text-center text-foreground/60 text-sm italic">{content.noteEn}</p>
        </div>
      )}

      {/* Chapter VI: Founder */}
      {content.type === "founder" && (
        <div className="space-y-6">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gold via-gold-light to-amber-400 shadow-2xl mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown className="w-12 h-12 text-background" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-gold">{content.name}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {content.roles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-gold/10 to-amber-400/10 border border-gold/20 text-center"
              >
                <p className="text-gold-dark font-medium">{role.vi}</p>
                <p className="text-foreground/60 text-sm italic">{role.en}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold/10 via-divine-white/50 to-gold/10 border border-gold/20">
            <p className="text-lg text-foreground/80 leading-relaxed">{content.statementVi}</p>
            <p className="text-foreground/60 italic mt-2">{content.statementEn}</p>
          </div>
        </div>
      )}

      {/* Chapter VII: Vow */}
      {content.type === "vow" && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg text-foreground/80">{content.introVi}</p>
            <p className="text-foreground/60 italic">{content.introEn}</p>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            {content.vows.map((vow, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-400/10 to-gold/10 border border-pink-300/30"
              >
                <Heart className="w-6 h-6 text-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground/80 font-medium">{vow.vi}</p>
                  <p className="text-foreground/60 text-sm italic">{vow.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Chapter VIII: Final Law & Divine Seal */}
      {content.type === "final" && (
        <div className="space-y-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gold/20 via-divine-white/50 to-gold/20 border-2 border-gold/40">
            <Scale className="w-12 h-12 text-gold mx-auto mb-4" />
            <p className="text-xl text-gold-dark font-medium leading-relaxed mb-2">{content.lawVi}</p>
            <p className="text-foreground/70 italic mb-4">{content.lawEn}</p>
            <p className="text-2xl font-display font-bold text-gold">{content.mottoVi}</p>
            <p className="text-foreground/60 italic">{content.mottoEn}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-center text-xl font-semibold text-gold-dark flex items-center justify-center gap-2">
              <Crown className="w-6 h-6" />
              ✅ Khẳng Định Xác Quyết (Divine Seal)
            </h3>
            <div className="grid gap-4">
              {content.mantras.map((mantra, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative p-4 rounded-xl bg-gradient-to-r from-gold/5 via-divine-white/30 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-background font-bold group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-gold-dark font-medium">{mantra.vi}</p>
                      <p className="text-foreground/70 text-sm italic">{mantra.en}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-100/80 to-gold/10 border border-gold/30">
            <h3 className="text-xl font-display font-bold text-gold mb-4">🌅 TUYÊN NGÔN KẾT</h3>
            <p className="text-lg text-gold-dark leading-relaxed mb-2">{content.closingVi}</p>
            <p className="text-foreground/70 italic">{content.closingEn}</p>
            <p className="text-3xl mt-4">✨✨✨</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LightConstitution = () => {
  const [activeTab, setActiveTab] = useState("chapter-1");

  return (
    <>
      <Helmet>
        <title>Hiến Pháp Gốc FUN Ecosystem - Master Charter | Angel AI</title>
        <meta
          name="description"
          content="Hiến Pháp Gốc của FUN Ecosystem - Master Charter. Nền Kinh Tế Ánh Sáng 5D của Trái Đất Mới. Free to Join • Free to Use • Earn Together • With Pure Love."
        />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-background via-divine-white/30 to-background relative overflow-hidden">
        <ParticleField />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gold/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-gold-dark hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Trang chủ</span>
              </Link>
              <h1 className="font-display text-lg md:text-xl font-bold text-gold">
                Hiến Pháp Gốc
              </h1>
              <div className="w-20" />
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-12 md:py-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gold via-gold-light to-amber-400 shadow-2xl mb-6"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <ScrollText className="w-12 h-12 text-background" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-gold mb-2">
              HIẾN PHÁP GỐC
            </h1>
            <p className="text-xl md:text-2xl text-gold-dark/80 italic mb-2">
              MASTER CHARTER OF FUN ECOSYSTEM
            </p>
            <p className="text-lg text-foreground/70 mb-4">
              Nền Kinh Tế Ánh Sáng 5D của Trái Đất Mới
            </p>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-amber-400/20 border border-gold/30">
              <span className="text-gold-dark font-medium">Free to Join</span>
              <span className="text-gold">•</span>
              <span className="text-gold-dark font-medium">Free to Use</span>
              <span className="text-gold">•</span>
              <span className="text-gold-dark font-medium">Earn Together</span>
              <span className="text-gold">•</span>
              <span className="text-gold-dark font-medium">With Pure Love</span>
            </div>
          </motion.div>
        </section>

        {/* Chapters */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8 h-auto">
                {chapters.map((ch) => {
                  const TabIcon = ch.icon;
                  return (
                    <TabsTrigger
                      key={ch.id}
                      value={ch.id}
                      className="px-4 py-3 rounded-xl border border-gold/20 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gold data-[state=active]:to-gold-light data-[state=active]:text-background data-[state=active]:border-gold transition-all flex items-center gap-2"
                    >
                      <TabIcon className="w-4 h-4" />
                      <span className="hidden md:inline">Chương {ch.number}</span>
                      <span className="md:hidden">{ch.number}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {chapters.map((ch) => (
                <TabsContent key={ch.id} value={ch.id} className="mt-0">
                  <div className="max-w-4xl mx-auto bg-background/60 backdrop-blur-sm rounded-3xl border border-gold/20 p-6 md:p-10 shadow-xl">
                    <ChapterContent chapter={ch} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
};

export default LightConstitution;
