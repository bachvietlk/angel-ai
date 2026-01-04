import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Save, 
  Heart, 
  Star, 
  Smile, 
  Frown, 
  Meh, 
  Sparkles, 
  Sun, 
  Cloud,
  Plus,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { JournalEntry, NewJournalEntry } from "@/hooks/useJournal";

interface JournalEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: NewJournalEntry) => Promise<any>;
  editingEntry?: JournalEntry | null;
}

const moods = [
  { id: "grateful", icon: Heart, color: "text-pink-500 bg-pink-50 border-pink-200", label: "Biết ơn" },
  { id: "peaceful", icon: Sparkles, color: "text-purple-500 bg-purple-50 border-purple-200", label: "Bình an" },
  { id: "happy", icon: Smile, color: "text-yellow-500 bg-yellow-50 border-yellow-200", label: "Vui vẻ" },
  { id: "reflective", icon: Star, color: "text-blue-500 bg-blue-50 border-blue-200", label: "Suy tư" },
  { id: "hopeful", icon: Sun, color: "text-orange-500 bg-orange-50 border-orange-200", label: "Hy vọng" },
  { id: "neutral", icon: Meh, color: "text-slate-500 bg-slate-50 border-slate-200", label: "Bình thường" },
  { id: "cloudy", icon: Cloud, color: "text-slate-400 bg-slate-50 border-slate-200", label: "U ám" },
  { id: "sad", icon: Frown, color: "text-gray-500 bg-gray-50 border-gray-200", label: "Buồn" },
];

const JournalEditor = ({ isOpen, onClose, onSave, editingEntry }: JournalEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("");
  const [gratitude, setGratitude] = useState<string[]>([]);
  const [gratitudeInput, setGratitudeInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setContent(editingEntry.content);
      setMood(editingEntry.mood || "");
      setGratitude(editingEntry.gratitude || []);
      setTags(editingEntry.tags || []);
    } else {
      resetForm();
    }
  }, [editingEntry, isOpen]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("");
    setGratitude([]);
    setGratitudeInput("");
    setTags([]);
    setTagInput("");
  };

  const handleAddGratitude = () => {
    if (gratitudeInput.trim() && gratitude.length < 5) {
      setGratitude([...gratitude, gratitudeInput.trim()]);
      setGratitudeInput("");
    }
  };

  const handleRemoveGratitude = (index: number) => {
    setGratitude(gratitude.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase().replace(/[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, "");
    if (newTag && tags.length < 5 && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    
    setIsSaving(true);
    try {
      const entry: NewJournalEntry = {
        title: title.trim(),
        content: content.trim(),
        mood: mood || undefined,
        gratitude: gratitude.length > 0 ? gratitude : undefined,
        tags: tags.length > 0 ? tags : undefined,
      };
      
      await onSave(entry);
      resetForm();
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[hsl(35_50%_15%/0.4)] backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-[hsl(45_40%_99%)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-[hsl(43_40%_90%)] flex items-center justify-between shrink-0">
              <h2 className="text-lg md:text-xl font-semibold text-[hsl(35_50%_20%)]">
                {editingEntry ? "Sửa nhật ký" : "Viết nhật ký mới"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-[hsl(35_40%_40%)] hover:text-[hsl(35_40%_20%)]"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-[hsl(35_40%_35%)] mb-1.5 block">
                  Tiêu đề
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Hành trình hôm nay..."
                  className="bg-white border-[hsl(43_40%_85%)] focus:border-[hsl(43_85%_50%)]"
                  maxLength={100}
                />
              </div>

              {/* Mood */}
              <div>
                <label className="text-sm font-medium text-[hsl(35_40%_35%)] mb-2 block">
                  Tâm trạng của bạn
                </label>
                <div className="flex flex-wrap gap-2">
                  {moods.map((m) => {
                    const Icon = m.icon;
                    const isSelected = mood === m.id;
                    return (
                      <motion.button
                        key={m.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMood(isSelected ? "" : m.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                          isSelected 
                            ? `${m.color} ring-2 ring-offset-1` 
                            : "bg-white border-[hsl(43_40%_88%)] text-[hsl(35_40%_45%)] hover:border-[hsl(43_60%_75%)]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{m.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-medium text-[hsl(35_40%_35%)] mb-1.5 block">
                  Nội dung
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Hôm nay, tôi cảm thấy biết ơn vì..."
                  className="min-h-[150px] bg-white border-[hsl(43_40%_85%)] focus:border-[hsl(43_85%_50%)] resize-none"
                  maxLength={5000}
                />
                <p className="text-xs text-[hsl(35_30%_55%)] mt-1 text-right">
                  {content.length}/5000
                </p>
              </div>

              {/* Gratitude */}
              <div>
                <label className="text-sm font-medium text-[hsl(35_40%_35%)] mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-pink-500" />
                  Điều biết ơn (tối đa 5)
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={gratitudeInput}
                    onChange={(e) => setGratitudeInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddGratitude())}
                    placeholder="Tôi biết ơn vì..."
                    className="flex-1 bg-white border-[hsl(43_40%_85%)]"
                    maxLength={100}
                    disabled={gratitude.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={handleAddGratitude}
                    disabled={!gratitudeInput.trim() || gratitude.length >= 5}
                    className="bg-[hsl(43_85%_50%)] hover:bg-[hsl(43_85%_45%)] text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {gratitude.length > 0 && (
                  <ul className="space-y-1.5">
                    {gratitude.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-[hsl(35_40%_30%)] bg-[hsl(43_50%_96%)] rounded-lg px-3 py-2">
                        <Heart className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span className="flex-1">{item}</span>
                        <button
                          onClick={() => handleRemoveGratitude(index)}
                          className="text-[hsl(0_60%_50%)] hover:text-[hsl(0_70%_40%)]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-[hsl(35_40%_35%)] mb-1.5 flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-[hsl(43_85%_45%)]" />
                  Thẻ (tối đa 5)
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    placeholder="biếtơn, bìnhan, yêuthương..."
                    className="flex-1 bg-white border-[hsl(43_40%_85%)]"
                    maxLength={20}
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || tags.length >= 5}
                    className="bg-[hsl(43_85%_50%)] hover:bg-[hsl(43_85%_45%)] text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[hsl(43_50%_92%)] text-[hsl(35_50%_35%)] cursor-pointer hover:bg-[hsl(0_50%_90%)]"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        #{tag} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-5 border-t border-[hsl(43_40%_90%)] flex items-center justify-end gap-3 shrink-0">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[hsl(43_40%_85%)] text-[hsl(35_40%_40%)]"
              >
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={!title.trim() || !content.trim() || isSaving}
                className="bg-gradient-to-r from-[hsl(43_85%_55%)] to-[hsl(43_85%_45%)] hover:from-[hsl(43_85%_50%)] hover:to-[hsl(43_85%_40%)] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Đang lưu..." : "Lưu nhật ký"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JournalEditor;
