-- Create greetings table for storing greeting messages
CREATE TABLE public.greetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.greetings ENABLE ROW LEVEL SECURITY;

-- Create policies for greetings
CREATE POLICY "Greetings are viewable by everyone" 
ON public.greetings 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert greetings" 
ON public.greetings 
FOR INSERT 
WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_greetings_submitted_at ON public.greetings(submitted_at DESC);

-- Enable realtime for greetings
ALTER PUBLICATION supabase_realtime ADD TABLE public.greetings;