import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useLawOfLightStatus = (userId: string | undefined) => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      setIsAccepted(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("law_of_light_accepted_at")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error checking law of light status:", error);
        setIsAccepted(null);
      } else {
        setIsAccepted(data?.law_of_light_accepted_at !== null);
      }
    } catch (err) {
      console.error("Error checking law of light status:", err);
      setIsAccepted(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const acceptLawOfLight = async (): Promise<boolean> => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ law_of_light_accepted_at: new Date().toISOString() })
        .eq("user_id", userId);

      if (error) {
        console.error("Error accepting law of light:", error);
        return false;
      }

      setIsAccepted(true);
      return true;
    } catch (err) {
      console.error("Error accepting law of light:", err);
      return false;
    }
  };

  return { isAccepted, loading, acceptLawOfLight, refetch: checkStatus };
};
