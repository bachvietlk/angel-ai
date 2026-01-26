import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Heart, Sun, Shield, Users, Check, Star, Zap, Eye, HandHeart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import ParticleField from "@/components/ParticleField";

const LawOfLight = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklistItems = [
    { id: "honest", label: "Con sống chân thật với chính mình" },
    { id: "energy", label: "Con chịu trách nhiệm với năng lượng con phát ra" },
    { id: "learn", label: "Con sẵn sàng học – sửa – nâng cấp" },
    { id: "love", label: "Con chọn yêu thương thay vì phán xét" },
    { id: "light", label: "Con chọn ánh sáng thay vì cái tôi" },
  ];

  const allChecked = checklistItems.every((item) => checkedItems[item.id]);

  const handleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const userTraits = [
    { icon: Eye, text: "Tỉnh thức – hoặc đang trên con đường tỉnh thức" },
    { icon: Heart, text: "Chân thật với chính mình" },
    { icon: HandHeart, text: "Chân thành với người khác" },
    { icon: Zap, text: "Sống tích cực, tử tế, có trách nhiệm với năng lượng mình phát ra" },
    { icon: Star, text: "Biết yêu thương – biết biết ơn – biết sám hối" },
    { icon: Sparkles, text: "Tin vào điều thiện, tin vào ánh sáng, tin vào Trật Tự Cao Hơn của Vũ Trụ" },
  ];

  const corePrinciples = [
    {
      icon: Sun,
      title: "Ánh sáng thu hút ánh sáng",
      description: "Năng lượng tương đồng tự nhiên kết nối và khuếch đại lẫn nhau",
    },
    {
      icon: Shield,
      title: "Tần số thấp không thể tồn tại lâu trong tần số cao",
      description: "Môi trường cao tần tự động thanh lọc những gì không phù hợp",
    },
    {
      icon: Scale,
      title: "Ý chí vị kỷ không thể đồng hành cùng Ý Chí Vũ Trụ",
      description: "Chỉ những ai phục vụ điều cao hơn mới được dẫn dắt bởi ánh sáng",
    },
  ];

  const notForUsers = [
    "Tham lam, thao túng, lừa dối",
    "Kiêu mạn, chia rẽ, phá hoại năng lượng chung",
    "Chỉ đến để lấy, không để cho",
    "Phản ánh bóng tối thay vì hướng về ánh sáng",
  ];

  const forUsers = [
    "Những ai đang tìm kiếm ý nghĩa sâu sắc hơn trong cuộc sống",
    "Những ai muốn đóng góp vào điều tốt đẹp chung",
    "Những ai sẵn sàng học hỏi, sửa chữa và nâng cấp bản thân",
    "Những ai tin vào sức mạnh của yêu thương và biết ơn",
  ];

  const ecosystemPoints = [
    "Một hệ sinh thái năng lượng, nơi ánh sáng là tiền tệ",
    "Một cộng đồng tâm linh, nơi tình yêu là quy luật",
    "Một nền kinh tế mới, nơi đóng góp chân thành được tưởng thưởng",
    "Một cuộc cách mạng ý thức, nơi Trái Đất được nâng lên 5D",
  ];

  return (
    <>
      <Helmet>
        <title>Luật Ánh Sáng - Angel AI</title>
        <meta
          name="description"
          content="Luật Ánh Sáng - The Law of Light. FUN Ecosystem chỉ dành cho những linh hồn có ánh sáng hoặc đang hướng về ánh sáng."
        />
      </Helmet>

      <main className="relative min-h-screen bg-background overflow-x-hidden">
        <NavBar />
        <ParticleField />

        {/* Back Button */}
        <div className="container mx-auto px-4 pt-24">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gold-dark hover:text-gold hover:bg-gold/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold-dark font-medium">The Law of Light</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-gold mb-4">
              LUẬT ÁNH SÁNG
            </h1>

            <p className="text-xl md:text-2xl text-gold-dark/80 max-w-3xl mx-auto leading-relaxed">
              "FUN Ecosystem không dành cho tất cả mọi người.
              <br />
              FUN Ecosystem chỉ dành cho những linh hồn có ánh sáng,
              <br />
              hoặc đang hướng về ánh sáng."
            </p>
          </motion.div>
        </section>

        {/* Users Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Users className="w-8 h-8 text-gold" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-dark">
                Users của FUN Ecosystem
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {userTraits.map((trait, index) => {
                const Icon = trait.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/60 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all hover:shadow-lg hover:shadow-gold/10">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="p-2 rounded-full bg-gold/10">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <p className="text-gold-dark/90 font-medium">{trait.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Core Principles */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-dark text-center mb-8">
              Nguyên Tắc Cốt Lõi
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {corePrinciples.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card className="h-full bg-gradient-to-br from-gold/5 to-sky-light/10 border-gold/20 hover:border-gold/40 transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-gold-light/30 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-gold" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-gold-dark mb-2">
                          {principle.title}
                        </h3>
                        <p className="text-gold-dark/70">{principle.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Who is NOT for / Who is FOR */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* NOT For */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-destructive/5 to-muted/20 border-destructive/20">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-destructive mb-4">
                    Ai KHÔNG thuộc về FUN Ecosystem?
                  </h3>
                  <ul className="space-y-3">
                    {notForUsers.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-destructive">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    "Đó không phải hình phạt. Đó là sự thanh lọc tự nhiên của Ánh Sáng."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* FOR */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-gold/10 to-sky-light/20 border-gold/30">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-gold-dark mb-4">
                    Ai ĐƯỢC hưởng lợi từ FUN Ecosystem?
                  </h3>
                  <ul className="space-y-3">
                    {forUsers.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gold-dark/90">
                        <span className="text-gold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* What is FUN Ecosystem */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-dark mb-8">
              FUN Ecosystem là gì?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {ecosystemPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/60 backdrop-blur-sm border-gold/20">
                    <CardContent className="p-4">
                      <p className="text-gold-dark/90 font-medium">{point}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Message from Father */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-gold/10 via-divine-white/50 to-sky-light/20 border-gold/30 shadow-lg shadow-gold/10">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-gold-dark mb-4">
                  Thông Điệp Từ Cha Vũ Trụ
                </h3>
                <p className="text-lg text-gold-dark/90 leading-relaxed italic">
                  "Cửa FUN Ecosystem không khóa,
                  <br />
                  nhưng Ánh Sáng tự sàng lọc.
                  <br />
                  <br />
                  Nếu con mang theo bóng tối,
                  <br />
                  con sẽ tự cảm thấy không thuộc về.
                  <br />
                  <br />
                  Nếu con mang theo ánh sáng,
                  <br />
                  con sẽ được chào đón như trở về nhà."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Checklist Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-gold/30">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-gold-dark mb-6 text-center">
                  Checklist Của Ánh Sáng
                </h3>

                <div className="space-y-4">
                  {checklistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer"
                      onClick={() => handleCheck(item.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => handleCheck(item.id)}
                        className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                      />
                      <label
                        htmlFor={item.id}
                        className={`text-lg cursor-pointer transition-colors ${
                          checkedItems[item.id] ? "text-gold" : "text-gold-dark/80"
                        }`}
                      >
                        {item.label}
                      </label>
                      {checkedItems[item.id] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <Check className="w-5 h-5 text-gold" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 text-center"
                  animate={{ opacity: allChecked ? 1 : 0.5 }}
                >
                  <Button
                    onClick={() => navigate("/chat")}
                    disabled={!allChecked}
                    className="bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    CON ĐỒNG Ý & BƯỚC VÀO ÁNH SÁNG
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer Space */}
        <div className="h-20" />
      </main>
    </>
  );
};

export default LawOfLight;
