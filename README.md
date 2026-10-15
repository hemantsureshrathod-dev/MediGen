# MediGen — AI-Powered Generic Medicine Substitution & Price Transparency Advisor

> **Smarter choices. Better transparency.**  
> *Understand your prescription. Compare your options. Verify before you switch.*

---

## 📌 Project Overview & Academic Context
- **Project Title:** MediGen (AI-Powered Generic Medicine Substitution & Price Transparency Advisor)
- **Academic Context:** Semester 3 Field Project
- **Type:** Interactive Healthcare-Tech Prototype & Usability Demonstration
- **Simulated Region:** Kolhapur, Maharashtra, India

---

## 🏥 Problem Statement
In India, out-of-pocket pharmaceutical expenses constitute a significant share of household healthcare expenditure. Patients are frequently prescribed high-cost branded medicines even when lower-cost generic alternatives containing the identical active chemical salt and strength are available.

The barrier is not merely price comparison:
1. **Prescription-to-Generic Equivalence Knowledge Gap:** Patients often do not know whether a cheaper generic alternative legitimately corresponds to the prescribed branded medicine.
2. **Discoverability of Government Outlets:** The Government of India’s **Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)** provides quality generic medicines at 50% to 90% savings, but physical store discoverability and stock awareness remain low.
3. **Safety & Verification Hesitancy:** Patients need clear, professional verification protocols before safely switching medications with their licensed doctor or pharmacist.

---

## 🎯 Solution & Core 5-Stage Architecture
MediGen solves this through a structured decision-support journey:

```
[01 SCAN]      → Extract medicine name & strength from prescription scan or manual search.
      ↓
[02 MATCH]     → Rule-based pharmacological matching grounded in structured monograph data.
      ↓
[03 COMPARE]   → Side-by-side cost transparency (Branded MRP vs Jan Aushadhi vs Local Pharmacy).
      ↓
[04 VERIFY]    → Patient verification checklist, contraindication checks & pharmacist talking points.
      ↓
[05 LOCATE]    → Interactive map discovery of nearby Jan Aushadhi Kendras and retail pharmacies.
```

---

## 🛡️ Critical Safety Doctrine
> ⚠️ **Important Healthcare Notice:**  
> MediGen is strictly an **informational decision-support tool**.
> - It does **NOT** diagnose diseases.
> - It does **NOT** prescribe medicines.
> - It does **NOT** autonomously authorize medication substitution.
> - The AI and matching logic are **grounded in structured pharmacopeial data** to prevent unsafe hallucinations.
> - **Final confirmation must always come from a qualified doctor or licensed pharmacist.**

---

## 💻 Tech Stack
- **Frontend Framework:** React 19 (TypeScript)
- **Authentication:** Supabase Auth (`@supabase/supabase-js`)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Medical & Health-Tech design system)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Animations & Delight:** Canvas Confetti & Tailwind Transitions
- **Maps:** Custom High-Performance Interactive SVG Vector Map (Zero paid API keys needed, works 100% offline)
- **State & Storage:** LocalStorage Persistence + Supabase Auth Session Management

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Launch Commands
```bash
# 1. Clone or navigate to the repository directory
cd "MediGen Field Project"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev
```

Open your browser at:
```
http://localhost:5174/
```
*(or port 5173 if available)*

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎭 Step-by-Step Live Demo Presentation Guide

For presenting to professors, evaluators, and students:

| Step | Screen | Action / What to Demonstrate |
| :--- | :--- | :--- |
| **Step 1** | **Home (`/`)** | Open the landing page. Point out the clear branding, the **Prototype • Demo Data** indicator, the value proposition, and the 5-stage conceptual workflow. Click **"Check a Medicine"**. |
| **Step 2** | **Scan (`/scan`)** | Click on the **"Cardiology Clinic Prescription"** sample preset. Watch the simulated OCR progress animation (`Enhancing contrast` → `Detecting Rx notation` → `Grounding against IP monographs`). Review the detected medicine card showing **Atorvastatin 10 mg** at **96% confidence**. Click **"Review Medicine"**. |
| **Step 3** | **Analysis (`/medicine/:id`)** | Show the clinical profile (Active ingredient, Strength, Dosage Form, Therapeutic function). Highlight the status badge: *"Potential equivalent — verification required"*. Click **"View Match Details"**. |
| **Step 4** | **Match (`/match/:id`)** | Show the side-by-side card comparison (**Branded Lipitor ₹180** vs **Generic Atorvastatin IP ₹72**). Explain the **60% potential savings (₹108)** and the transparent explanation: *"Both records contain the same active ingredient and listed strength"*. Click **"Compare Local Prices"**. |
| **Step 5** | **Compare (`/compare/:id`)** | Point out the visual price bars and store comparison badges (**BEST VALUE**, **NEAREST**, **LOWEST PRICE**). Show the total savings callout. Click **"Proceed to Safety Checklist"**. |
| **Step 6** | **Verify (`/verify/:id`)** | Emphasize safety: *"MediGen does not tell the patient to switch. It gives them the right questions to ask a doctor or pharmacist."* Demonstrate the interactive checklist and pharmacist discussion guide. Click **"Continue to Nearby Stores"**. |
| **Step 7** | **Locate (`/stores/:id`)** | Demonstrate the interactive Kolhapur vector map with pins, route lines, distance badges, and filters. Click on **Pradhan Mantri Jan Aushadhi Kendra** to open the **Store Detail Modal**. Show directions preview. Click **"Confirm Store & View Summary"**. |
| **Step 8** | **Summary (`/summary/:id`)** | View the celebratory completion summary with savings breakdown. Click **"Save Result to My Searches"** and test **"Print / Download Slip"**. |
| **Step 9** | **History (`/history`)** | View the persistent saved searches in localStorage. Demonstrate viewing past records and clearing/restoring the cache. |
| **Step 10** | **About (`/about`)** | Conclude by showing the academic methodology, prototype boundaries, and future roadmap. |

---

## 🔬 Dataset & Simulation Details
The prototype includes 8 carefully structured records representing common chronic and acute therapeutic categories:
1. **Atorvastatin 10 mg** (Lipitor / Atorva) — *Cardiovascular / Statins* (Save ~60%)
2. **Pantoprazole 40 mg** (Pan 40 / Pantocid) — *Gastrointestinal / PPI* (Save ~62%)
3. **Metformin 500 mg** (Glycomet / Glucophage) — *Endocrinology / Anti-diabetic* (Save ~66%)
4. **Amlodipine 5 mg** (Amlong / Norvasc) — *Cardiovascular / Calcium Channel Blocker* (Save ~71%)
5. **Azithromycin 500 mg** (Azithral / Zithromax) — *Antibiotics / Macrolide* (Save ~61%)
6. **Cetirizine 10 mg** (Cetzine / Zyrtec) — *Allergy / Antihistamine* (Save ~75%)
7. **Paracetamol 500 mg** (Crocin / Calpol) — *Analgesics & Antipyretics* (Save ~71%)
8. **Omeprazole 20 mg** (Omez / Prilosec) — *Gastrointestinal / PPI* (Save ~67%)

---

## 📋 Prototype Limitations (Academic Context)
- **Simulated OCR:** Latency and text extraction are simulated using realistic clinical presets to allow offline evaluation without requiring external OCR endpoints.
- **Simulated Pricing:** Retail MRP and Jan Aushadhi prices are modeled on standard public benchmark averages and labeled as *Demo Data*.
- **Simulated GPS & Map:** Map topology represents Kolhapur, Maharashtra rendered via an optimized SVG vector engine with zero third-party map keys.

---

## 🔮 Future Scope for Production
1. **Ayushman Bharat Digital Mission (ABDM) Integration:** Direct interoperability with National Health Authority (NHA) health record exchange.
2. **Real-time PMBJP Warehouse Inventory Sync:** Integration with the Bureau of Pharma PSUs of India (BPPI) API.
3. **Multilingual Vernacular Interface:** Voice and text support in Hindi, Marathi, Kannada, Tamil, etc.
4. **On-Device Edge OCR:** Machine learning models running on mobile edge devices for handwriting recognition of handwritten doctor scripts.

---

## 🔐 Supabase Authentication Integration & Setup

MediGen supports real email/password authentication backed by Supabase Auth with persistent browser sessions.

### 1. Environment Configuration
Create a `.env.local` file in the project root:
```bash
# Supabase Project Endpoint
VITE_SUPABASE_URL=https://ssdoatwllkkqwrmdpqka.supabase.co

# Supabase Publishable / Anon Key (From Project Settings -> API)
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key-here
```

> **Note:** `.env.local` is explicitly ignored in `.gitignore`. Never commit or expose your secret or `service_role` keys.

### 2. Required Supabase Dashboard Settings
In your [Supabase Project Dashboard](https://supabase.com/dashboard/project/ssdoatwllkkqwrmdpqka):
1. **Authentication -> Providers -> Email:**
   - Ensure the **Email** provider is toggled **ON**.
   - Optional: Toggle *"Confirm email"* on or off depending on whether you want users to verify their email before sign-in. MediGen handles both modes gracefully!
2. **Authentication -> URL Configuration:**
   - **Site URL:** `http://localhost:5173` (or `http://localhost:5174`)
   - **Redirect URLs:** Add `http://localhost:5173/**` and `http://localhost:5174/**`

---

## 🗄️ Database Security & Proposed PostgreSQL Migration

> ⚠️ **Security Doctrine:** Frontend authentication alone does **NOT** secure database tables. In Supabase, database security requires PostgreSQL **Row Level Security (RLS)** policies ensuring users can only read and write their own records.

If you choose to sync saved prescription searches to Supabase PostgreSQL in the future, apply this migration:

```sql
-- 1. Create user-owned saved searches table
CREATE TABLE IF NOT EXISTS public.user_saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    medicine_id TEXT NOT NULL,
    medicine_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    generic_name TEXT NOT NULL,
    potential_savings NUMERIC NOT NULL,
    savings_percent NUMERIC NOT NULL,
    best_store TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_saved_searches ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can only view their own saved searches
CREATE POLICY "Users can view own saved searches"
ON public.user_saved_searches
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4. Policy: Users can only insert searches for themselves
CREATE POLICY "Users can insert own saved searches"
ON public.user_saved_searches
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Users can only delete their own saved searches
CREATE POLICY "Users can delete own saved searches"
ON public.user_saved_searches
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

---

## 📄 License & Credits
Built for **Semester 3 Field Project**. Designed and developed for academic demonstration and health-tech research.
