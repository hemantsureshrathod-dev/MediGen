import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById } from '../data/medicines';
import { ProgressStepper } from '../components/ProgressStepper';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Info,
  BarChart3
} from 'lucide-react';

export const PriceComparisonPage: React.FC = () => {
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

  // Calculate highest store price vs lowest
  const lowestStore = [...medicine.storePrices].sort((a, b) => a.price - b.price)[0];
  const maxSavings = medicine.brandedAvgPrice - (lowestStore ? lowestStore.price : medicine.genericAvgPrice);

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper for Step 3 Compare */}
      <ProgressStepper currentStep="compare" medicineId={medicine.id} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/match/${medicine.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Generic Match</span>
          </button>

          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Stage 03 • Price Transparency
          </span>
        </div>

        {/* Title */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compare prices near you
          </h1>
          <p className="text-sm text-slate-600">
            Medicine: <strong className="text-slate-800">{medicine.genericName}</strong> • {medicine.packSize}
          </p>
        </div>

        {/* Visual Price Comparison Bars */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Visual Price Comparison Breakdown
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Prices per {medicine.packSize}
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {/* Branded benchmark */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Branded MRP ({medicine.brandName})</span>
                <span className="text-slate-900 font-bold">₹{medicine.brandedAvgPrice}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full w-full" />
              </div>
            </div>

            {/* Store prices bars */}
            {medicine.storePrices.map((store) => {
              const widthPct = Math.min(100, Math.round((store.price / medicine.brandedAvgPrice) * 100));
              const isJanAushadhi = store.storeType === 'Jan Aushadhi';

              return (
                <div key={store.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <strong>{store.storeName}</strong>
                      <span className="text-[10px] text-slate-400">({store.distanceKm} km away)</span>
                      {store.isBestValue && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                          BEST VALUE
                        </span>
                      )}
                    </span>
                    <span className={`font-bold ${isJanAushadhi ? 'text-teal-700 font-extrabold text-sm' : 'text-slate-900'}`}>
                      ₹{store.price}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isJanAushadhi ? 'bg-teal-600' : 'bg-blue-400'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Demo pricing. Actual prices and physical availability may vary across retail outlets.</span>
          </div>
        </div>

        {/* Detailed Store Comparison Table / Cards */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Available Outlets in Kolhapur Area
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {medicine.storePrices.map((store) => {
              const savings = medicine.brandedAvgPrice - store.price;

              return (
                <div
                  key={store.id}
                  className={`p-5 rounded-2xl bg-white border transition-all shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    store.isBestValue 
                      ? 'border-teal-400 ring-2 ring-teal-500/10' 
                      : 'border-slate-200'
                  }`}
                >
                  {/* Left: Store Meta */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">
                        {store.storeName}
                      </h4>

                      {store.isBestValue && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          BEST VALUE
                        </span>
                      )}
                      {store.isNearest && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                          NEAREST
                        </span>
                      )}
                      {store.price === lowestStore.price && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-300">
                          LOWEST PRICE
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">
                      {store.address} • <strong className="text-slate-700">{store.distanceKm} km away</strong>
                    </p>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-600 font-medium">{store.storeType}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {store.availability}
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">{store.openHours}</span>
                    </div>
                  </div>

                  {/* Right: Price & Potential Savings */}
                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-5 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-400 block">Unit Price</span>
                      <div className="text-2xl font-black text-slate-900">
                        ₹{store.price}
                      </div>
                      {savings > 0 && (
                        <span className="text-xs font-semibold text-emerald-700 block">
                          Save ₹{savings}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/stores/${medicine.id}`)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Locate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maximum Potential Savings Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              ₹
            </div>
            <div>
              <h4 className="text-base font-extrabold text-emerald-950">
                You could potentially save up to ₹{maxSavings}
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                By purchasing generic equivalent from Pradhan Mantri Jan Aushadhi Kendra instead of branded MRP.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
            Demo pricing • Academic sample
          </span>
        </div>

        {/* Primary CTA: Move to Safety & Verification */}
        <div className="pt-2">
          <button
            onClick={() => navigate(`/verify/${medicine.id}`)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-soft transition-all duration-200 group active:scale-[0.98]"
          >
            <span>Proceed to Safety & Verification Checklist</span>
            <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
