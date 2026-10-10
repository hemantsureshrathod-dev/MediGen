import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scan, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Scale, 
  Building2, 
  ChevronRight
} from 'lucide-react';
import { DEMO_MEDICINES } from '../data/medicines';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-50/50 via-blue-50/30 to-transparent -z-10 pointer-events-none rounded-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>AI-Assisted Equivalence & Price Transparency</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-slate-600 font-normal">Semester 3 Field Prototype</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your prescription doesn't have to cost <span className="text-teal-700 underline decoration-teal-300 decoration-wavy decoration-2">more than it should.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                MediGen helps you understand prescribed medicines, discover potential generic alternatives, compare prices across pharmacies and Jan Aushadhi outlets, and find nearby availability — <strong className="text-slate-800 font-semibold">with professional verification built into the process.</strong>
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/scan"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-semibold text-base shadow-soft-lg hover:shadow-soft-xl transition-all duration-200 group active:scale-[0.98]"
                >
                  <Scan className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform" />
                  <span>Check a Medicine</span>
                  <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base shadow-soft-sm transition-colors"
                >
                  <span>How It Works</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Safety notice micro-strip */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Decision-support only. Final substitution requires pharmacist or doctor confirmation.</span>
              </div>

              {/* Quick Demo Selector for Evaluators */}
              <div className="pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  ⚡ Quick Demo Presets (Instant Click-to-Test):
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_MEDICINES.slice(0, 4).map((med) => (
                    <button
                      key={med.id}
                      onClick={() => navigate(`/match/${med.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 text-xs font-medium text-slate-700 transition-all flex items-center gap-1.5 shadow-soft-sm"
                    >
                      <span className="font-semibold text-slate-900">{med.brandName.split('/')[0].trim()}</span>
                      <span className="text-teal-600 font-bold">Save {med.potentialSavingsPercent}%</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Clean Medical-Tech Product Journey Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative glow backdrop */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-70 -z-10" />

                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-xl p-5 sm:p-6 space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Live Prototype Flow
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      Step Preview
                    </span>
                  </div>

                  {/* Flow Step 1: Prescription Detected */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        Rx
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Atorvastatin 10 mg</div>
                        <div className="text-[11px] text-slate-500">Prescribed Branded (Lipitor) • ₹180</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      OCR 96%
                    </span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-teal-600">
                    <span className="text-xs font-semibold">↓ Verified Chemical Equivalence</span>
                  </div>

                  {/* Flow Step 2: Generic Match Found */}
                  <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                        GEN
                      </div>
                      <div>
                        <div className="text-xs font-bold text-teal-950">Atorvastatin IP 10 mg</div>
                        <div className="text-[11px] text-teal-700">Generic Equivalent Match</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-1 rounded-md border border-emerald-200 shadow-sm block">
                        ₹72 / strip
                      </span>
                    </div>
                  </div>

                  {/* Savings Comparison Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-emerald-100 font-medium uppercase tracking-wider block">
                          Potential Difference
                        </span>
                        <div className="text-2xl font-black mt-0.5">Save ₹108 (60%)</div>
                      </div>
                      <div className="text-right text-[11px] bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        Sample demo pricing
                      </div>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-white h-full rounded-full w-3/5" />
                    </div>
                  </div>

                  {/* Flow Step 3: Nearby Jan Aushadhi Outlet */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">Jan Aushadhi Kendra</div>
                        <div className="text-[11px] text-slate-500">1.8 km away • Kolhapur</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      In Stock
                    </span>
                  </div>

                  {/* Try Demo Button inside card */}
                  <button
                    onClick={() => navigate('/match/atorvastatin-10')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Run Interactive Atorvastatin Walkthrough</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              1. Verified Generic Matches
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Identify potential generic equivalents using structured medicine data, matching active ingredients, dosage forms, and pharmacopeial standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              2. Price Transparency
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Compare sample prices across retail pharmacies and government Pradhan Mantri Jan Aushadhi Kendras to uncover transparent cost savings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              3. Safety First
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every result includes a clear professional verification reminder. Empower patients with informed questions to ask their licensed doctor or pharmacist.
            </p>
          </div>

        </div>
      </section>

      {/* How MediGen Works (5-Step Concept) */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              The 5-Stage Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              How MediGen Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From prescription to verified decision support in five seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm relative">
              <div className="text-2xl font-black text-slate-300 mb-2">01</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Scan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload prescription image or enter medicine manually with autocomplete.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm relative">
              <div className="text-2xl font-black text-teal-600 mb-2">02</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Match</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rule-based equivalence reasoning maps active salts and dosages.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm relative">
              <div className="text-2xl font-black text-blue-600 mb-2">03</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Compare</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Side-by-side cost analysis comparing branded vs generic MRP.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm relative">
              <div className="text-2xl font-black text-amber-500 mb-2">04</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Verify</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Critical safety checklist and clinical questions for the pharmacist.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm relative">
              <div className="text-2xl font-black text-emerald-600 mb-2">05</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Locate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover nearby Jan Aushadhi and pharmacy outlets on the map.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why MediGen (Affordability, Transparency, Discoverability, Safety) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Core Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Why MediGen Matters
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Addressing critical systemic healthcare challenges faced by Indian families.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <h4 className="font-bold text-slate-900 text-base">Affordability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reduces chronic out-of-pocket medical expenditure by identifying quality generic alternatives that cost 50% to 80% less.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-blue-800 flex items-center justify-center font-bold text-sm">
              👁
            </div>
            <h4 className="font-bold text-slate-900 text-base">Transparency</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demystifies prescription salt compositions, eliminating asymmetric pricing knowledge between pharmaceutical sellers and buyers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-sm">
              📍
            </div>
            <h4 className="font-bold text-slate-900 text-base">Discoverability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bridges the awareness gap for government Jan Aushadhi outlets, making it straightforward to find physical inventory nearby.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center font-bold text-sm">
              🛡
            </div>
            <h4 className="font-bold text-slate-900 text-base">Safety First</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enforces a strict human-in-the-loop medical verification doctrine. Never automates medication changes without pharmacist sign-off.
            </p>
          </div>

        </div>
      </section>

      {/* Strong Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-medigen-navy via-slate-900 to-medigen-navyLight rounded-3xl p-8 sm:p-12 text-white shadow-soft-xl relative overflow-hidden text-center sm:text-left">
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Ready for evaluation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Experience the MediGen Workflow Now
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Start with a sample prescription scan or pick from our curated dataset of chronic and acute medications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/scan"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
              >
                <Scan className="w-4 h-4" />
                <span>Check Your Medicine</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
