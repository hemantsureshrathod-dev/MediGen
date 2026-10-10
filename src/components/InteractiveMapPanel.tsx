import React, { useState } from 'react';
import { StorePrice } from '../data/medicines';
import { 
  Navigation, 
  Plus, 
  Minus
} from 'lucide-react';

interface InteractiveMapPanelProps {
  stores: StorePrice[];
  selectedStore: StorePrice | null;
  onSelectStore: (store: StorePrice) => void;
  className?: string;
}

export const InteractiveMapPanel: React.FC<InteractiveMapPanelProps> = ({
  stores,
  selectedStore,
  onSelectStore,
  className = ''
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'jan-aushadhi' | 'pharmacy'>('all');

  // Simulated User Location: Central Laxmipuri / Rankala junction, Kolhapur
  const userLocation = { x: 45, y: 52, label: 'Your Location (Simulated)' };

  const filteredStores = stores.filter(store => {
    if (activeFilter === 'jan-aushadhi') return store.storeType === 'Jan Aushadhi';
    if (activeFilter === 'pharmacy') return store.storeType !== 'Jan Aushadhi';
    return true;
  });

  return (
    <div className={`relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/80 shadow-soft-lg flex flex-col ${className}`}>
      
      {/* Top Map Header Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 text-xs text-slate-200 flex items-center gap-2 shadow-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-white">Kolhapur City Area</span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            Simulated GPS
          </span>
        </div>

        {/* Map Type / Filter pills */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/70 shadow-md">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-teal-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Outlets ({stores.length})
          </button>
          <button
            onClick={() => setActiveFilter('jan-aushadhi')}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              activeFilter === 'jan-aushadhi'
                ? 'bg-teal-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Jan Aushadhi
          </button>
        </div>
      </div>

      {/* Main Vector Map Canvas / SVG */}
      <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden bg-[#0c192c] select-none">
        
        {/* Subtle SVG Grid & City Streets Simulation */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <pattern id="city-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.4" strokeDasharray="1,1" />
            </pattern>
            <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="pulse-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid background */}
          <rect width="100" height="100" fill="#0b1728" />
          <rect width="100" height="100" fill="url(#city-grid)" />

          {/* Panchganga River representation across northern section */}
          <path 
            d="M 0,20 Q 25,28 50,22 T 100,26" 
            fill="none" 
            stroke="url(#river-grad)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
          <text x="75" y="24" fill="#38bdf8" fontSize="2" opacity="0.6" fontStyle="italic">Panchganga River</text>

          {/* Simulated Primary Urban Arteries (Kolhapur Main Roads) */}
          {/* Station Road */}
          <line x1="15" y1="35" x2="85" y2="35" stroke="#334155" strokeWidth="1.6" />
          <text x="18" y="33" fill="#64748b" fontSize="1.8" letterSpacing="0.2">STATION ROAD</text>

          {/* Mahadwar / Bhausingji Road */}
          <line x1="30" y1="10" x2="48" y2="90" stroke="#334155" strokeWidth="1.4" />
          
          {/* Rajarampuri Avenue */}
          <line x1="50" y1="20" x2="80" y2="85" stroke="#334155" strokeWidth="1.5" />
          <text x="68" y="70" fill="#64748b" fontSize="1.8">RAJARAMPURI MAIN RD</text>

          {/* Laxmipuri Ring */}
          <circle cx="45" cy="55" r="14" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />

          {/* Urban landmarks labels */}
          <g opacity="0.7">
            <circle cx="40" cy="46" r="1.5" fill="#475569" />
            <text x="32" y="49" fill="#94a3b8" fontSize="1.9">S.T. Stand Area</text>

            <circle cx="58" cy="38" r="1.5" fill="#475569" />
            <text x="60" y="38" fill="#94a3b8" fontSize="1.9">Railway Station</text>

            <circle cx="36" cy="68" r="1.5" fill="#475569" />
            <text x="24" y="72" fill="#94a3b8" fontSize="1.9">Mahalakshmi Complex</text>
          </g>

          {/* Dynamic Route Line connecting User to Selected Store */}
          {selectedStore && (
            <g className="transition-all duration-500">
              {/* Route glow */}
              <line 
                x1={userLocation.x} 
                y1={userLocation.y} 
                x2={selectedStore.coordinates.x} 
                y2={selectedStore.coordinates.y} 
                stroke="#0d9488" 
                strokeWidth="1.2" 
                strokeDasharray="2,2"
                className="animate-pulse"
              />
              <circle 
                cx={(userLocation.x + selectedStore.coordinates.x) / 2} 
                cy={(userLocation.y + selectedStore.coordinates.y) / 2} 
                r="3" 
                fill="#0f172a"
                stroke="#0d9488"
                strokeWidth="0.5"
              />
              <text 
                x={(userLocation.x + selectedStore.coordinates.x) / 2} 
                y={(userLocation.y + selectedStore.coordinates.y) / 2 + 0.8} 
                fill="#5eead4" 
                fontSize="1.7" 
                textAnchor="middle" 
                fontWeight="bold"
              >
                {selectedStore.distanceKm} km
              </text>
            </g>
          )}

          {/* User Location Radar & Beacon */}
          <g>
            <circle cx={userLocation.x} cy={userLocation.y} r="6" fill="url(#pulse-grad)" className="animate-ping" opacity="0.4" />
            <circle cx={userLocation.x} cy={userLocation.y} r="2.5" fill="#0284c7" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx={userLocation.x} cy={userLocation.y} r="1" fill="#ffffff" />
            <text x={userLocation.x} y={userLocation.y + 4.8} fill="#38bdf8" fontSize="2" textAnchor="middle" fontWeight="bold">
              You are here
            </text>
          </g>

          {/* Store Markers */}
          {filteredStores.map((store) => {
            const isSelected = selectedStore?.id === store.id;
            const isJanAushadhi = store.storeType === 'Jan Aushadhi';

            return (
              <g 
                key={store.id} 
                className="cursor-pointer group transition-transform duration-200"
                onClick={() => onSelectStore(store)}
              >
                {/* Highlight ring for selected */}
                {isSelected && (
                  <circle 
                    cx={store.coordinates.x} 
                    cy={store.coordinates.y} 
                    r="5" 
                    fill="none" 
                    stroke="#14b8a6" 
                    strokeWidth="0.8" 
                    className="animate-ping"
                  />
                )}

                {/* Marker Pin Body */}
                <circle 
                  cx={store.coordinates.x} 
                  cy={store.coordinates.y} 
                  r={isSelected ? 3.6 : 3} 
                  fill={isJanAushadhi ? '#0d9488' : isSelected ? '#1e40af' : '#334155'} 
                  stroke="#ffffff" 
                  strokeWidth="0.7" 
                />

                {/* Inner Icon representation */}
                <circle 
                  cx={store.coordinates.x} 
                  cy={store.coordinates.y} 
                  r="1.2" 
                  fill={isJanAushadhi ? '#ffffff' : '#93c5fd'} 
                />

                {/* Store Price Tag Pill above Marker */}
                <rect 
                  x={store.coordinates.x - 5.5} 
                  y={store.coordinates.y - 7} 
                  width="11" 
                  height="3.6" 
                  rx="1.2" 
                  fill={isSelected ? '#0f172a' : '#1e293b'} 
                  stroke={isJanAushadhi ? '#0d9488' : '#64748b'} 
                  strokeWidth="0.4" 
                />
                <text 
                  x={store.coordinates.x} 
                  y={store.coordinates.y - 4.6} 
                  fill={isJanAushadhi ? '#5eead4' : '#f1f5f9'} 
                  fontSize="1.9" 
                  textAnchor="middle" 
                  fontWeight="bold"
                >
                  ₹{store.price}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Store Quick Card Overlay in Map bottom */}
        {selectedStore && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-20 bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-teal-500/50 shadow-xl text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mb-1 ${
                  selectedStore.storeType === 'Jan Aushadhi'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  {selectedStore.storeType}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {selectedStore.storeName}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {selectedStore.address}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold text-teal-400 block">
                  ₹{selectedStore.price}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedStore.distanceKm} km
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Zoom & Location Controls */}
        <div className="absolute right-3 bottom-3 z-20 flex flex-col gap-1.5">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
            aria-label="Zoom in simulated map"
            className="w-8 h-8 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 flex items-center justify-center border border-slate-700 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.9))}
            aria-label="Zoom out simulated map"
            className="w-8 h-8 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 flex items-center justify-center border border-slate-700 shadow-md transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              setZoomLevel(1);
            }}
            aria-label="Recenter map"
            className="w-8 h-8 rounded-lg bg-slate-800/90 text-teal-400 hover:bg-slate-700 flex items-center justify-center border border-slate-700 shadow-md transition-colors"
            title="Recenter on Kolhapur"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Map Legend Footer */}
      <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span>Jan Aushadhi Outlet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Retail Pharmacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 ring-sky-300/30" />
            <span>Patient GPS</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500">
          Interactive SVG simulation • No paid map API required
        </div>
      </div>

    </div>
  );
};
