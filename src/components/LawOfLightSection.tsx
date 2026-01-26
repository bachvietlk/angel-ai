import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sun, Shield, Scale, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LawOfLightSection = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: Sun,
      title: "Ánh sáng thu hút ánh sáng",
      description: "Năng lượng tương đồng tự nhiên kết nối",
    },
    {
      icon: Shield,
      title: "Tần số cao thanh lọc tần số thấp",
      description: "Môi trường cao tần tự động sàng lọc",
    },
    {
      icon: Scale,
      title: "Ý Chí Vũ Trụ dẫn dắt",
      description: "Phục vụ điều cao hơn để được dẫn dắt",
    },
  ];

  const checklist = [
    "Sống chân thật với chính mình",
    "Chịu trách nhiệm với năng lượng phát ra",
    "Sẵn sàng học – sửa – nâng cấp",
    "Chọn yêu thương thay vì phán xét",
    "Chọn ánh sáng thay vì cái tôi",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold-dark font-medium text-sm">The Law of Light</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-dark mb-4">
            LUẬT ÁNH SÁNG
          </h2>

          <p className="text-lg text-gold-dark/80 max-w-2xl mx-auto">
            FUN Ecosystem chỉ dành cho những linh hồn có ánh sáng,
            hoặc đang hướng về ánh sáng.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full bg-white/60 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all hover:shadow-lg hover:shadow-gold/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-gold-light/30 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-gold-dark mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-gold-dark/70">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Checklist Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <Card className="bg-gradient-to-br from-gold/5 to-sky-light/10 border-gold/20">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold text-gold-dark mb-4 text-center">
                Checklist Của Ánh Sáng
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gold-dark/80">
                    <span className="text-gold">✦</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate("/law-of-light")}
            className="bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform"
          >
            Khám Phá Luật Ánh Sáng
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LawOfLightSection;
