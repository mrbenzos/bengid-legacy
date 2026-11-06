-- ============================================================
-- Bengid Legacy Ghana Limited
-- Visitor Analytics — Supabase Migration
-- Run this once in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dcgsvkalifqonjojfwlc/sql
-- ============================================================

-- 1. Create the page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id           BIGSERIAL PRIMARY KEY,
  page         TEXT NOT NULL DEFAULT '/',
  visitor_id   TEXT NOT NULL DEFAULT 'anonymous',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Index for fast date-range queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views (page);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 4. Policy: service-role key (admin API) can do everything
CREATE POLICY "service_role_all" ON page_views
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Policy: anyone (anon) can INSERT (to record visits)
CREATE POLICY "public_insert" ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================================
-- Done! The admin API uses the service role key so it can
-- read all rows. The client-side tracker uses the anon key
-- so it can only INSERT, never read.
-- ============================================================
