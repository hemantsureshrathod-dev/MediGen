import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById } from '../data/medicines';
import { ProgressStepper } from '../components/ProgressStepper';
import { 
  ArrowRight, 
  ArrowLeft,
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle
} from 'lucide-react';

export const MedicineAnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const medicine = findMedicineById(id || '');

  if (!medicine) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Medicine Not Found</h2>
        <p className="text-sm text-slate-600">The requested medication ID does not exist in the demo dataset.</p>
        <Link to="/scan" className="inline-block px-4 py-2 bg-medigen-navy text-white text-xs font-semibold rounded-lg">
          Back to Scanner
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper with medicine id */}
      <ProgressStepper currentStep="scan" medicineId={medicine.id} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Back Link & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/scan')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Scan & Search</span>
          </button>

          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Stage 02 Analysis Preview
          </span>
        </div>

        {/* Top Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Medicine Analysis Profile
          </h1>
          <p className="text-sm text-slate-600">
            Structured clinical breakdown of your prescribed medicine and potential equivalence criteria.
          </p>
        </div>

        {/* Section 1: Prescribed Medicine Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Prescribed Medicine Identified
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {medicine.brandName}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-xs">
              {medicine.category}
            </span>
          </div>

          {/* Clinical Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Active Ingredient
              </span>
              <span className="text-sm font-bold text-slate-900">
                {medicine.activeIngredient}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Strength
              </span>
              <span className="text-sm font-bold text-slate-900">
                {medicine.strength}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Dosage Form
              </span>
              <span className="text-sm font-bold text-slate-900">
                {medicine.dosageForm}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Input Source
              </span>
              <span className="text-sm font-bold text-teal-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Prescription scan
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <strong className="text-slate-700 font-semibold">Therapeutic Function: </strong> 
            {medicine.therapeuticUse}
          </p>
        </div>

        {/* Section 2: Potential Generic Alternatives Card */}
        <div className="bg-white rounded-2xl border border-teal-300 shadow-soft-lg p-6 sm:p-7 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Potential Generic Alternative
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {medicine.genericName}
              </h3>
            </div>

            {/* Crucial status pill adhering strictly to safety guidelines */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Potential equivalent — verification required
              </span>
            </div>
          </div>

          {/* AI-Assisted Structured Analysis Box */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                  AI-Assisted Analysis • Grounded in Structured Medicine Data
                </span>
              </div>
              <span className="text-[10px] text-teal-800 font-semibold bg-white px-2 py-0.5 rounded border border-teal-200">
                Rule-based equivalence check
              </span>
            </div>

            <ul className="space-y-2 text-xs text-teal-900">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Identical Active Ingredient:</strong> Both records contain {medicine.activeIngredient} in prototype dataset.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Identical Strength:</strong> Prescribed strength ({medicine.strength}) matches the generic standard.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>Equivalent Dosage Form:</strong> Conforms to {medicine.dosageForm} pharmacopeial standard.</span>
              </li>
            </ul>
          </div>

          {/* Explicit Safety Advisory Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Professional Verification Mandatory</span>
            </div>
            <p className="leading-relaxed">
              Structured data indicates a potential equivalent. <strong className="font-semibold text-amber-950">Confirm with your pharmacist or doctor before making any change.</strong> MediGen does not claim autonomous medical interchangeability.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate(`/match/${medicine.id}`)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-soft transition-all duration-200 group active:scale-[0.98]"
            >
              <span>View Match Details & Potential Savings</span>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
