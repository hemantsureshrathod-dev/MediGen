-- ==============================================================================
-- Migration 002: Create public.app_feedback table
-- ==============================================================================
-- Description:
--   Adds an optional application-level feedback table for authenticated users.
--   Preserves existing public.profiles and public.saved_searches tables without modification.
--   Enforces explicit Row Level Security (RLS) policies.
--
-- Security Rules:
--   1. Anonymous users are NOT permitted to insert feedback.
--   2. Authenticated users may insert feedback ONLY for their own user_id.
--   3. Authenticated users may read ONLY their own feedback.
--   4. Client UPDATE and DELETE operations are prohibited (no policies granted).
--
-- Execution:
--   Execute this migration in your Supabase Dashboard -> SQL Editor.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.app_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'bug_report', 'feature_request', 'ux_feedback', 'other')),
    message TEXT NOT NULL CHECK (char_length(trim(message)) > 0 AND char_length(message) <= 2000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.app_feedback ENABLE ROW LEVEL SECURITY;

-- Policy 1: Authenticated users can insert feedback for their own user_id only
CREATE POLICY "Authenticated users can insert own feedback"
    ON public.app_feedback
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy 2: Authenticated users can read their own feedback records only
CREATE POLICY "Authenticated users can view own feedback"
    ON public.app_feedback
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Explicitly ensure client cannot update or delete feedback records:
-- (No UPDATE or DELETE policies are defined for authenticated or anon roles)

-- Composite index for efficient querying by user and creation date
CREATE INDEX IF NOT EXISTS idx_app_feedback_user_created 
    ON public.app_feedback (user_id, created_at DESC);

COMMENT ON TABLE public.app_feedback IS 'Application feedback facility for authenticated users; strictly non-clinical data.';

