import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Image, Video, TrendingUp, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import GalleryCard from "@/components/GalleryCard";

type FilterType = "all" | "image" | "video";
type SortType = "newest" | "popular";
type TabType = "all" | "mine";

interface GalleryItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: "image" | "video";
  likes_count: number;
  created_at: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

const GalleryPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [tab, setTab] = useState<TabType>("all");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchGallery = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("shared_creations")
      .select(`
        id,
        user_id,
        title,
        description,
        media_url,
        media_type,
        likes_count,
        created_at
      `);

    // Filter by type
    if (filter !== "all") {
      query = query.eq("media_type", filter);
    }

    // Filter by user
    if (tab === "mine" && user) {
      query = query.eq("user_id", user.id);
    }

    // Sort
    if (sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("likes_count", { ascending: false });
    }

    query = query.limit(50);

    const { data, error } = await query;

    if (data && !error) {
      // Fetch profiles for all unique user_ids
      const userIds = [...new Set(data.map((item) => item.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        profiles?.map((p) => [p.user_id, { display_name: p.display_name, avatar_url: p.avatar_url }]) || []
      );

      const itemsWithProfiles = data.map((item) => ({
        ...item,
        media_type: item.media_type as "image" | "video",
        profiles: profileMap.get(item.user_id) || null,
      }));

      setItems(itemsWithProfiles);
    }
    setLoading(false);
  }, [filter, sort, tab, user]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("gallery-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shared_creations" },
        () => {
          fetchGallery();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGallery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
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
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-display font-bold text-gradient-gold">Thư Viện Ánh Sáng</span>
          </div>

          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabType)} className="mb-4">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {user && <TabsTrigger value="mine">Của tôi</TabsTrigger>}
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Type filter */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                filter === "all" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("image")}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${
                filter === "image" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              Ảnh
            </button>
            <button
              onClick={() => setFilter("video")}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${
                filter === "video" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Video
            </button>
          </div>

          {/* Sort */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setSort("newest")}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${
                sort === "newest" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Mới nhất
            </button>
            <button
              onClick={() => setSort("popular")}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${
                sort === "popular" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Phổ biến
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-gold" />
            </motion.div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              {tab === "mine"
                ? "Bạn chưa chia sẻ sáng tạo nào"
                : "Chưa có sáng tạo nào trong thư viện"}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Hãy tạo và chia sẻ Ánh Sáng của bạn!
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {items.map((item) => (
                <GalleryCard
                  key={item.id}
                  id={item.id}
                  userId={item.user_id}
                  title={item.title}
                  description={item.description}
                  mediaUrl={item.media_url}
                  mediaType={item.media_type}
                  likesCount={item.likes_count}
                  createdAt={item.created_at}
                  creatorName={item.profiles?.display_name ?? null}
                  creatorAvatar={item.profiles?.avatar_url ?? null}
                  currentUserId={user?.id}
                  onDelete={fetchGallery}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GalleryPage;
