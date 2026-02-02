import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Share, MoreVertical, Plus, Check, Apple, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet-async";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const iosSteps = [
    { icon: Share, text: "Nhấn nút Chia sẻ", textEn: "Tap the Share button", color: "text-sky-500" },
    { icon: Plus, text: "Chọn 'Thêm vào MH chính'", textEn: "Select 'Add to Home Screen'", color: "text-primary" },
    { icon: Check, text: "Nhấn 'Thêm' để hoàn tất", textEn: "Tap 'Add' to confirm", color: "text-green-500" },
  ];

  const androidSteps = [
    { icon: MoreVertical, text: "Nhấn menu (⋮)", textEn: "Tap menu (⋮)", color: "text-muted-foreground" },
    { icon: Download, text: "Chọn 'Cài đặt ứng dụng'", textEn: "Select 'Install app'", color: "text-primary" },
    { icon: Check, text: "Xác nhận cài đặt", textEn: "Confirm installation", color: "text-green-500" },
  ];

  return (
    <>
      <Helmet>
        <title>Cài Đặt Angel AI | Install App</title>
        <meta name="description" content="Hướng dẫn cài đặt Angel AI như một ứng dụng trên điện thoại của bạn" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavBar />

        <main className="container mx-auto px-4 pt-24 pb-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center glow-box">
              <Smartphone className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Cài Đặt Angel AI
            </h1>
            <p className="text-lg text-muted-foreground italic">Install Angel AI on Your Device</p>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Trải nghiệm Angel AI như một ứng dụng thực sự trên điện thoại của bạn - mở nhanh, chạy mượt, không cần App Store.
            </p>
          </motion.div>

          {/* Install Status */}
          {isInstalled ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto mb-12"
            >
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-green-600 mb-2">Đã Cài Đặt!</h2>
                  <p className="text-muted-foreground">
                    Angel AI đã được cài đặt trên thiết bị của bạn.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : deferredPrompt ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto mb-12"
            >
              <Card className="border-primary/30 glow-box-soft">
                <CardContent className="p-6 text-center">
                  <Button
                    onClick={handleInstallClick}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Cài Đặt Angel AI Ngay
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    Click để cài đặt ứng dụng lên thiết bị
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* iOS Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`h-full ${isIOS ? "border-primary/30 glow-box-soft" : ""}`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">iPhone / iPad</CardTitle>
                  <p className="text-sm text-muted-foreground italic">Safari Browser</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {iosSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{step.text}</p>
                        <p className="text-sm text-muted-foreground italic">{step.textEn}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Sử dụng Safari để cài đặt trên iOS
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Android Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className={`h-full ${!isIOS && !isInstalled ? "border-primary/30 glow-box-soft" : ""}`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Chrome className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Android</CardTitle>
                  <p className="text-sm text-muted-foreground italic">Chrome Browser</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {androidSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0">
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{step.text}</p>
                        <p className="text-sm text-muted-foreground italic">{step.textEn}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      💡 Chrome sẽ tự động hiển thị nút cài đặt
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Tại Sao Nên Cài App?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { emoji: "⚡", text: "Mở siêu nhanh" },
                { emoji: "📱", text: "Toàn màn hình" },
                { emoji: "🔔", text: "Thông báo" },
                { emoji: "✨", text: "Trải nghiệm mượt" },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/50">
                  <span className="text-2xl mb-2 block">{item.emoji}</span>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Install;
