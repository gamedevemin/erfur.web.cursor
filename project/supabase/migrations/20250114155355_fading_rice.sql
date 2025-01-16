-- DIALECT: PostgreSQL
-- SUPABASE MIGRATION

/*
  # Mesajlaşma Sistemi Şeması

  1. Yeni Tablolar
    - `messages`
      - `id` (uuid, primary key)
      - `conversation_id` (text)
      - `text` (text)
      - `sender` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. Güvenlik
    - RLS aktif
    - Mesajları okuma ve yazma politikaları
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text NOT NULL,
  text text NOT NULL,
  sender text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Mesaj okuma politikası
CREATE POLICY "Anyone can read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Mesaj yazma politikası
CREATE POLICY "Users can insert messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);