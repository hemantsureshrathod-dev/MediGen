import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ScanPage } from './pages/ScanPage';
import { MedicineAnalysisPage } from './pages/MedicineAnalysisPage';
import { GenericMatchPage } from './pages/GenericMatchPage';
import { PriceComparisonPage } from './pages/PriceComparisonPage';
import { SafetyVerificationPage } from './pages/SafetyVerificationPage';
import { NearbyStoresPage } from './pages/NearbyStoresPage';
import { SummaryPage } from './pages/SummaryPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
        
        {/* Academic Prototype Notice & Healthcare Safety Disclaimer */}
        <DemoBanner />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/medicine/:id" element={<MedicineAnalysisPage />} />
            <Route path="/match/:id" element={<GenericMatchPage />} />
            <Route path="/compare/:id" element={<PriceComparisonPage />} />
            <Route path="/verify/:id" element={<SafetyVerificationPage />} />
            <Route path="/stores/:id" element={<NearbyStoresPage />} />
            <Route path="/summary/:id" element={<SummaryPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Professional Healthcare Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;
