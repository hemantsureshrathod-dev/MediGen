import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scan, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Scale, 
  ChevronRight,
  TrendingDown,
  Building2
} from 'lucide-react';
import { DEMO_MEDICINES } from '../data/medicines';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-teal-50/40 via-blue-50/20 to-transparent -z-10 pointer-events-none rounded-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Generic Medicine & Price Discovery</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your prescription doesn't have to cost <span className="text-teal-700">more than it should.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                MediGen helps you understand prescribed medicines, explore quality generic alternatives, compare prices across retail pharmacies and Jan Aushadhi outlets, and prepare questions for your doctor.
              </p>

              {/* CTA Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/scan"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-semibold text-base shadow-soft hover:shadow-soft-lg transition-all duration-200 group active:scale-[0.98]"
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

              {/* Quick Demo Selector for Evaluators */}
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Sample Medicines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_MEDICINES.slice(0, 4).map((med) => (
                    <button
                      key={med.id}
                      onClick={() => navigate(`/match/${med.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5 shadow-soft-sm"
                    >
                      <span className="font-semibold text-slate-900">{med.brandName.split('/')[0].trim()}</span>
                      <span className="text-teal-600 font-bold">Save {med.potentialSavingsPercent}%</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Clean Medical Comparison Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-xl p-5 sm:p-6 space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Sample Analysis
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      Generic Equivalence
                    </span>
                  </div>

                  {/* Medicine Row Comparison */}
                  <div className="space-y-2.5">
                    {/* Prescribed */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prescribed Brand</span>
                        <div className="text-sm font-bold text-slate-900">Atorva 10 (Lipitor)</div>
                        <div className="text-xs text-slate-500">Atorvastatin 10 mg</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 line-through">MRP ₹180</span>
                        <span className="text-[11px] text-slate-500 block">Retail MRP</span>
                      </div>
                    </div>

                    {/* Generic Equivalent */}
                    <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Generic Alternative</span>
                        <div className="text-sm font-bold text-teal-950">Atorvastatin IP 10 mg</div>
                        <div className="text-xs text-teal-700">Jan Aushadhi Standard</div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-teal-800">₹72</span>
                        <span className="text-[10px] text-teal-700 block">per strip</span>
                      </div>
                    </div>
                  </div>

                  {/* Savings Callout */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-900">Calculated Difference</span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-800">
                      Save ₹108 (60%)
                    </span>
                  </div>

                  {/* Outlet Availability Note */}
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-0.5">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>PM Jan Aushadhi Kendra</span>
                    </span>
                    <span className="font-semibold text-slate-700">1.8 km away</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/match/atorvastatin-10')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Explore This Medicine</span>
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
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              1. Predefined Generic Matches
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore potential generic alternatives matched on identical active salt, strength, and dosage form.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              2. Price Transparency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Compare illustrative prices across retail pharmacies and government Pradhan Mantri Jan Aushadhi Kendras.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              3. Safety Verification
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Review essential checklist items and clinical questions to discuss with your doctor or pharmacist.
            </p>
          </div>

        </div>
      </section>

      {/* How MediGen Works (5-Step Concept) */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              5-Stage Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              How MediGen Works
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              From prescription review to verified decision support in five seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm">
              <div className="text-xl font-black text-slate-300 mb-2">01</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Scan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload prescription image with simulated OCR or search by medicine name.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm">
              <div className="text-xl font-black text-teal-600 mb-2">02</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Match</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rule-based equivalence check matches active ingredient, form, and strength.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm">
              <div className="text-xl font-black text-blue-600 mb-2">03</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Compare</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Side-by-side price comparison showing potential savings per strip.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm">
              <div className="text-xl font-black text-amber-500 mb-2">04</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Verify</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Educational checklist and guided questions to confirm with your pharmacist.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-soft-sm">
              <div className="text-xl font-black text-emerald-600 mb-2">05</div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Locate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore nearby Jan Aushadhi and pharmacy outlets on the simulated map.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why MediGen (Affordability, Transparency, Discoverability, Safety) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Core Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Why MediGen Matters
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Addressing critical healthcare challenges faced by Indian patients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Affordability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Illustrates how generic medicines can lower out-of-pocket costs by 50% to 80% based on sample PMBJP pricing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm">
              👁
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Transparency</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demystifies prescription salt compositions, making price differences clear and understandable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
              📍
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Discoverability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demonstrates physical store discovery for Jan Aushadhi outlets with simulated local mapping.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              🛡
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Safety First</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Emphasizes professional verification. Always consult a licensed doctor or pharmacist before switching.
            </p>
          </div>

        </div>
      </section>

      {/* Strong Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-medigen-navy rounded-3xl p-8 sm:p-10 text-white shadow-soft-xl relative overflow-hidden text-center sm:text-left">
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Evaluation Ready
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Experience the MediGen Workflow
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Start with a simulated prescription scan or choose from our curated dataset of common medications.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/scan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
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
