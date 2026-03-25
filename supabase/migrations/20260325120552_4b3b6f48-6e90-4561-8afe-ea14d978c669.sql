-- Add status column to bookings
ALTER TABLE public.bookings ADD COLUMN status text NOT NULL DEFAULT 'pending';

-- Allow authenticated users to update bookings (for confirming)
CREATE POLICY "Allow authenticated update"
ON public.bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete bookings
CREATE POLICY "Allow authenticated delete"
ON public.bookings
FOR DELETE
TO authenticated
USING (true);

-- Allow authenticated users to select bookings
CREATE POLICY "Allow authenticated select"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);