import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById } from '../data/medicines';
import { ProgressStepper } from '../components/ProgressStepper';
import { 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle, 
  Stethoscope,
  CheckCircle
} from 'lucide-react';

export const SafetyVerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const medicine = findMedicineById(id || '');

  // Interactive Checklist items
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const checklist = [
    { title: 'Verify the active ingredient', desc: `Ensure active salt matches "${medicine?.activeIngredient || 'active chemical salt'}" identically.` },
    { title: 'Verify strength and dosage form', desc: `Match specified strength (${medicine?.strength || 'standard'}) and formulation (${medicine?.dosageForm || 'standard form'}).` },
    { title: 'Confirm suitability with your pharmacist/doctor', desc: 'Discuss your specific medical history, allergies, and therapeutic response before switching.' },
    { title: 'Check patient-specific contraindications and interactions', desc: 'Verify with clinician if concurrent medications could interact with any excipient.' },
    { title: 'Do not change medication solely based on this app', desc: 'MediGen is an informational decision-support advisor, not an autonomous prescribing system.' },
  ];

  if (!medicine) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Medicine Not Found</h2>
        <Link to="/scan" className="inline-block px-4 py-2 bg-medigen-navy text-white text-xs font-semibold rounded-lg">
          Back to Scanner
        </Link>
      </div>
    );
  }

  const acknowledgedCount = Object.values(checkedItems).filter(Boolean).length;
  const allChecked = acknowledgedCount === checklist.length;

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper for Step 4 Verify */}
      <ProgressStepper currentStep="verify" medicineId={medicine.id} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/compare/${medicine.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Price Comparison</span>
          </button>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300">
            Stage 04 • Safety & Verification Checklist
          </span>
        </div>

        {/* Title & Core Safety Advisory */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Before you switch
          </h1>
          <p className="text-sm text-slate-600">
            Professional verification protocol for <strong className="text-slate-800">{medicine.brandName}</strong> → <strong className="text-teal-700">{medicine.genericName}</strong>
          </p>
        </div>

        {/* Dedicated Amber / Teal Professional Warning Card */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-teal-50/50 rounded-2xl border-2 border-amber-300/80 shadow-soft-lg p-6 sm:p-8 space-y-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-amber-950">
                Professional Verification Protocol
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                MediGen provides information to help you discuss lower-cost options with a <strong className="font-bold underline decoration-amber-400">qualified healthcare professional (licensed pharmacist or physician).</strong>
              </p>
            </div>
          </div>

          {/* Critical Warning Callout from clinical dataset */}
          <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Clinical Advisory for {medicine.activeIngredient}: </strong>
              {medicine.safetyNotes.criticalWarning}
            </p>
          </div>

          {/* Interactive Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Patient Verification Checklist (Click to verify each item):
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                allChecked 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {allChecked && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                <span>{acknowledgedCount} of {checklist.length} Acknowledged</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked 
                        ? 'bg-white border-teal-300 shadow-soft-sm' 
                        : 'bg-slate-50/80 border-slate-200 text-slate-500'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0 text-teal-600">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-teal-600 text-white" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className={`text-xs font-bold ${isChecked ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-normal">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pharmacist Discussion Guide */}
          <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-700" />
              <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                What to Ask Your Pharmacist at the Store
              </h3>
            </div>

            <ul className="space-y-1.5 text-xs text-teal-900 list-disc list-inside">
              {medicine.safetyNotes.pharmacistQuestions.map((q, i) => (
                <li key={i} className="leading-relaxed">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Known Contraindications to Review */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Patient Contraindications & Precautions to Disclose:
            </span>
            <div className="flex flex-wrap gap-2">
              {medicine.safetyNotes.contraindications.map((contra, i) => (
                <span key={i} className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg">
                  • {contra}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/stores/${medicine.id}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-soft transition-all duration-200 group active:scale-[0.98]"
            >
              <span>Continue to Nearby Stores</span>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate(`/match/${medicine.id}`)}
              className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Review Match Again
            </button>
          </div>

        </div>

        {/* Required Prominent Bottom Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">
            <strong className="text-slate-800">Legal & Medical Notice:</strong> MediGen does not diagnose, prescribe, or authorize medication changes. All actions and decisions must be confirmed with a licensed health professional.
          </p>
        </div>

      </div>
    </div>
  );
};
