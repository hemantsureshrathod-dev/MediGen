import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findMedicineById, StorePrice } from '../data/medicines';
import { ProgressStepper } from '../components/ProgressStepper';
import { InteractiveMapPanel } from '../components/InteractiveMapPanel';
import { StoreDetailModal } from '../components/StoreDetailModal';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Navigation
} from 'lucide-react';

export const NearbyStoresPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const medicine = findMedicineById(id || '');

  // Filter & Sort State
  const [filterType, setFilterType] = useState<'ALL' | 'JAN_AUSHADHI' | 'PHARMACY'>('ALL');
  const [sortBy, setSortBy] = useState<'DISTANCE' | 'PRICE' | 'AVAILABILITY'>('DISTANCE');
  const [selectedStore, setSelectedStore] = useState<StorePrice | null>(null);
  const [modalStore, setModalStore] = useState<StorePrice | null>(null);
  const [gpsSimulatedNotice, setGpsSimulatedNotice] = useState(false);

  if (!medicine) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Medicine Not Found</h2>
        <Link to="/scan" className="inline-block px-4 py-2 bg-medigen-navy text-white text-xs font-semibold rounded-lg">
          Back to Scanner
        </Link>
      </div>
    );
  }

  // Filter stores
  let displayedStores = [...medicine.storePrices].filter(s => {
    if (filterType === 'JAN_AUSHADHI') return s.storeType === 'Jan Aushadhi';
    if (filterType === 'PHARMACY') return s.storeType !== 'Jan Aushadhi';
    return true;
  });

  // Sort stores
  displayedStores.sort((a, b) => {
    if (sortBy === 'DISTANCE') return a.distanceKm - b.distanceKm;
    if (sortBy === 'PRICE') return a.price - b.price;
    if (sortBy === 'AVAILABILITY') {
      const score = (status: string) => status === 'Available' ? 2 : status === 'Limited Stock' ? 1 : 0;
      return score(b.availability) - score(a.availability);
    }
    return 0;
  });

  const handleSimulateGPS = () => {
    setGpsSimulatedNotice(true);
    setTimeout(() => setGpsSimulatedNotice(false), 4000);
  };

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper for Step 5 Locate */}
      <ProgressStepper currentStep="stores" medicineId={medicine.id} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => navigate(`/verify/${medicine.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Safety Checklist</span>
          </button>

          {/* Prototype Location simulation indicator */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateGPS}
              className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Use Simulated GPS Location (Kolhapur)</span>
            </button>
          </div>
        </div>

        {gpsSimulatedNotice && (
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 animate-in fade-in duration-150 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Location locked: <strong>Laxmipuri / Rankala junction, Kolhapur (Prototype GPS)</strong></span>
            </div>
            <span className="text-[10px] text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200">
              Zero paid API tokens consumed
            </span>
          </div>
        )}

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nearby Store Discovery & Inventory
          </h1>
          <p className="text-sm text-slate-600">
            Locate stock of <strong className="text-slate-800">{medicine.genericName}</strong> at nearby government outlets and private pharmacies.
          </p>
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Outlet Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] self-center mr-1">Filter:</span>
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setFilterType('JAN_AUSHADHI')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === 'JAN_AUSHADHI'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Jan Aushadhi Kendra
            </button>
            <button
              onClick={() => setFilterType('PHARMACY')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === 'PHARMACY'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Private Pharmacy
            </button>
          </div>

          {/* Sort options */}
          <div className="flex items-center gap-2 text-xs w-full md:w-auto justify-end">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="DISTANCE">Nearest Distance</option>
              <option value="PRICE">Lowest Price</option>
              <option value="AVAILABILITY">Stock Availability</option>
            </select>
          </div>

        </div>

        {/* 2-Column Responsive Layout: Map on Left, Store Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Vector Map Panel */}
          <div className="lg:col-span-7">
            <InteractiveMapPanel
              stores={medicine.storePrices}
              selectedStore={selectedStore || medicine.storePrices[0]}
              onSelectStore={(store) => {
                setSelectedStore(store);
              }}
            />
          </div>

          {/* Right Column: Store Cards List */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Outlets in Kolhapur ({displayedStores.length} matching)
              </h3>
              <span className="text-[11px] text-teal-700 font-semibold">
                Click store to view on map
              </span>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {displayedStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;
                const isJanAushadhi = store.storeType === 'Jan Aushadhi';
                const savings = medicine.brandedAvgPrice - store.price;

                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer shadow-soft-sm relative ${
                      isSelected 
                        ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isJanAushadhi 
                          ? 'bg-teal-50 text-teal-800 border border-teal-200' 
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {store.storeType}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {store.isBestValue && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            ★ BEST VALUE
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-semibold">
                          {store.distanceKm} km away
                        </span>
                      </div>
                    </div>

                    {/* Store Title & Address */}
                    <h4 className="text-sm font-bold text-slate-900">
                      {store.storeName}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {store.address}
                    </p>

                    {/* Pricing & Stock Grid */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-extrabold text-slate-900">₹{store.price}</span>
                          {savings > 0 && (
                            <span className="text-[11px] font-semibold text-emerald-700">
                              Save ₹{savings}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {store.openHours}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {store.availability}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalStore(store);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-medigen-navy hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Quick Summary Navigation CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const targetStore = selectedStore || displayedStores[0];
                  navigate(`/summary/${medicine.id}?storeId=${targetStore?.id || ''}`);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span>Complete Journey & View Summary</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Store Detail Modal */}
      {modalStore && (
        <StoreDetailModal
          store={modalStore}
          medicine={medicine}
          onClose={() => setModalStore(null)}
        />
      )}

    </div>
  );
};
