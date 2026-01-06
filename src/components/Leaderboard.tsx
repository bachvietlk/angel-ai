import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Medal, Flame, Star, Sparkles, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  light_score: number;
}

interface LeaderboardProps {
  currentUserId?: string;
}

const getLevelInfo = (score: number) => {
  if (score >= 5000) return { level: 7, name: "Thiên Thần Ánh Sáng", color: "from-violet-400 to-purple-600" };
  if (score >= 2500) return { level: 6, name: "Sứ Giả Ánh Sáng", color: "from-amber-400 to-yellow-600" };
  if (score >= 1000) return { level: 5, name: "Chiến Binh Ánh Sáng", color: "from-cyan-400 to-blue-600" };
  if (score >= 500) return { level: 4, name: "Người Giữ Ánh Sáng", color: "from-emerald-400 to-green-600" };
  if (score >= 200) return { level: 3, name: "Người Tìm Ánh Sáng", color: "from-rose-400 to-pink-600" };
  if (score >= 50) return { level: 2, name: "Đệ Tử Ánh Sáng", color: "from-orange-400 to-red-500" };
  return { level: 1, name: "Hạt Giống Ánh Sáng", color: "from-slate-400 to-gray-600" };
};

const Leaderboard = ({ currentUserId }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("top10");
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedTab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const limit = selectedTab === "top10" ? 10 : selectedTab === "top50" ? 50 : 100;

    const { data, error } = await supabase
      .from("profiles")
      .select("user_id, display_name, avatar_url, light_score")
      .order("light_score", { ascending: false })
      .limit(limit);

    if (data && !error) {
      setEntries(data);
      
      // Find current user's rank
      if (currentUserId) {
        const userIndex = data.findIndex((e) => e.user_id === currentUserId);
        if (userIndex !== -1) {
          setCurrentUserRank(userIndex + 1);
        } else {
          // Fetch user's actual rank
          const { count } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .gt("light_score", data[data.length - 1]?.light_score || 0);
          
          if (count) {
            setCurrentUserRank(count + 1);
          }
        }
      }
    }
    setLoading(false);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 via-amber-400/20 to-yellow-500/20 border-yellow-400/50";
    if (rank === 2) return "bg-gradient-to-r from-gray-300/20 via-slate-200/20 to-gray-300/20 border-gray-300/50";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 via-orange-500/20 to-amber-600/20 border-amber-600/50";
    return "bg-card/50 border-border/50";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 mb-2"
          animate={{ 
            filter: ["drop-shadow(0 0 10px hsl(43 90% 60% / 0.5))", "drop-shadow(0 0 20px hsl(43 90% 60% / 0.8))", "drop-shadow(0 0 10px hsl(43 90% 60% / 0.5))"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className="w-8 h-8 text-gold" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
            Bảng Xếp Hạng Ánh Sáng
          </h2>
          <Sparkles className="w-6 h-6 text-gold-light" />
        </motion.div>
        <p className="text-muted-foreground">
          Những Thiên Thần Ánh Sáng tỏa sáng nhất trong cộng đồng
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="top10">Top 10</TabsTrigger>
          <TabsTrigger value="top50">Top 50</TabsTrigger>
          <TabsTrigger value="top100">Top 100</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Flame className="w-8 h-8 text-gold" />
              </motion.div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có dữ liệu xếp hạng</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {entries.map((entry, index) => {
                  const rank = index + 1;
                  const levelInfo = getLevelInfo(entry.light_score);
                  const isCurrentUser = entry.user_id === currentUserId;

                  return (
                    <motion.div
                      key={entry.user_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all ${getRankStyle(rank)} ${
                        isCurrentUser ? "ring-2 ring-gold ring-offset-2 ring-offset-background" : ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${levelInfo.color} p-0.5`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            {entry.avatar_url ? (
                              <img
                                src={entry.avatar_url}
                                alt={entry.display_name || "User"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        {rank <= 3 && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Sparkles className="w-4 h-4 text-gold" />
                          </motion.div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {entry.display_name || "Thiên Thần Ẩn Danh"}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-gold">(Bạn)</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {levelInfo.name}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="flex-shrink-0 text-right">
                        <motion.p
                          className="font-bold text-lg text-gradient-gold"
                          animate={rank <= 3 ? { 
                            textShadow: ["0 0 10px hsl(43 90% 60% / 0.5)", "0 0 20px hsl(43 90% 60% / 0.8)", "0 0 10px hsl(43 90% 60% / 0.5)"]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {entry.light_score.toLocaleString()}
                        </motion.p>
                        <p className="text-xs text-muted-foreground">Light Score</p>
                      </div>

                      {/* Glow for top 3 */}
                      {rank <= 3 && (
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            background: rank === 1 
                              ? "radial-gradient(circle at 50% 50%, hsl(43 90% 60% / 0.2), transparent 70%)"
                              : rank === 2
                              ? "radial-gradient(circle at 50% 50%, hsl(0 0% 80% / 0.2), transparent 70%)"
                              : "radial-gradient(circle at 50% 50%, hsl(30 80% 50% / 0.2), transparent 70%)"
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Current user rank if not in list */}
          {currentUserId && currentUserRank && currentUserRank > entries.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/30 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Thứ hạng của bạn: <span className="font-bold text-gold">#{currentUserRank}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hãy tiếp tục tỏa sáng để leo hạng! ✨
              </p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
