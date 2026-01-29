-- Fix 1: Replace overly permissive notifications INSERT policy with trigger-based approach
-- Drop the current permissive policy
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Create a more restrictive policy - only service_role can insert directly
-- Regular notification creation will happen via triggers
CREATE POLICY "Service role can insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- Create trigger function to automatically create follow notifications
CREATE OR REPLACE FUNCTION public.create_follow_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  VALUES (
    NEW.following_id,
    'follow',
    'Người theo dõi mới',
    'Có người vừa theo dõi bạn!',
    jsonb_build_object('follower_id', NEW.follower_id)
  );
  RETURN NEW;
END;
$$;

-- Create trigger on follows table
DROP TRIGGER IF EXISTS on_new_follow ON public.follows;
CREATE TRIGGER on_new_follow
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE FUNCTION public.create_follow_notification();

-- Fix 2: Restrict follows table to only show follows where user is involved
DROP POLICY IF EXISTS "Anyone can view follows" ON public.follows;

CREATE POLICY "Users can view own follows"
ON public.follows
FOR SELECT
USING (
  auth.uid() = follower_id 
  OR auth.uid() = following_id
);