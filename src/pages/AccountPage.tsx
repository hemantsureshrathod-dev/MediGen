import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  LogOut, 
  History, 
  Scan, 
  Calendar, 
  KeyRound, 
  ArrowRight,
  Edit2,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, profileLoading, profileError, signOut, updateProfile } = useAuth();
  const { history } = useSearchHistory();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const currentDisplayName = profile?.display_name || user?.email?.split('@')[0] || 'MediGen User';
  const [displayNameInput, setDisplayNameInput] = useState(currentDisplayName);
  const [isSavingName, setIsSavingName] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    navigate('/', { replace: true });
  };

  const handleSaveDisplayName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayNameInput.trim()) return;

    setIsSavingName(true);
    setUpdateError(null);

    const { error } = await updateProfile({ display_name: displayNameInput.trim() });
    setIsSavingName(false);

    if (error) {
      setUpdateError(error.message);
    } else {
      setIsEditingName(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  };

  if (!user) {
    return null;
  }

  const createdAt = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Active Session';

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm">
                <User className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Account
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Authenticated via Supabase Auth • Row Level Security Enabled
            </p>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-red-50 hover:border-red-300 text-slate-700 hover:text-red-700 font-semibold text-xs shadow-soft-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>

        {/* Profile Error Notice (Recoverable) */}
        {profileError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 shadow-soft-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-semibold">Profile notice:</span> {profileError}
              <span className="text-slate-500 block text-[11px] mt-0.5">Your session remains authenticated. Fallback profile information is displayed below.</span>
            </div>
          </div>
        )}

        {/* Profile Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                User Profile & Identity
              </span>
              
              {isEditingName ? (
                <form onSubmit={handleSaveDisplayName} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    placeholder="Enter display name"
                    className="px-3 py-1.5 rounded-xl border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold text-slate-900"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSavingName}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1 shadow-sm"
                  >
                    {isSavingName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingName(false);
                      setDisplayNameInput(currentDisplayName);
                    }}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-slate-900">
                    {currentDisplayName}
                  </h2>
                  <button
                    onClick={() => {
                      setDisplayNameInput(currentDisplayName);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                    title="Edit Display Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </p>

              {updateSuccess && (
                <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                  ✓ Profile display name updated in Supabase!
                </span>
              )}
              {updateError && (
                <span className="text-xs text-red-600 font-semibold mt-1 inline-block">
                  {updateError}
                </span>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Supabase Session</span>
              </span>
              {profileLoading && (
                <span className="text-[11px] text-teal-600 flex items-center gap-1 mt-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Syncing profile...</span>
                </span>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                User UID
              </span>
              <span className="font-mono text-slate-800 break-all select-all font-medium text-[11px]">
                {user.id}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Member Since
              </span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{createdAt}</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Security Standard
              </span>
              <span className="text-sm font-bold text-teal-700 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-teal-600" />
                <span>RLS + JWT</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Saved Analyses
              </span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-teal-600" />
                <span>{history.length} records</span>
              </span>
            </div>

          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <Link
            to="/history"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-soft transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  My Searches & Analyses
                </h3>
                <p className="text-xs text-slate-500">
                  {history.length > 0 
                    ? `Access ${history.length} saved generic medicine comparison records.` 
                    : 'View past generic medicine matches and savings records.'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/scan"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-soft transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Prescription Scanner
                </h3>
                <p className="text-xs text-slate-500">
                  Analyze a new prescription or search generic equivalents.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

      </div>
    </div>
  );
};
