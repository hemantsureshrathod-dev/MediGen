import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorePrice, Medicine } from '../data/medicines';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

interface StoreDetailModalProps {
  store: StorePrice;
  medicine: Medicine;
  onClose: () => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  store,
  medicine,
  onClose
}) => {
  const navigate = useNavigate();
  const [directionsShown, setDirectionsShown] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  const isJanAushadhi = store.storeType === 'Jan Aushadhi';
  const potentialSavings = Math.max(0, medicine.brandedAvgPrice - store.price);
  const savingsPct = Math.round((potentialSavings / medicine.brandedAvgPrice) * 100);

  const handleContinueToSummary = () => {
    navigate(`/summary/${medicine.id}?storeId=${store.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with store color theme */}
        <div className={`p-5 sm:p-6 text-white ${
          isJanAushadhi 
            ? 'bg-gradient-to-r from-teal-800 to-teal-700' 
            : 'bg-gradient-to-r from-slate-900 to-slate-800'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isJanAushadhi 
                    ? 'bg-teal-500/30 text-teal-100 border border-teal-400/40' 
                    : 'bg-blue-500/30 text-blue-100 border border-blue-400/40'
                }`}>
                  {store.storeType}
                </span>
                {store.isBestValue && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                    ★ Best Value
                  </span>
                )}
                {store.isNearest && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                    Nearest ({store.distanceKm} km)
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                {store.storeName}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Price & Savings Pill */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Generic Medicine Demo Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-slate-900">₹{store.price}</span>
                <span className="text-xs text-slate-400 line-through">Branded ₹{medicine.brandedAvgPrice}</span>
              </div>
            </div>

            {potentialSavings > 0 && (
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Save ₹{potentialSavings} ({savingsPct}%)</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Demo estimation</span>
              </div>
            )}
          </div>

          {/* Store Info Attributes */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold block text-xs uppercase tracking-wider text-slate-500">Address</strong>
                <span className="text-slate-800">{store.address}</span>
                <span className="text-xs text-teal-700 font-medium ml-2">({store.distanceKm} km from simulated center)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold block text-xs uppercase tracking-wider text-slate-500">Operating Hours</strong>
                <span>{store.openHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold block text-xs uppercase tracking-wider text-slate-500">Contact Number</strong>
                <span className="font-mono text-slate-800">{store.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold block text-xs uppercase tracking-wider text-slate-500">Stock Availability</strong>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {store.availability} in stock (Demo record)
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Direction drawer toggle */}
          {directionsShown && (
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 font-semibold text-blue-950 mb-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulated Route Guide (Kolhapur)</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Head north towards Station Road (400 m)</li>
                <li>Turn right onto Civil Hospital Road (900 m)</li>
                <li>Destination is on the left opposite S.T. Bus Stand</li>
              </ol>
              <p className="mt-2 text-[10px] text-blue-800 font-medium">
                Prototype simulation • Estimated travel time: 6 mins by vehicle
              </p>
            </div>
          )}

          {callAlert && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in duration-150">
              <span className="font-semibold block mb-0.5">Demo Action Notice:</span>
              Phone call simulated. In production, this dials <span className="font-mono">{store.phone}</span> directly.
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setDirectionsShown(!directionsShown)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>{directionsShown ? 'Hide Directions' : 'Get Directions'}</span>
            </button>

            <button
              onClick={() => {
                setCallAlert(true);
                setTimeout(() => setCallAlert(false), 3500);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Call Store (Demo)</span>
            </button>
          </div>

          <button
            onClick={handleContinueToSummary}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <span>Confirm Store & View Summary</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>

        </div>
      </div>
    </div>
  );
};
