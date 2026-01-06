-- Allow users to see other users' public profile info for leaderboard
CREATE POLICY "Anyone can view public profile info"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create shared_creations table for gallery
CREATE TABLE public.shared_creations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on shared_creations
ALTER TABLE public.shared_creations ENABLE ROW LEVEL SECURITY;

-- Anyone can view shared creations
CREATE POLICY "Anyone can view shared creations"
ON public.shared_creations
FOR SELECT
USING (true);

-- Users can create their own creations
CREATE POLICY "Users can create their own creations"
ON public.shared_creations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own creations
CREATE POLICY "Users can delete their own creations"
ON public.shared_creations
FOR DELETE
USING (auth.uid() = user_id);

-- Create creation_likes table
CREATE TABLE public.creation_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  creation_id UUID NOT NULL REFERENCES public.shared_creations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, creation_id)
);

-- Enable RLS on creation_likes
ALTER TABLE public.creation_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can view likes
CREATE POLICY "Anyone can view likes"
ON public.creation_likes
FOR SELECT
USING (true);

-- Users can like creations
CREATE POLICY "Users can like creations"
ON public.creation_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can unlike (delete their own likes)
CREATE POLICY "Users can unlike creations"
ON public.creation_likes
FOR DELETE
USING (auth.uid() = user_id);

-- Function to update likes_count when a like is added/removed
CREATE OR REPLACE FUNCTION public.update_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.shared_creations
    SET likes_count = likes_count + 1
    WHERE id = NEW.creation_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.shared_creations
    SET likes_count = likes_count - 1
    WHERE id = OLD.creation_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger to auto-update likes_count
CREATE TRIGGER on_like_change
AFTER INSERT OR DELETE ON public.creation_likes
FOR EACH ROW
EXECUTE FUNCTION public.update_likes_count();

-- Enable realtime for shared_creations
ALTER TABLE public.shared_creations REPLICA IDENTITY FULL;

-- Enable realtime for creation_likes
ALTER TABLE public.creation_likes REPLICA IDENTITY FULL;