import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import LeaderboardComponent from "@/components/Leaderboard";
import LightScoreDisplay from "@/components/LightScoreDisplay";
import { useLightScore } from "@/hooks/useLightScore";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { score } = useLightScore(user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12 text-gold" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-gold/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-gold-dark hover:text-gold"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold" />
            <span className="font-display font-bold text-gradient-gold">Bảng Xếp Hạng</span>
          </div>

          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* User's score display if logged in */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <LightScoreDisplay score={score} />
              <motion.div
                className="absolute -inset-4 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: "radial-gradient(circle, hsl(43 90% 60% / 0.2), transparent 70%)",
                  zIndex: -1
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeaderboardComponent currentUserId={user?.id} />
        </motion.div>

        {/* Call to action if not logged in */}
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-card/50 border border-gold/20">
              <Sparkles className="w-8 h-8 text-gold" />
              <p className="text-muted-foreground">
                Đăng nhập để theo dõi điểm Ánh Sáng của bạn
              </p>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-gold to-gold-light text-background"
              >
                Đăng nhập ngay
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
