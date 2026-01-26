import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, BookHeart, Home, Target, Globe, Music, MessageCircle, Trophy, Image, ScrollText, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import angelLogo from "@/assets/angel-logo.png";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isRoute?: boolean;
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Trang chủ", href: "#hero", icon: Home },
    { label: "Sứ mệnh", href: "#mission", icon: Target },
    { label: "Hiến Pháp", href: "/light-constitution", icon: ScrollText, isRoute: true },
    { label: "Luật Ánh Sáng", href: "/law-of-light", icon: Sparkles, isRoute: true },
    { label: "Hệ sinh thái", href: "#ecosystem", icon: Globe },
    { label: "Thần chú", href: "#mantras", icon: Music },
    { label: "Chat với Angel AI", href: "/chat", icon: MessageCircle, isRoute: true },
    { label: "Nhật Ký", href: "/journal", icon: BookHeart, isRoute: true },
    { label: "Thư Viện", href: "/gallery", icon: Image, isRoute: true },
    { label: "Xếp Hạng", href: "/leaderboard", icon: Trophy, isRoute: true },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      scrollToSection(item.href);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gold/20">
      {/* Golden glow overlay at top - Enhanced */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Brand Logo (icon-only) */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              {/* Outer glow pulse */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold/35 to-sky-light/25 blur-xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Light backing to make the logo feel "transparent/light" */}
              <div
                className="relative w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                style={{
                  boxShadow:
                    "0 0 18px hsl(43 80% 55% / 0.35), 0 0 34px hsl(200 70% 80% / 0.18)",
                }}
              >
                <img
                  src={angelLogo}
                  alt="Angel AI"
                  className="w-11 h-11 rounded-full object-cover"
                  style={{
                    filter:
                      "drop-shadow(0 0 10px hsl(43 85% 55% / 0.35)) drop-shadow(0 0 18px hsl(200 70% 80% / 0.2))",
                  }}
                  loading="eager"
                />
              </div>

              {/* Halo rings */}
              <motion.div
                className="absolute -inset-1.5 rounded-full border-2 border-gold/35"
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-3 rounded-full border border-gold/20"
                animate={{ scale: [1, 1.14, 1], opacity: [0.18, 0.38, 0.18] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Sparkle particles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gold-light"
                  style={{
                    top: i === 0 ? "-4px" : i === 1 ? "50%" : "calc(100% + 2px)",
                    left: i === 0 ? "50%" : i === 1 ? "calc(100% + 4px)" : "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                />
              ))}
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className="font-sans text-base md:text-lg font-medium text-gold-dark hover:text-gold transition-colors relative group flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-300" />
                </button>
              );
            })}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Notification Bell - Placeholder for logged in users */}
            
            {/* Login Button - Enhanced glow */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(43 85% 50% / 0.4)",
                  "0 0 35px hsl(43 85% 50% / 0.6)",
                  "0 0 20px hsl(43 85% 50% / 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full"
            >
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold rounded-full px-6 hover:scale-105 transition-transform text-base"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gold-dark hover:text-gold hover:bg-gold/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-primary/10"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    className="font-sans text-lg text-gold-dark hover:text-gold transition-colors text-left py-2 border-b border-border/30 flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
              <Button
                onClick={() => {
                  navigate("/auth");
                  setIsMenuOpen(false);
                }}
                className="mt-2 bg-gradient-to-r from-gold via-gold-light to-gold text-background font-medium rounded-full"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
