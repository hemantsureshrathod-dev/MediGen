import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Scan, 
  TrendingDown, 
  RotateCcw,
  Cloud,
  HardDrive,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    history, 
    loading, 
    error, 
    isAuthenticated, 
    deleteSearch, 
    clearAllHistory, 
    resetToSampleHistory,
    refreshHistory 
  } = useSearchHistory();

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-teal-600" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Searches & Saved Analyses
              </h1>
            </div>
            
            <div className="flex items-center gap-2 pt-0.5">
              {isAuthenticated ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
                  <Cloud className="w-3.5 h-3.5 text-teal-600" />
                  <span>Synced with Supabase Cloud DB</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>Guest Offline Storage</span>
                </span>
              )}
              <p className="text-xs text-slate-500 hidden sm:inline">
                {isAuthenticated
                  ? 'Your searches are securely backed up in your Supabase account.'
                  : 'Sign in to sync your search history across devices.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && !loading && (
              <button
                onClick={clearAllHistory}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                title={isAuthenticated ? 'Clear all cloud searches' : 'Clear all local searches'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            {!isAuthenticated && (
              <button
                onClick={resetToSampleHistory}
                className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1.5"
                title="Reset to default academic field project demonstration records"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                <span>Reset Demo Cache</span>
              </button>
            )}
          </div>
        </div>

        {/* Recoverable Error Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900 shadow-soft-sm">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={refreshHistory}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-xs hover:bg-amber-100 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3 h-3 text-amber-700" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-soft">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
            <h3 className="text-sm font-semibold text-slate-700">Loading your saved analyses...</h3>
            <p className="text-xs text-slate-400">Connecting to database records</p>
          </div>
        ) : history.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <History className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No searches yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isAuthenticated 
                  ? 'You have not saved any medicine analyses to your account yet.' 
                  : 'Your analyzed medicines and calculated generic savings will appear here.'}
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
              {!isAuthenticated && (
                <button
                  onClick={resetToSampleHistory}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Load Sample History
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Search Items */
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
