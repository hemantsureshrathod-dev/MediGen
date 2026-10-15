import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/Logo';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Info
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user, isConfigured } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if already logged in
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/account';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify your password confirmation.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMessage(error.message || 'Failed to sign in. Please check your credentials.');
        } else {
          navigate(from, { replace: true });
        }
      } else {
        const { error, needsEmailVerification } = await signUp(email, password);
        if (error) {
          setErrorMessage(error.message || 'Failed to create account.');
        } else if (needsEmailVerification) {
          setSuccessMessage(
            'Account created successfully! A confirmation link has been sent to your email. Please verify your email before logging in.'
          );
          setMode('signin');
          setPassword('');
          setConfirmPassword('');
        } else {
          setSuccessMessage('Account created and signed in successfully!');
          navigate(from, { replace: true });
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="inline-block">
            <Logo size="lg" showTagline={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'signin' ? 'Welcome back to MediGen' : 'Create your MediGen account'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {mode === 'signin' 
              ? 'Sign in to access your prescription history and personalized advisor features.'
              : 'Sign up with email to securely sync searches and clinical verification records.'}
          </p>
        </div>

        {/* Configuration Notice if Supabase placeholder detected */}
        {!isConfigured && (
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-2 shadow-soft-sm">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Supabase Authentication Ready</span>
            </div>
            <p className="leading-relaxed">
              Target Supabase project: <strong className="font-mono text-amber-900">ssdoatwllkkqwrmdpqka</strong>.
            </p>
            <p className="text-[11px] text-amber-800">
              To test live authentication, copy your <strong>Publishable Anon Key</strong> from your Supabase Dashboard into <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code>.
            </p>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-8 space-y-6">
          
          {/* Mode Selector Tabs */}
          <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="auth-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Confirmation (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5 animate-in fade-in duration-150">
                <label htmlFor="auth-confirm-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg transition-all disabled:opacity-60 active:scale-[0.98]"
            >
              <span>{isSubmitting ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>

          </form>

          {/* Privacy & Clinical Verification Notice */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Encrypted Supabase Auth • Zero password storage in local browser storage</span>
          </div>

        </div>

        {/* Back to Home / Guest Continue */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Return to MediGen Home (Browse as Guest)
          </Link>
        </div>

      </div>
    </div>
  );
};
