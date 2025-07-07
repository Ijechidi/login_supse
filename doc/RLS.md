-- Règles RLS pour le bucket avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.uid()::text = (storage.foldername(name))[1]
  AND bucket_id = 'avatars'
);

CREATE POLICY "Anyone can view avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');


CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
USING (
  auth.uid()::text = (storage.foldername(name))[1]
  AND bucket_id = 'avatars'
);