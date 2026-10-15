import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../hooks/useAuth';
import { 
  Scan, 
  History, 
  Menu, 
  X, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  User,
  LogIn,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const userDisplayName = profile?.display_name || user?.email?.split('@')[0] || 'Account';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/about' },
    { name: 'My Searches', path: '/history', icon: History },
    { name: 'About & Scope', path: '/about#limitations' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Logo size="md" showTagline={false} />
            
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Simulated Area: <strong className="text-slate-800">Kolhapur, Maharashtra</strong></span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-medigen-blue bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/history"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              title="View saved search records"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>Saved Searches</span>
            </Link>

            {/* User Auth CTA */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/account"
                  className="px-3 py-2 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/70 text-xs font-bold text-teal-900 transition-colors flex items-center gap-1.5 shadow-soft-sm"
                  title={`Logged in as ${user.email} (${userDisplayName})`}
                >
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span className="max-w-[110px] truncate">{userDisplayName}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Sign Out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                title="Sign in with Supabase"
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                <span>Sign In</span>
              </Link>
            )}

            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-medigen-navy to-medigen-navyLight hover:from-slate-900 hover:to-slate-800 text-white text-sm font-semibold shadow-soft hover:shadow-soft-lg transition-all duration-200 group active:scale-[0.98]"
            >
              <Scan className="w-4 h-4 text-teal-400 group-hover:rotate-12 transition-transform" />
              <span>Check a Medicine</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <Link
                to="/account"
                className="p-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800"
                title="Account"
              >
                <User className="w-4 h-4 text-teal-700" />
              </Link>
            ) : (
              <Link
                to="/auth"
                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                <LogIn className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/scan"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-medigen-navy text-white text-xs font-semibold shadow-sm"
            >
              <Scan className="w-3.5 h-3.5 text-teal-400" />
              <span>Scan</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-2 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="py-2 px-3 rounded-lg bg-teal-50/60 border border-teal-100 flex items-center gap-2 text-xs text-teal-900">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Academic Demonstration Mode • Sample Data</span>
          </div>

          {/* User state in mobile menu */}
          {user ? (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs truncate">
                  <strong className="text-slate-900 block truncate">{userDisplayName}</strong>
                  <span className="text-slate-400 text-[10px] block truncate">{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="p-1 text-slate-400 hover:text-red-600"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-900 text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4 text-teal-700" />
                <span>Sign In / Create MediGen Account</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </Link>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-medigen-navy text-white font-semibold text-sm shadow-md"
            >
              <Scan className="w-4 h-4 text-teal-400" />
              <span>Start Medicine Scan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
