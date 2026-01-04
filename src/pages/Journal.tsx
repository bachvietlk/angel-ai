import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJournal, JournalEntry, NewJournalEntry } from "@/hooks/useJournal";
import JournalEntryCard from "@/components/JournalEntryCard";
import JournalEditor from "@/components/JournalEditor";
import {
  BookOpen,
  Plus,
  ArrowLeft,
  Search,
  Sparkles,
  Calendar,
  Heart,
  MessageCircle,
} from "lucide-react";

const Journal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const navigate = useNavigate();
  
  const { entries, isLoading, createEntry, updateEntry, deleteEntry } = useJournal(user);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const filteredEntries = entries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleCreateEntry = () => {
    setEditingEntry(null);
    setIsEditorOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsEditorOpen(true);
  };

  const handleSaveEntry = async (data: NewJournalEntry) => {
    if (editingEntry) {
      await updateEntry(editingEntry.id, data);
    } else {
      await createEntry(data);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa nhật ký này?")) {
      await deleteEntry(id);
    }
  };

  // Stats
  const totalEntries = entries.length;
  const thisMonthEntries = entries.filter((e) => {
    const entryDate = new Date(e.created_at);
    const now = new Date();
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  }).length;
  const gratitudeCount = entries.reduce((acc, e) => acc + (e.gratitude?.length || 0), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-[hsl(45_30%_98%)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-[hsl(43_85%_50%)]" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Nhật Ký Tâm Linh – Angel AI</title>
        <meta name="description" content="Ghi chép hành trình phát triển tâm linh và sự biết ơn của bạn với Nhật Ký Tâm Linh từ Angel AI" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[hsl(45_40%_98%)] via-[hsl(45_30%_99%)] to-[hsl(45_40%_98%)]">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[hsl(45_40%_99%)/95] backdrop-blur-md border-b border-[hsl(43_40%_90%)]">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/chat")}
                className="text-[hsl(35_40%_40%)] hover:text-[hsl(43_85%_45%)] hover:bg-[hsl(43_50%_95%)]"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-[hsl(35_50%_20%)]">Nhật Ký Tâm Linh</h1>
                  <p className="text-xs text-[hsl(35_30%_50%)]">Hành trình ánh sáng của bạn</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCreateEntry}
              className="bg-gradient-to-r from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_40%)] text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Viết mới</span>
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 border border-[hsl(43_40%_90%)] shadow-sm text-center"
            >
              <Calendar className="w-5 h-5 text-[hsl(43_85%_50%)] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[hsl(35_50%_20%)]">{totalEntries}</p>
              <p className="text-xs text-[hsl(35_30%_50%)]">Tổng nhật ký</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 border border-[hsl(43_40%_90%)] shadow-sm text-center"
            >
              <BookOpen className="w-5 h-5 text-[hsl(200_70%_50%)] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[hsl(35_50%_20%)]">{thisMonthEntries}</p>
              <p className="text-xs text-[hsl(35_30%_50%)]">Tháng này</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 border border-[hsl(43_40%_90%)] shadow-sm text-center"
            >
              <Heart className="w-5 h-5 text-pink-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-[hsl(35_50%_20%)]">{gratitudeCount}</p>
              <p className="text-xs text-[hsl(35_30%_50%)]">Điều biết ơn</p>
            </motion.div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(35_30%_50%)]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhật ký..."
              className="pl-10 bg-white border-[hsl(43_40%_88%)] focus:border-[hsl(43_85%_50%)]"
            />
          </div>

          {/* Entries List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-[hsl(43_85%_50%)]" />
              </motion.div>
            </div>
          ) : filteredEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-[hsl(43_50%_95%)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-[hsl(43_85%_50%)]" />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-medium text-[hsl(35_50%_20%)] mb-2">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="text-sm text-[hsl(35_30%_50%)]">
                    Thử tìm kiếm với từ khóa khác
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-[hsl(35_50%_20%)] mb-2">
                    Chưa có nhật ký nào
                  </h3>
                  <p className="text-sm text-[hsl(35_30%_50%)] mb-4">
                    Bắt đầu ghi chép hành trình tâm linh của bạn
                  </p>
                  <Button
                    onClick={handleCreateEntry}
                    className="bg-gradient-to-r from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_40%)] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Viết nhật ký đầu tiên
                  </Button>
                </>
              )}
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredEntries.map((entry) => (
                  <JournalEntryCard
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Quick Action - Chat with Angel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-6 right-6"
          >
            <Button
              onClick={() => navigate("/chat")}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_40%)] text-white shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        </main>
      </div>

      {/* Editor Modal */}
      <JournalEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSaveEntry}
        editingEntry={editingEntry}
      />
    </>
  );
};

export default Journal;
