import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { 
  Heart, 
  Star, 
  Smile, 
  Frown, 
  Meh, 
  Sparkles, 
  Sun, 
  Cloud,
  Edit3,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JournalEntry } from "@/hooks/useJournal";

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const moodIcons: Record<string, { icon: typeof Heart; color: string; label: string }> = {
  grateful: { icon: Heart, color: "text-pink-500", label: "Biết ơn" },
  peaceful: { icon: Sparkles, color: "text-purple-500", label: "Bình an" },
  happy: { icon: Smile, color: "text-yellow-500", label: "Vui vẻ" },
  reflective: { icon: Star, color: "text-blue-500", label: "Suy tư" },
  hopeful: { icon: Sun, color: "text-orange-500", label: "Hy vọng" },
  sad: { icon: Frown, color: "text-gray-500", label: "Buồn" },
  neutral: { icon: Meh, color: "text-slate-500", label: "Bình thường" },
  cloudy: { icon: Cloud, color: "text-slate-400", label: "U ám" },
};

const JournalEntryCard = ({ entry, onEdit, onDelete }: JournalEntryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const moodInfo = entry.mood ? moodIcons[entry.mood] : null;
  const MoodIcon = moodInfo?.icon || Heart;
  
  const formattedDate = format(new Date(entry.created_at), "EEEE, dd MMMM yyyy", { locale: vi });
  const formattedTime = format(new Date(entry.created_at), "HH:mm");
  
  const contentPreview = entry.content.length > 150 
    ? entry.content.slice(0, 150) + "..." 
    : entry.content;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[hsl(45_40%_99%)] border border-[hsl(43_40%_88%)] rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[hsl(35_50%_20%)] truncate">
            {entry.title}
          </h3>
          <p className="text-xs text-[hsl(35_30%_50%)] mt-1">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        
        {moodInfo && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[hsl(43_50%_95%)] ${moodInfo.color}`}>
            <MoodIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{moodInfo.label}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-[hsl(35_40%_30%)] leading-relaxed whitespace-pre-wrap">
          {isExpanded ? entry.content : contentPreview}
        </p>
        {entry.content.length > 150 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[hsl(43_85%_45%)] hover:text-[hsl(43_85%_35%)] p-0 h-auto"
          >
            {isExpanded ? (
              <>Thu gọn <ChevronUp className="w-4 h-4 ml-1" /></>
            ) : (
              <>Xem thêm <ChevronDown className="w-4 h-4 ml-1" /></>
            )}
          </Button>
        )}
      </div>

      {/* Gratitude */}
      {entry.gratitude && entry.gratitude.length > 0 && (
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-[hsl(43_70%_96%)] to-[hsl(43_50%_98%)] border border-[hsl(43_50%_90%)]">
          <p className="text-xs font-medium text-[hsl(43_85%_40%)] mb-2 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            Điều biết ơn hôm nay
          </p>
          <ul className="space-y-1">
            {entry.gratitude.map((item, index) => (
              <li key={index} className="text-sm text-[hsl(35_40%_30%)] flex items-start gap-2">
                <span className="text-[hsl(43_85%_50%)]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs bg-[hsl(43_50%_92%)] text-[hsl(35_50%_35%)] hover:bg-[hsl(43_50%_88%)]"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-[hsl(43_40%_92%)]">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(entry)}
          className="text-[hsl(35_40%_40%)] hover:text-[hsl(43_85%_45%)] hover:bg-[hsl(43_50%_95%)]"
        >
          <Edit3 className="w-4 h-4 mr-1.5" />
          Sửa
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(entry.id)}
          className="text-[hsl(0_60%_50%)] hover:text-[hsl(0_70%_45%)] hover:bg-[hsl(0_50%_95%)]"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Xóa
        </Button>
      </div>
    </motion.div>
  );
};

export default JournalEntryCard;
