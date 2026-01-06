import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-gold-dark hover:text-gold hover:bg-gold/10"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setLanguage("vi")}
          className={`gap-2 cursor-pointer ${language === "vi" ? "bg-gold/10 text-gold" : ""}`}
        >
          <span className="text-lg">🇻🇳</span>
          <span>Tiếng Việt</span>
          {language === "vi" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto text-gold"
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`gap-2 cursor-pointer ${language === "en" ? "bg-gold/10 text-gold" : ""}`}
        >
          <span className="text-lg">🇺🇸</span>
          <span>English</span>
          {language === "en" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto text-gold"
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
