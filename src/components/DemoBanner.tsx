import React, { useState } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200/80 text-amber-900 px-4 py-2 text-xs md:text-sm font-medium transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-200/80 text-amber-900 border border-amber-300 uppercase tracking-wide shrink-0">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            Prototype • Demo Data
          </span>
          <p className="truncate text-amber-950 font-normal">
            <strong className="font-semibold text-amber-900">Semester 3 Field Project Demonstration:</strong> Simulated medicine, OCR, and pricing data for academic evaluation. Not medical advice — consult your doctor or pharmacist before switching medicines.
          </p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-800 bg-white/70 px-2 py-0.5 rounded border border-amber-200">
            <Info className="w-3 h-3" />
            Location: Kolhapur (Simulated)
          </span>
          <button 
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1 hover:bg-amber-200/60 rounded text-amber-700 hover:text-amber-950 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
