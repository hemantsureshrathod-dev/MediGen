import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Scan, 
  TrendingDown, 
  RotateCcw
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, deleteSearch, clearAllHistory, resetToSampleHistory } = useSearchHistory();

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-teal-600" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Searches & Saved Analyses
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Locally persisted prescription analyses and evaluated generic alternatives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={clearAllHistory}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              onClick={resetToSampleHistory}
              className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1.5"
              title="Reset to default academic field project demonstration records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
              <span>Reset Demo Cache</span>
            </button>
          </div>
        </div>

        {/* Search Items or Empty State */}
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <History className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No searches yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your analyzed medicines and calculated generic savings will appear here.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/scan"
                className="px-5 py-2.5 rounded-xl bg-medigen-navy text-white text-xs font-bold hover:bg-slate-900 shadow-md inline-flex items-center gap-2"
              >
                <Scan className="w-4 h-4 text-teal-400" />
                <span>Check a Medicine Now</span>
              </Link>
              <button
                onClick={resetToSampleHistory}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Load Sample History
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-soft transition-all shadow-soft-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {item.medicineName}
                    </h3>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Prescribed: <span className="font-semibold text-slate-700">{item.brandName}</span> → Generic: <span className="text-teal-700 font-medium">{item.genericName}</span>
                  </p>

                  <div className="flex items-center gap-3 text-xs pt-1">
                    <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Save ₹{item.potentialSavings} ({item.savingsPercent}%)
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">{item.bestStore}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <button
                    onClick={() => navigate(`/summary/${item.medicineId}`)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>View Result</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>

                  <button
                    onClick={() => deleteSearch(item.id)}
                    aria-label="Delete history entry"
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
