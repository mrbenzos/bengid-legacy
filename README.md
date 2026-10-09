# BENGID LEGACY GHANA LTD — Web Platform

> **"Home of Quality Digital Printing Materials"**

Full-stack web application built for **BENGID LEGACY GHANA LTD** focusing on premium digital printing materials in Ghana, with automobile and contract divisions, WhatsApp ordering, a secure 2FA admin portal, and Hubtel SMS real-time alerts.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom brand colors: `#1e3a5f` professional blue, `#f57c20` orange accent, white)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with RLS, Storage, Auth, Edge Functions)
- **SMS & 2FA**: [Hubtel SMS API](https://hubtel.com/) (Sender ID: `BENGID`)
- **Deployment**: Vercel ready

---

## 📁 Site Architecture (5 Public Pages + Admin)

### Public Pages
1. **`/` (Homepage)**: Hero banner with tagline & *"Shop Materials"* CTA, Featured Materials grid (6 items), *"Why Choose Us"* value propositions, Divisions teaser (*Automobile* & *Contracts*), and floating WhatsApp ordering button.
2. **`/materials`**: Complete digital printing materials catalogue with live search, category filter (*Flex, Banner, Vinyl, Sticker, Tarpaulin, Canvas, One-Way-Vision, Backlit, Mesh, Other*), pricing in GHS, stock status indicators, and one-click WhatsApp ordering.
3. **`/automobiles`**: Automobile division inventory with filter by status (*All, Available, Sold*), pricing, and WhatsApp inquiry buttons.
4. **`/about`**: Company story, mission, vision, and divisions overview.
5. **`/contact`**: Lead generation form submitting directly to the `leads` table and triggering owner SMS alerts, with direct phone, email, and WhatsApp contact options.

### Admin Portal (`/admin`)
- **`/admin/login` & `/admin/verify`**: Two-factor authentication (2FA). Validates credentials, generates a 6-digit OTP stored in `otp_codes` (5-minute expiry), and dispatches SMS via Hubtel API:  
  `"Your Bengid login code is {code}. Valid for 5 mins. - BENGID"`.
- **`/admin` (Dashboard)**: Real-time statistics (total materials, available cars, new leads in past 7 days) and recent activity log.
- **`/admin/materials`**: Full CRUD for digital printing materials, file uploads to Supabase Storage `images` bucket, and stock status toggles.
- **`/admin/cars`**: Automobile inventory CRUD with quick *"Mark as Sold"* action.
- **`/admin/leads`**: Tabbed inbox separated by division (*All, Printing, Automobile, Contracts*) with caller action links.
- **`/admin/activity`**: Filterable audit trail of all actions and automated alerts.

---

## 🔔 Alert System

Real-time alert notifications are triggered across the application on:
- Material price modified
- Material deleted
- Car marked as **SOLD**
- Car deleted
- Car model name modified
- New lead submitted from contact form

### Alert Message Format:
```
ALERT: Toyota Yaris 2018 marked as SOLD by Admin at 2:14pm. Check dashboard. - BENGID
```

Both Next.js server-side dispatch (`src/lib/alerts.ts`) and Supabase Edge Function (`supabase/functions/sendAlertSMS/index.ts`) are provided.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Hubtel SMS Credentials
HUBTEL_CLIENT_ID=your-hubtel-client-id
HUBTEL_CLIENT_SECRET=your-hubtel-client-secret
HUBTEL_SENDER_ID=BENGID

# Administration & Alerts
OWNER_PHONE=233XXXXXXXXX
ADMIN_EMAIL=admin@bengidlegacy.com
ADMIN_PHONE=233XXXXXXXXX

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=233XXXXXXXXX
```

---

## 🗄️ Database Setup (Supabase)

1. Navigate to the SQL Editor in your [Supabase Dashboard](https://app.supabase.com).
2. Run `supabase/schema.sql` to generate:
   - `materials` table
   - `cars` table
   - `leads` table
   - `activity_logs` table
   - `otp_codes` table
   - Row-Level Security (RLS) policies
   - `images` Storage bucket with public access policies
3. Run `supabase/seed.sql` to populate initial materials and vehicles.

### Optional: Deploying Supabase Edge Function
```bash
supabase functions deploy sendAlertSMS --no-verify-jwt
supabase secrets set HUBTEL_CLIENT_ID=xxx HUBTEL_CLIENT_SECRET=xxx HUBTEL_SENDER_ID=BENGID OWNER_PHONE=233XXXXXXXXX
```

---

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the website, or `http://localhost:3000/admin` for the admin portal.

---

## 🚢 Deployment (Vercel)

1. Push this repository to GitHub/GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Add the environment variables from your `.env.local`.
4. Deploy! Next.js 14 App Router automatically optimizes pages and builds API endpoints as serverless functions.
