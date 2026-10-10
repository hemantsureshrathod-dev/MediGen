import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showTagline = false 
}) => {
  const iconSizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl font-bold'
  };

  return (
    <Link to="/" className={`flex items-center gap-2.5 group transition-all ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-medigen-navy to-medigen-navyLight text-white shadow-soft ${iconSizeClasses[size]}`}>
        {/* Capsule & Cross geometric icon */}
        <svg viewBox="0 0 32 32" className="w-5/6 h-5/6" fill="none">
          {/* Capsule pill background angled */}
          <rect x="7" y="12" width="18" height="8" rx="4" transform="rotate(-35 16 16)" fill="#0D9488" />
          <path d="M12 21L17.5 13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          {/* Medical cross in the corner */}
          <circle cx="23" cy="9" r="2.5" fill="#EA580C" />
          <path d="M16 13.5V18.5M13.5 16H18.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-slate-900 group-hover:text-medigen-blue transition-colors ${titleSizeClasses[size]}`}>
            Medi<span className="text-teal-600">Gen</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200/60">
            AI Advisor
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-slate-500 font-medium mt-0.5">
            Smarter choices. Better transparency.
          </span>
        )}
      </div>
    </Link>
  );
};
