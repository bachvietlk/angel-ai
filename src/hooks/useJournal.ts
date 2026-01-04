import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  mood: string | null;
  gratitude: string[] | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface NewJournalEntry {
  title: string;
  content: string;
  mood?: string;
  gratitude?: string[];
  tags?: string[];
}

export const useJournal = (user: User | null) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      console.error("Error fetching journal entries:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải nhật ký",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const createEntry = async (entry: NewJournalEntry): Promise<JournalEntry | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          title: entry.title,
          content: entry.content,
          mood: entry.mood || null,
          gratitude: entry.gratitude || null,
          tags: entry.tags || null,
        })
        .select()
        .single();

      if (error) throw error;

      setEntries((prev) => [data, ...prev]);
      toast({
        title: "✨ Đã lưu",
        description: "Nhật ký đã được lưu thành công",
      });
      return data;
    } catch (error: any) {
      console.error("Error creating journal entry:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu nhật ký",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateEntry = async (id: string, updates: Partial<NewJournalEntry>): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("journal_entries")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, ...updates, updated_at: new Date().toISOString() } : entry
        )
      );
      toast({
        title: "✨ Đã cập nhật",
        description: "Nhật ký đã được cập nhật",
      });
      return true;
    } catch (error: any) {
      console.error("Error updating journal entry:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật nhật ký",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEntry = async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      toast({
        title: "Đã xóa",
        description: "Nhật ký đã được xóa",
      });
      return true;
    } catch (error: any) {
      console.error("Error deleting journal entry:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa nhật ký",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    entries,
    isLoading,
    createEntry,
    updateEntry,
    deleteEntry,
    refreshEntries: fetchEntries,
  };
};
