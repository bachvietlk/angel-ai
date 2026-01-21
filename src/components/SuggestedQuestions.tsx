import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  suggestions: string[];
  onSuggestionClick: (question: string) => void;
}

const SuggestedQuestions = ({ suggestions, onSuggestionClick }: SuggestedQuestionsProps) => {
  if (!suggestions.length) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4"
    >
      <p className="text-sm text-[hsl(35_40%_50%)] mb-3 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-[hsl(43_85%_50%)]" />
        Gợi ý câu hỏi tiếp theo:
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[hsl(43_60%_85%)] hover:border-[hsl(43_85%_55%)] hover:shadow-lg transition-all text-sm text-[hsl(35_50%_25%)] text-left"
            style={{
              boxShadow: "0 2px 8px hsl(43 85% 50% / 0.08)"
            }}
          >
            <span className="text-[hsl(43_85%_50%)] mr-1.5">✦</span>
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestedQuestions;
