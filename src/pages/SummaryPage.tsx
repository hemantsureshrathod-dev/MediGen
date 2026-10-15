import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById } from '../data/medicines';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { ProgressStepper } from '../components/ProgressStepper';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Bookmark, 
  RotateCcw, 
  Printer, 
  Stethoscope
} from 'lucide-react';

export const SummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveSearch } = useSearchHistory();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formattedDate] = useState(() => 
    new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  );

  const medicine = findMedicineById(id || '');
  const storeId = searchParams.get('storeId');

  // Trigger confetti once on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

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

  // Selected or best store
  const chosenStore = (storeId ? medicine.storePrices.find(s => s.id === storeId) : null) || 
                      medicine.storePrices.find(s => s.isBestValue) || 
                      medicine.storePrices[0];

  const nearestStore = [...medicine.storePrices].sort((a, b) => a.distanceKm - b.distanceKm)[0];
  const lowestStore = [...medicine.storePrices].sort((a, b) => a.price - b.price)[0];
  const potentialDiff = medicine.brandedAvgPrice - lowestStore.price;

  const handleSaveResult = async () => {
    if (isSaving || savedSuccess) return;
    setIsSaving(true);
    await saveSearch({
      medicineId: medicine.id,
      medicineName: `${medicine.activeIngredient} ${medicine.strength}`,
      brandName: medicine.brandName,
      genericName: medicine.genericName,
      potentialSavings: potentialDiff,
      savingsPercent: medicine.potentialSavingsPercent,
      bestStore: lowestStore.storeName,
      brandedPrice: medicine.brandedAvgPrice,
      genericPrice: lowestStore.price
    });
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper showing completed flow */}
      <ProgressStepper currentStep="summary" medicineId={medicine.id} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Workflow Completed Successfully</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your MediGen Summary
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Decision-support overview for your prescribed medicine and verified generic savings opportunities.
          </p>
        </div>

        {/* Main Summary Document Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-10 space-y-8 print:border-none print:shadow-none">
          
          {/* Header of summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Prescription Consultation Summary
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {medicine.brandName}
              </h2>
              <p className="text-xs text-teal-700 font-semibold mt-0.5">
                Generic Equivalent: {medicine.genericName}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-400 block">Assessment Date:</span>
              <span className="text-xs font-bold text-slate-700">
                {formattedDate}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Kolhapur Demo Center</span>
            </div>
          </div>

          {/* Key Metrics 4-Box Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Highest Demo Price
              </span>
              <div className="text-2xl font-extrabold text-slate-900">
                ₹{medicine.brandedAvgPrice}
              </div>
              <span className="text-[10px] text-slate-500">Branded MRP</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                Lowest Demo Price
              </span>
              <div className="text-2xl font-black text-teal-800">
                ₹{lowestStore.price}
              </div>
              <span className="text-[10px] text-teal-700">Jan Aushadhi Outlet</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Potential Savings
              </span>
              <div className="text-2xl font-black text-emerald-700">
                ₹{potentialDiff}
              </div>
              <span className="text-[10px] text-emerald-700">
                {medicine.potentialSavingsPercent}% cheaper
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Nearest Outlet
              </span>
              <div className="text-base font-bold text-slate-900 truncate">
                {nearestStore.storeName.split(' ')[0]}
              </div>
              <span className="text-[10px] text-slate-500">{nearestStore.distanceKm} km away</span>
            </div>

          </div>

          {/* Selected Option Recommendation Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Recommended Best Value Outlet:
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                ★ Best Value
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {chosenStore.storeName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chosenStore.address} • {chosenStore.distanceKm} km away • {chosenStore.openHours}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xl font-black text-teal-800 block">
                  ₹{chosenStore.price}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  In stock ({chosenStore.availability})
                </span>
              </div>
            </div>
          </div>

          {/* Critical Next Step Advisory */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Stethoscope className="w-4 h-4 text-amber-700" />
              <span>Next Mandatory Step:</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Discuss this option with your pharmacist or doctor before making any change. Take this summary to the pharmacy or clinic to confirm identical salt composition, dosage form, and patient suitability.
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 print:hidden">
            
            <button
              onClick={handleSaveResult}
              disabled={isSaving || savedSuccess}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : isSaving
                  ? 'bg-teal-500 text-white opacity-70 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>
                {savedSuccess
                  ? 'Saved to Search History!'
                  : isSaving
                  ? 'Saving to Database...'
                  : 'Save Result to My Searches'}
              </span>
            </button>

            <button
              onClick={handlePrintSummary}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Slip</span>
            </button>

            <button
              onClick={() => navigate('/scan')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-teal-400" />
              <span>Start New Search</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
