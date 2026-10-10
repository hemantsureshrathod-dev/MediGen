import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Layers, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  ArrowRight, 
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Header Title */}
        <div className="space-y-3 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Academic Field Project • Semester 3</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About MediGen & System Methodology
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            AI-Powered Generic Medicine Substitution & Price Transparency Advisor — designed to address out-of-pocket healthcare expenses in India through structured decision support.
          </p>
        </div>

        {/* 1. Problem Context */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <h2>The Core Healthcare Challenge</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            In India, out-of-pocket pharmaceutical expenses constitute a significant share of household healthcare expenditure. Patients are frequently prescribed branded medicines even when lower-cost generic alternatives containing the exact same active salt are available at a fraction of the price.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <strong className="text-slate-900 font-semibold block">The Deeper Challenge:</strong>
            <p>
              The obstacle is not merely that patients cannot compare prices. Patients often do not know whether a cheaper generic alternative legitimately corresponds to their prescribed medicine, where they can find it in their neighborhood, or what clinical nuances (release mechanism, bioequivalence, contraindications) require professional review.
            </p>
            <p>
              While the Government of India's <strong>Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)</strong> provides high-quality generics at 50% to 90% savings, local discoverability, stock awareness, and patient confidence remain persistent hurdles.
            </p>
          </div>
        </section>

        {/* 2. Conceptual Workflow: SCAN -> MATCH -> COMPARE -> VERIFY -> LOCATE */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-soft">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Layers className="w-5 h-5 text-teal-600" />
            <h2>The MediGen 5-Stage Architecture</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-black text-slate-400 block">01</span>
              <strong className="text-sm font-bold text-slate-900 block my-1">SCAN</strong>
              <p className="text-[11px] text-slate-500">Image acquisition and clinical entity recognition.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-center">
              <span className="text-xs font-black text-teal-600 block">02</span>
              <strong className="text-sm font-bold text-teal-950 block my-1">MATCH</strong>
              <p className="text-[11px] text-teal-700">Rule-based chemical & strength equivalence mapping.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xs font-black text-blue-600 block">03</span>
              <strong className="text-sm font-bold text-blue-950 block my-1">COMPARE</strong>
              <p className="text-[11px] text-blue-700">Multi-pharmacy price and savings transparency.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs font-black text-amber-600 block">04</span>
              <strong className="text-sm font-bold text-amber-950 block my-1">VERIFY</strong>
              <p className="text-[11px] text-amber-800">Mandatory clinician checklist & safety safeguards.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-black text-emerald-600 block">05</span>
              <strong className="text-sm font-bold text-emerald-950 block my-1">LOCATE</strong>
              <p className="text-[11px] text-emerald-800">Physical store & Jan Aushadhi Kendra discovery.</p>
            </div>

          </div>
        </section>

        {/* 3. Safety Principles */}
        <section id="disclaimer" className="bg-amber-50/70 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <h2>Core Safety Doctrine</h2>
          </div>

          <p className="text-sm text-amber-950 leading-relaxed font-medium">
            MediGen is strictly an informational decision-support advisor. It is deliberately designed to NEVER present itself as replacing a doctor or pharmacist.
          </p>

          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>No Autonomous Substitution:</strong> MediGen provides data to empower patient-pharmacist discussions; it does not authorize drug switches.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>No Disease Diagnosis:</strong> The platform does not diagnose clinical conditions or alter medical treatment plans.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>No LLM Hallucinations:</strong> Equivalence mappings are strictly governed by structured Indian Pharmacopoeia taxonomies, not ungrounded text generation.</span>
            </li>
          </ul>
        </section>

        {/* 4. Prototype Limitations */}
        <section id="limitations" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <FileCheck className="w-5 h-5 text-teal-600" />
            <h2>Prototype Specifications & Evaluation Limitations</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This application is an academic proof-of-concept prototype built for Semester 3 evaluation. The following technical elements are deliberately simulated to ensure 100% offline reliability without dependence on paid third-party APIs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-800 block mb-1">Simulated Dataset:</strong>
              <span className="text-slate-600">
                8 curated common chronic and acute drug records (Atorvastatin, Pantoprazole, Metformin, Amlodipine, Azithromycin, Cetirizine, Paracetamol, Omeprazole) modeled after real PMBJP price points.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-800 block mb-1">Simulated OCR Pipeline:</strong>
              <span className="text-slate-600">
                Simulates real-world OCR latency and optical bounding box recognition using realistic clinical prescription presets.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-800 block mb-1">Vector Map Panel:</strong>
              <span className="text-slate-600">
                Interactive SVG city topology modeled around Kolhapur, Maharashtra with zero paid Google Maps or Mapbox API keys.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-800 block mb-1">Local Storage Cache:</strong>
              <span className="text-slate-600">
                Client-side persistence for recent searches and saved comparison records, requiring no heavy external database.
              </span>
            </div>
          </div>
        </section>

        {/* 5. Future Scope */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-soft">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2>Future Scope for Production Implementation</h2>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <p>• <strong>Integration with Ayushman Bharat Digital Mission (ABDM):</strong> Connect to verified digital health lockers and e-prescriptions.</p>
            <p>• <strong>Direct Jan Aushadhi Portal API:</strong> Real-time inventory syncing with the Bureau of Pharma PSUs of India (BPPI) warehouse data.</p>
            <p>• <strong>Multilingual Accessibility:</strong> Vernacular audio and text support in Hindi, Marathi, Bengali, Tamil, and Kannada.</p>
            <p>• <strong>On-Device Edge OCR:</strong> Edge machine learning models capable of reading noisy handwritten clinical scripts offline.</p>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center pt-4">
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>Test the Complete Demo Flow</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </Link>
        </div>

      </div>
    </div>
  );
};
