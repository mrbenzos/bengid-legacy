-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Materials table
CREATE TABLE materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    unit TEXT DEFAULT 'per roll',
    image_url TEXT,
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Cars table
CREATE TABLE cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    model_name TEXT NOT NULL,
    year INTEGER,
    price NUMERIC(10,2),
    image_url TEXT,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Leads table
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    division TEXT NOT NULL CHECK (division IN ('printing', 'automobile', 'contracts')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Activity Logs table
CREATE TABLE activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    action TEXT NOT NULL,
    item_type TEXT,
    item_name TEXT,
    "user" TEXT DEFAULT 'Admin',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- OTP Codes table
CREATE TABLE otp_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read on materials" ON materials FOR SELECT TO public USING (true);
CREATE POLICY "Public read on cars" ON cars FOR SELECT TO public USING (true);

-- Public lead creation (Contact form)
CREATE POLICY "Public insert on leads" ON leads FOR INSERT TO public WITH CHECK (true);

-- Authenticated full access
CREATE POLICY "Authenticated full access on materials" ON materials TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access on cars" ON cars TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access on leads" ON leads TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access on activity_logs" ON activity_logs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access on otp_codes" ON otp_codes TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket creation for 'images'
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public viewing of images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'images');
CREATE POLICY "Authenticated upload to images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
CREATE POLICY "Authenticated delete from images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');
CREATE POLICY "Authenticated update of images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images');
