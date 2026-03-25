CREATE POLICY "Allow authenticated inserts"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (true);