DROP POLICY IF EXISTS "Allow authenticated inserts" ON public.bookings;

CREATE POLICY "Allow authenticated inserts with valid booking data"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (
  name <> ''
  AND phone <> ''
  AND email <> ''
  AND speaker_count >= 1
  AND speaker_count <= 2
  AND total_price >= 0
  AND (date_to IS NULL OR date_to >= date_from)
);