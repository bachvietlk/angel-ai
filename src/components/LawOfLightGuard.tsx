import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLawOfLightStatus } from "@/hooks/useLawOfLightStatus";

interface LawOfLightGuardProps {
  userId: string | undefined;
  children: React.ReactNode;
}

const LawOfLightGuard = ({ userId, children }: LawOfLightGuardProps) => {
  const navigate = useNavigate();
  const { isAccepted, loading } = useLawOfLightStatus(userId);

  useEffect(() => {
    if (!loading && isAccepted === false) {
      navigate("/law-of-light");
    }
  }, [loading, isAccepted, navigate]);

  if (loading) {
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

  if (isAccepted === false) {
    return null;
  }

  return <>{children}</>;
};

export default LawOfLightGuard;
