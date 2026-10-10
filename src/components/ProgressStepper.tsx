import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Camera, FileCheck2, Scale, ShieldAlert, MapPin } from 'lucide-react';

export type StepKey = 'scan' | 'match' | 'compare' | 'verify' | 'stores' | 'summary';

interface ProgressStepperProps {
  currentStep: StepKey;
  medicineId?: string;
  className?: string;
}

const STEPS = [
  { key: 'scan', label: '01 Scan', icon: Camera, path: (_id?: string) => '/scan' },
  { key: 'match', label: '02 Match', icon: FileCheck2, path: (id?: string) => id ? `/match/${id}` : '/scan' },
  { key: 'compare', label: '03 Compare', icon: Scale, path: (id?: string) => id ? `/compare/${id}` : '/scan' },
  { key: 'verify', label: '04 Verify', icon: ShieldAlert, path: (id?: string) => id ? `/verify/${id}` : '/scan' },
  { key: 'stores', label: '05 Locate', icon: MapPin, path: (id?: string) => id ? `/stores/${id}` : '/scan' },
];

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  medicineId,
  className = ''
}) => {
  const navigate = useNavigate();

  const stepOrder = ['scan', 'match', 'compare', 'verify', 'stores', 'summary'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className={`w-full bg-white border-b border-slate-200/80 shadow-soft-sm py-3 px-4 sm:px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Background progress bar line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentIndex > idx;
            const isCurrent = step.key === currentStep || (step.key === 'stores' && currentStep === 'summary');
            const canNavigate = (isCompleted || isCurrent) && (idx === 0 || medicineId);

            return (
              <div 
                key={step.key} 
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  if (canNavigate) {
                    navigate(step.path(medicineId));
                  }
                }}
              >
                <div 
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                    isCurrent 
                      ? 'bg-medigen-navy text-white ring-4 ring-teal-500/20 shadow-md scale-105' 
                      : isCompleted 
                        ? 'bg-teal-600 text-white hover:bg-teal-700' 
                        : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <span 
                  className={`mt-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                    isCurrent 
                      ? 'text-teal-700 font-bold' 
                      : isCompleted 
                        ? 'text-slate-800' 
                        : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
