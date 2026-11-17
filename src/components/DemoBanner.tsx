import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50/90 border-b border-amber-200/60 text-amber-900 px-4 py-1.5 text-xs font-medium transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900 uppercase tracking-wide shrink-0">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            Academic Prototype
          </span>
          <p className="truncate text-slate-600 font-normal text-xs">
            Demonstration data only. Not medical advice — always consult a qualified healthcare professional.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Kolhapur (Simulated)
          </span>
          <button 
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-0.5 hover:bg-amber-200/60 rounded text-amber-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
