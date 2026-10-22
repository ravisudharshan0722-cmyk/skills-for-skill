-- =========================================================
-- TEACHING ELIGIBILITY TEST: ADDITIVE DATABASE MIGRATION
-- =========================================================
-- Safe, additive migration for the AI Teaching Eligibility Test feature.
-- Run this in Supabase SQL Editor.
-- Does NOT modify, drop, or alter existing tables or rows.

-- 1. Table: Teaching Readiness Tracking (Per user, per programming language)
CREATE TABLE IF NOT EXISTS public.teaching_readiness (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    willing_to_teach BOOLEAN DEFAULT false,
    ready_for_test BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_language_readiness UNIQUE (user_id, language)
);

-- 2. Table: Teaching Assessment Attempts (Full attempt history, scoring & answers)
CREATE TABLE IF NOT EXISTS public.teaching_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('basics', 'medium', 'advanced')),
    status TEXT NOT NULL DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed', 'abandoned')),
    questions_data JSONB NOT NULL,
    answers_data JSONB DEFAULT '{}'::jsonb,
    mcq_score NUMERIC(5,2) DEFAULT 0,
    coding_score NUMERIC(5,2) DEFAULT 0,
    teaching_score NUMERIC(5,2) DEFAULT 0,
    total_score NUMERIC(5,2) DEFAULT 0,
    percentage NUMERIC(5,2) DEFAULT 0,
    passed BOOLEAN DEFAULT false,
    ai_feedback JSONB DEFAULT '{}'::jsonb,
    time_taken_seconds INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE
);

-- 3. Table: Verified Teaching Eligibility (Awarded ONLY on confirmed backend passing result)
CREATE TABLE IF NOT EXISTS public.verified_teaching_eligibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('basics', 'medium', 'advanced')),
    assessment_id UUID REFERENCES public.teaching_assessments(id) ON DELETE SET NULL,
    score NUMERIC(5,2) NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_language_level_verified UNIQUE (user_id, language, level)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teaching_readiness_user ON public.teaching_readiness(user_id);
CREATE INDEX IF NOT EXISTS idx_teaching_assessments_user ON public.teaching_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_verified_eligibility_user ON public.verified_teaching_eligibility(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teaching_readiness ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teaching_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_teaching_eligibility ENABLE ROW LEVEL SECURITY;

-- RLS Policies: teaching_readiness
DROP POLICY IF EXISTS "Users can view own readiness" ON public.teaching_readiness;
CREATE POLICY "Users can view own readiness"
    ON public.teaching_readiness FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own readiness" ON public.teaching_readiness;
CREATE POLICY "Users can insert own readiness"
    ON public.teaching_readiness FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own readiness" ON public.teaching_readiness;
CREATE POLICY "Users can update own readiness"
    ON public.teaching_readiness FOR UPDATE
    USING (auth.uid() = user_id);

-- RLS Policies: teaching_assessments
DROP POLICY IF EXISTS "Users can view own assessments" ON public.teaching_assessments;
CREATE POLICY "Users can view own assessments"
    ON public.teaching_assessments FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assessments" ON public.teaching_assessments;
CREATE POLICY "Users can insert own assessments"
    ON public.teaching_assessments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own assessments" ON public.teaching_assessments;
CREATE POLICY "Users can update own assessments"
    ON public.teaching_assessments FOR UPDATE
    USING (auth.uid() = user_id);

-- RLS Policies: verified_teaching_eligibility
-- Anyone (authenticated or public) can view verified teaching eligibility to see badges on user profiles
DROP POLICY IF EXISTS "Public can view verified eligibility" ON public.verified_teaching_eligibility;
CREATE POLICY "Public can view verified eligibility"
    ON public.verified_teaching_eligibility FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Users cannot manually forge verified eligibility" ON public.verified_teaching_eligibility;
CREATE POLICY "Users cannot manually forge verified eligibility"
    ON public.verified_teaching_eligibility FOR INSERT
    WITH CHECK (auth.uid() = user_id);
