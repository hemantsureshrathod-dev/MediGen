import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById } from '../data/medicines';
import { ProgressStepper } from '../components/ProgressStepper';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export const GenericMatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const medicine = findMedicineById(id || '');

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

  const potentialDiff = medicine.brandedAvgPrice - medicine.genericAvgPrice;

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper for Step 2 Match */}
      <ProgressStepper currentStep="match" medicineId={medicine.id} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/medicine/${medicine.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Medicine Profile</span>
          </button>

          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Stage 02 • Equivalence Matching
          </span>
        </div>

        {/* Header Title */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Potential Generic Match
          </h1>
          <p className="text-sm text-slate-600">
            Side-by-side pharmacological comparison of prescribed brand against generic equivalent.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: PRESCRIBED BRANDED */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-soft p-6 sm:p-7 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Prescribed Medicine
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Branded Example
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {medicine.brandName}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Popular brands: {medicine.popularBrands.join(', ')}
              </p>
            </div>

            {/* Spec Table */}
            <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Active Ingredient:</span>
                <span className="font-bold text-slate-900">{medicine.activeIngredient}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Strength:</span>
                <span className="font-bold text-slate-900">{medicine.strength}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Dosage Form:</span>
                <span className="font-bold text-slate-900">{medicine.dosageForm}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Standard Pack:</span>
                <span className="font-bold text-slate-900">{medicine.packSize}</span>
              </div>
            </div>

            {/* Branded Price Pill */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
              <span className="text-xs text-slate-500">Estimated Branded MRP:</span>
              <span className="text-xl font-extrabold text-slate-900">₹{medicine.brandedAvgPrice}</span>
            </div>
          </div>

          {/* Card 2: POTENTIAL GENERIC MATCH */}
          <div className="bg-white rounded-2xl border-2 border-teal-400 shadow-soft-lg p-6 sm:p-7 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Potential Generic Match
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                Generic Equivalent
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {medicine.genericName}
              </h3>
              <p className="text-xs text-teal-700 font-medium mt-1">
                Indian Pharmacopoeia (IP) Monograph Standard
              </p>
            </div>

            {/* Spec Table */}
            <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Active Ingredient:</span>
                <span className="font-bold text-teal-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  {medicine.activeIngredient}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Strength:</span>
                <span className="font-bold text-teal-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  {medicine.strength}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Dosage Form:</span>
                <span className="font-bold text-teal-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  {medicine.dosageForm}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Standard Pack:</span>
                <span className="font-bold text-slate-900">{medicine.packSize}</span>
              </div>
            </div>

            {/* Generic Price Pill */}
            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <span className="text-xs text-teal-900 font-semibold">Jan Aushadhi Demo Price:</span>
              <span className="text-xl font-extrabold text-teal-800">₹{medicine.genericAvgPrice}</span>
            </div>
          </div>

        </div>

        {/* Potential Savings Banner Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-7 text-white shadow-soft-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 block mb-1">
                Calculated Potential Savings
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black">
                  ₹{potentialDiff}
                </span>
                <span className="text-lg font-bold text-emerald-200">
                  ({medicine.potentialSavingsPercent}% cheaper)
                </span>
              </div>
            </div>

            <div className="text-xs text-emerald-100 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/20">
              Branded: <strong>₹{medicine.brandedAvgPrice}</strong> → Generic: <strong>₹{medicine.genericAvgPrice}</strong>
              <div className="text-[10px] text-emerald-200 mt-0.5">Sample pricing — demonstration data</div>
            </div>
          </div>

          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-700" 
              style={{ width: `${medicine.potentialSavingsPercent}%` }} 
            />
          </div>
        </div>

        {/* "Why This Match?" Transparent Explanation Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Why this match? (Transparent Equivalence Criteria)
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Both records contain the <strong>same active ingredient ({medicine.activeIngredient})</strong> and <strong>listed strength ({medicine.strength})</strong> in the prototype dataset.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <strong className="text-slate-800 block mb-1">Bioequivalence Standard:</strong>
              <span className="text-slate-600">{medicine.equivalenceCriteria.bioequivalenceStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <strong className="text-slate-800 block mb-1">Deterministic Architecture:</strong>
              <span className="text-slate-600">
                Rule-based equivalence mapping grounded in predefined chemical taxonomies — zero autonomous LLM hallucination.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to proceed to Price Comparison */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/compare/${medicine.id}`)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-soft transition-all duration-200 group active:scale-[0.98]"
          >
            <span>Compare Prices Across Local Pharmacies</span>
            <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
