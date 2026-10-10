import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ShieldAlert } from 'lucide-react';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Safety highlight banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold shrink-0">
            <ShieldAlert className="w-4 h-4" />
            <span>Important Healthcare Safety Principle</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-4xl">
            MediGen is strictly an informational decision-support tool. It does <strong className="text-slate-200">not</strong> provide autonomous medical advice, diagnose diseases, or prescribe medicines. Any generic medicine substitution must be confirmed and authorized by a licensed doctor or pharmacist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" showTagline={false} />
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Generic Medicine Substitution & Price Transparency Advisor.
            </p>
            <p className="text-xs text-teal-400 font-medium">
              Semester 3 Field Project • Prototype Demonstration
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Simulated reference location: <br />
              <span className="text-slate-400 font-medium">Kolhapur, Maharashtra, India</span>
            </div>
          </div>

          {/* Quick Demo Medicines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Demo Test Medicines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/medicine/atorvastatin-10" className="hover:text-teal-400 transition-colors">
                  Atorvastatin 10 mg (Lipitor / Atorva)
                </Link>
              </li>
              <li>
                <Link to="/medicine/pantoprazole-40" className="hover:text-teal-400 transition-colors">
                  Pantoprazole 40 mg (Pan 40)
                </Link>
              </li>
              <li>
                <Link to="/medicine/metformin-500" className="hover:text-teal-400 transition-colors">
                  Metformin 500 mg (Glycomet)
                </Link>
              </li>
              <li>
                <Link to="/medicine/amlodipine-5" className="hover:text-teal-400 transition-colors">
                  Amlodipine 5 mg (Amlong)
                </Link>
              </li>
              <li>
                <Link to="/medicine/azithromycin-500" className="hover:text-teal-400 transition-colors">
                  Azithromycin 500 mg (Azithral)
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Workflow */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Conceptual Workflow
            </h4>
            <ol className="space-y-2 text-xs text-slate-400 list-decimal list-inside">
              <li><Link to="/scan" className="hover:text-teal-400">01 Scan Prescription</Link></li>
              <li><Link to="/match/atorvastatin-10" className="hover:text-teal-400">02 Equivalence Matching</Link></li>
              <li><Link to="/compare/atorvastatin-10" className="hover:text-teal-400">03 Price Transparency</Link></li>
              <li><Link to="/verify/atorvastatin-10" className="hover:text-teal-400">04 Safety Verification</Link></li>
              <li><Link to="/stores/atorvastatin-10" className="hover:text-teal-400">05 Jan Aushadhi Discovery</Link></li>
            </ol>
          </div>

          {/* Academic Evaluation Notes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Field Project Context
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Designed as a research and usability prototype studying generic medicine adoption, price asymmetry, and Jan Aushadhi accessibility in Indian healthcare.
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
              <span className="font-semibold text-teal-300 block mb-1">Notice for Evaluators:</span>
              Dataset prices are modeled on PMBJP (Jan Aushadhi) and retail MRP averages for demonstration.
            </div>
          </div>

        </div>

        {/* Bottom copyright and academic tag */}
        <div className="border-t border-slate-800/90 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {CURRENT_YEAR} MediGen Research Prototype. Built for Semester 3 Academic Field Project.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">Project Methodology</Link>
            <span>•</span>
            <Link to="/about#disclaimer" className="hover:text-slate-300 transition-colors">Medical Disclaimer</Link>
            <span>•</span>
            <Link to="/history" className="hover:text-slate-300 transition-colors">Stored Cache</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
