-- Location: supabase/migrations/20250728194350_ideaflow_complete_system.sql
-- Schema Analysis: Fresh project - creating complete IdeaFlow system
-- Integration Type: Complete new schema implementation
-- Dependencies: New system with authentication and business tables

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('founder', 'user');
CREATE TYPE public.idea_status AS ENUM ('draft', 'submitted', 'under_review', 'validated', 'rejected');
CREATE TYPE public.validation_status AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE public.evidence_type AS ENUM ('interview', 'survey', 'research', 'presales');
CREATE TYPE public.confidence_level AS ENUM ('red', 'yellow', 'green');

-- 2. Core Tables
-- User profiles table (intermediary for auth relationships)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    avatar_url TEXT,
    company_name TEXT,
    phone TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Ideas table
CREATE TABLE public.ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    problem_description TEXT NOT NULL,
    solution_description TEXT NOT NULL,
    target_market TEXT NOT NULL,
    buyer_persona JSONB DEFAULT '{}'::jsonb,
    status public.idea_status DEFAULT 'draft'::public.idea_status,
    confidence_score INTEGER DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    confidence_level public.confidence_level DEFAULT 'red'::public.confidence_level,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Evidence collection table
CREATE TABLE public.evidence_collection (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    evidence_type public.evidence_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    data JSONB DEFAULT '{}'::jsonb,
    validation_score INTEGER DEFAULT 0 CHECK (validation_score >= 0 AND validation_score <= 100),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Task phases and steps for MVP roadmap
CREATE TABLE public.task_phases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    phase_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.task_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id UUID REFERENCES public.task_phases(id) ON DELETE CASCADE,
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resources JSONB DEFAULT '[]'::jsonb,
    is_completed BOOLEAN DEFAULT false,
    step_order INTEGER NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- System analytics for founder dashboard
CREATE TABLE public.system_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_users INTEGER DEFAULT 0,
    total_ideas INTEGER DEFAULT 0,
    validated_ideas INTEGER DEFAULT 0,
    active_users_last_30_days INTEGER DEFAULT 0,
    average_confidence_score NUMERIC(5,2) DEFAULT 0.00,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_ideas_user_id ON public.ideas(user_id);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_ideas_confidence_level ON public.ideas(confidence_level);
CREATE INDEX idx_evidence_collection_idea_id ON public.evidence_collection(idea_id);
CREATE INDEX idx_evidence_collection_user_id ON public.evidence_collection(user_id);
CREATE INDEX idx_evidence_collection_type ON public.evidence_collection(evidence_type);
CREATE INDEX idx_task_steps_idea_id ON public.task_steps(idea_id);
CREATE INDEX idx_task_steps_user_id ON public.task_steps(user_id);
CREATE INDEX idx_task_steps_phase_id ON public.task_steps(phase_id);

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_analytics ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions
CREATE OR REPLACE FUNCTION public.is_founder()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'founder'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.owns_idea(idea_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.ideas i
    WHERE i.id = idea_uuid AND i.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_evidence(evidence_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.evidence_collection ec
    WHERE ec.id = evidence_uuid AND (
        ec.user_id = auth.uid() OR 
        public.is_founder()
    )
)
$$;

-- Automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- Update analytics function
CREATE OR REPLACE FUNCTION public.update_system_analytics()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    total_users_count INTEGER;
    total_ideas_count INTEGER;
    validated_ideas_count INTEGER;
    active_users_count INTEGER;
    avg_confidence NUMERIC(5,2);
BEGIN
    -- Calculate metrics
    SELECT COUNT(*) INTO total_users_count FROM public.user_profiles WHERE role = 'user'::public.user_role;
    SELECT COUNT(*) INTO total_ideas_count FROM public.ideas;
    SELECT COUNT(*) INTO validated_ideas_count FROM public.ideas WHERE confidence_level = 'green'::public.confidence_level;
    SELECT COUNT(DISTINCT user_id) INTO active_users_count 
    FROM public.ideas 
    WHERE updated_at >= CURRENT_TIMESTAMP - INTERVAL '30 days';
    SELECT COALESCE(AVG(confidence_score), 0) INTO avg_confidence FROM public.ideas;

    -- Update or insert analytics
    INSERT INTO public.system_analytics (
        id, total_users, total_ideas, validated_ideas, 
        active_users_last_30_days, average_confidence_score, updated_at
    ) VALUES (
        gen_random_uuid(), total_users_count, total_ideas_count, validated_ideas_count,
        active_users_count, avg_confidence, CURRENT_TIMESTAMP
    )
    ON CONFLICT (id) DO UPDATE SET
        total_users = EXCLUDED.total_users,
        total_ideas = EXCLUDED.total_ideas,
        validated_ideas = EXCLUDED.validated_ideas,
        active_users_last_30_days = EXCLUDED.active_users_last_30_days,
        average_confidence_score = EXCLUDED.average_confidence_score,
        updated_at = EXCLUDED.updated_at;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. RLS Policies
-- User profiles policies
CREATE POLICY "users_own_profile" ON public.user_profiles 
FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "founders_view_all_profiles" ON public.user_profiles 
FOR SELECT USING (public.is_founder());

-- Ideas policies
CREATE POLICY "users_manage_own_ideas" ON public.ideas 
FOR ALL USING (public.owns_idea(id)) WITH CHECK (public.owns_idea(id));

CREATE POLICY "founders_view_all_ideas" ON public.ideas 
FOR SELECT USING (public.is_founder());

-- Evidence collection policies
CREATE POLICY "users_manage_own_evidence" ON public.evidence_collection 
FOR ALL USING (public.can_access_evidence(id)) WITH CHECK (public.can_access_evidence(id));

-- Task phases policies (public read, founder write)
CREATE POLICY "public_view_task_phases" ON public.task_phases 
FOR SELECT TO public USING (true);

CREATE POLICY "founders_manage_task_phases" ON public.task_phases 
FOR ALL USING (public.is_founder()) WITH CHECK (public.is_founder());

-- Task steps policies
CREATE POLICY "users_manage_own_task_steps" ON public.task_steps 
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "founders_view_all_task_steps" ON public.task_steps 
FOR SELECT USING (public.is_founder());

-- System analytics policies
CREATE POLICY "founders_view_analytics" ON public.system_analytics 
FOR SELECT USING (public.is_founder());

-- 7. Initial Data
-- Insert default task phases
INSERT INTO public.task_phases (name, description, phase_order) VALUES
('Definición de Solución', 'Define las funcionalidades esenciales de tu MVP', 1),
('Diseño y Prototipado', 'Crea wireframes y prototipos básicos', 2),
('Desarrollo del MVP', 'Implementa tu producto mínimo viable', 3),
('Preparación para Lanzamiento', 'Prepara marketing y estrategia de lanzamiento', 4),
('Adquisición de Early Adopters', 'Estrategias para primeros usuarios', 5),
('Lanzamiento', 'Ejecuta el lanzamiento de tu MVP', 6),
('Recolección de Feedback', 'Analiza feedback post-lanzamiento', 7);

-- 8. Complete Mock Data
DO $$
DECLARE
    founder_uuid UUID := gen_random_uuid();
    user1_uuid UUID := gen_random_uuid();
    user2_uuid UUID := gen_random_uuid();
    idea1_uuid UUID := gen_random_uuid();
    idea2_uuid UUID := gen_random_uuid();
    phase1_uuid UUID;
    phase2_uuid UUID;
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (founder_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'fundador@ideaflow.com', crypt('Fundador2024!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin Fundador", "role": "founder"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'emprendedor@ideaflow.com', crypt('Emprender2024!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "María González", "role": "user"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'usuario@ideaflow.com', crypt('Usuario2024!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Carlos Mendoza", "role": "user"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample ideas
    INSERT INTO public.ideas (id, user_id, title, problem_description, solution_description, target_market, confidence_score, confidence_level) VALUES
        (idea1_uuid, user1_uuid, 'Plataforma de Gestión Sostenible', 
         'Las empresas tienen dificultades para medir y mejorar su impacto ambiental de manera sistemática.',
         'Una plataforma SaaS que permite a las empresas monitorear, medir y optimizar su huella de carbono mediante inteligencia artificial.',
         'Empresas medianas y grandes con 50-500 empleados que buscan certificaciones de sostenibilidad.',
         65, 'yellow'::public.confidence_level),
        (idea2_uuid, user2_uuid, 'App de Educación Personalizada',
         'Los estudiantes tienen diferentes estilos de aprendizaje pero las plataformas educativas usan un enfoque único.',
         'Una aplicación móvil que adapta el contenido educativo según el estilo de aprendizaje de cada estudiante usando IA.',
         'Estudiantes universitarios y de preparatoria entre 16-25 años.',
         45, 'red'::public.confidence_level);

    -- Get phase UUIDs for task steps
    SELECT id INTO phase1_uuid FROM public.task_phases WHERE phase_order = 1;
    SELECT id INTO phase2_uuid FROM public.task_phases WHERE phase_order = 2;

    -- Create sample evidence
    INSERT INTO public.evidence_collection (idea_id, user_id, evidence_type, title, description, validation_score, data) VALUES
        (idea1_uuid, user1_uuid, 'interview'::public.evidence_type, 'Entrevistas con CTOs', 
         'Entrevistas con 8 CTOs de empresas medianas sobre desafíos de sostenibilidad', 75,
         '{"interviews": 8, "key_insights": ["Falta de herramientas integradas", "Dificultad para medir ROI"], "pain_points": ["Datos dispersos", "Reportes manuales"]}'::jsonb),
        (idea1_uuid, user1_uuid, 'survey'::public.evidence_type, 'Encuesta de Mercado B2B',
         'Encuesta a 127 empresas sobre necesidades de sostenibilidad', 68,
         '{"responses": 127, "conversion_rate": "12%", "willing_to_pay": "78%"}'::jsonb),
        (idea2_uuid, user2_uuid, 'research'::public.evidence_type, 'Análisis de Mercado EdTech',
         'Investigación secundaria sobre tendencias en educación personalizada', 55,
         '{"market_size": "$6.2B", "growth_rate": "15%", "competitors": 12}'::jsonb);

    -- Create sample task steps
    INSERT INTO public.task_steps (phase_id, idea_id, user_id, title, description, step_order, is_completed) VALUES
        (phase1_uuid, idea1_uuid, user1_uuid, 'Definir funcionalidades core del MVP', 
         'Lista las 3-5 funcionalidades esenciales que debe tener tu MVP para validar la propuesta de valor principal', 1, true),
        (phase1_uuid, idea1_uuid, user1_uuid, 'Crear user stories detalladas',
         'Escribe user stories para cada funcionalidad core desde la perspectiva del usuario final', 2, false),
        (phase2_uuid, idea1_uuid, user1_uuid, 'Diseñar wireframes principales',
         'Crea wireframes de las pantallas más importantes de tu aplicación', 1, false);

    -- Update system analytics
    PERFORM public.update_system_analytics();

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error during mock data creation: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error during mock data creation: %', SQLERRM; 
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error during mock data creation: %', SQLERRM;
END $$;