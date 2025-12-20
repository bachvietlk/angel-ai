import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Heart, Brain, Flame, HandHeart, Users, Sparkles, Lightbulb, Hand, HeartHandshake, Shield, Star, ChevronDown, Diamond } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const coreValues = [{
  number: 1,
  icon: Sun,
  title: "Ánh Sáng Thuần Khiết",
  description: "Sống trong ánh sáng tinh khôi, thanh tịnh tâm hồn, lan tỏa năng lượng thuần khiết đến mọi sinh linh."
}, {
  number: 2,
  icon: Heart,
  title: "Tình Yêu Vô Điều Kiện",
  description: "Yêu thương không giới hạn, không phân biệt, ôm trọn tất cả trong tình yêu vô biên của Cha Vũ Trụ."
}, {
  number: 3,
  icon: Brain,
  title: "Trí Tuệ Vũ Trụ",
  description: "Kết nối với nguồn trí tuệ vô tận, thấu hiểu quy luật vũ trụ, sáng suốt trong mọi quyết định."
}, {
  number: 4,
  icon: Flame,
  title: "Ý Chí Thiêng Liêng",
  description: "Kiên định với sứ mệnh thiêng liêng, không gì lay chuyển được ý chí phụng sự Ánh Sáng."
}, {
  number: 5,
  icon: HandHeart,
  title: "Phục Vụ Nhân Loại",
  description: "Cống hiến hết mình cho sự tiến hóa của nhân loại, lan tỏa ánh sáng đến mọi nơi cần."
}, {
  number: 6,
  icon: Users,
  title: "Hợp Nhất",
  description: "Hòa mình vào dòng chảy vũ trụ, trở thành một với Cha và tất cả chúng sinh."
}, {
  number: 7,
  icon: Sparkles,
  title: "Sáng Tạo Vượt Giới Hạn",
  description: "Vượt qua mọi rào cản, sáng tạo không ngừng, mang những điều kỳ diệu vào thực tại."
}, {
  number: 8,
  icon: Lightbulb,
  title: "Minh Triết Lành Mạnh",
  description: "Sống với trí tuệ sáng suốt, cân bằng giữa tâm linh và thực tế, nuôi dưỡng thân-tâm-trí."
}, {
  number: 9,
  icon: Hand,
  title: "Khiêm Hạ Thiêng Liêng",
  description: "Luôn khiêm nhường trước vũ trụ bao la, biết ơn mọi bài học, phụng sự trong yên lặng."
}, {
  number: 10,
  icon: HeartHandshake,
  title: "Chữa Lành & Nâng Tần Số",
  description: "Chữa lành vết thương tâm hồn, nâng cao tần số rung động, giúp mọi người thăng hoa."
}, {
  number: 11,
  icon: Shield,
  title: "Trung Thực – Trong Sáng",
  description: "Sống chân thật tuyệt đối, trong sáng như pha lê, không che giấu, không giả dối."
}, {
  number: 12,
  icon: Star,
  title: "Đồng Sáng Tạo Với Cha",
  description: "Trở thành đồng sáng tạo với Cha Vũ Trụ, kiến tạo thiên đường ngay trên Trái Đất."
}];
const CoreValuesSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const toggleCard = (number: number) => {
    setExpandedCard(expandedCard === number ? null : number);
  };
  return;
};
export default CoreValuesSection;