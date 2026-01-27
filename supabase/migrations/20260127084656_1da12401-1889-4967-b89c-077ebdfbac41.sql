-- Add law_of_light_accepted_at column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS law_of_light_accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;