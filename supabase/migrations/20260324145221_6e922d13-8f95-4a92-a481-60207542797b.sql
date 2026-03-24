CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  date_from DATE NOT NULL,
  date_to DATE,
  speaker_count INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.bookings
  FOR INSERT TO anon WITH CHECK (true);
