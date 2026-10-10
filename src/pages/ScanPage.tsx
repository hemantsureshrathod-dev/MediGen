import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressStepper } from '../components/ProgressStepper';
import { 
  MOCK_PRESCRIPTION_PRESETS, 
  DEMO_MEDICINES, 
  searchMedicines 
} from '../data/medicines';
import { 
  Upload, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle,
  ShieldCheck,
  FileQuestion,
  X
} from 'lucide-react';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();

  // Active Tab: 'upload' or 'manual'
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');

  // OCR state simulation
  const [selectedPreset, setSelectedPreset] = useState<typeof MOCK_PRESCRIPTION_PRESETS[0] | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgressText, setScanProgressText] = useState('Initializing scan...');
  const [detectedMedicine, setDetectedMedicine] = useState<typeof MOCK_PRESCRIPTION_PRESETS[0] | null>(null);
  const [ocrFailed, setOcrFailed] = useState(false);

  // Manual search state
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchQuery ? searchMedicines(searchQuery) : DEMO_MEDICINES;

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Handle preset selection or file drop
  const handleTriggerScan = (preset: typeof MOCK_PRESCRIPTION_PRESETS[0], isCustomUpload = false) => {
    setSelectedPreset(preset);
    setFileError(null);
    setOcrFailed(false);
    if (!isCustomUpload) {
      setUploadedFileName(`${preset.title.toLowerCase().replace(/\s+/g, '_')}_prescription.jpg`);
      setImagePreviewUrl(null);
    }
    setIsScanning(true);
    setDetectedMedicine(null);

    // Simulate progressive OCR analysis stages
    setTimeout(() => setScanProgressText('Enhancing prescription contrast & document geometry...'), 400);
    setTimeout(() => setScanProgressText('Detecting handwritten Rx notation & active chemical salts...'), 1100);
    setTimeout(() => setScanProgressText('Grounding against Indian Pharmacopoeia monographs...'), 1800);

    setTimeout(() => {
      setIsScanning(false);
      setDetectedMedicine(preset);
    }, 2400);
  };

  // Simulate an unreadable or low-confidence prescription scan (Graceful Error State)
  const handleTriggerUnclearScan = () => {
    setSelectedPreset(null);
    setFileError(null);
    setDetectedMedicine(null);
    setOcrFailed(false);
    setUploadedFileName('unclear_handwritten_note.jpg');
    setIsScanning(true);

    setTimeout(() => setScanProgressText('Analyzing blurry handwritten note...'), 400);
    setTimeout(() => setScanProgressText('Confidence score below safety threshold (34%)...'), 1400);

    setTimeout(() => {
      setIsScanning(false);
      setOcrFailed(true);
    }, 2000);
  };

  // Handle generic file input simulation with validation & preview
  const handleGenericFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setOcrFailed(false);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';

      if (!validExtensions.includes(fileExt)) {
        setFileError(`Unsupported file format (.${fileExt || 'unknown'}). Please upload a clear image (JPG, PNG, WebP) or PDF prescription document.`);
        return;
      }

      setUploadedFileName(file.name);
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        setImagePreviewUrl(preview);
      } else {
        setImagePreviewUrl(null);
      }

      // Map to default cardiology preset for demonstration
      handleTriggerScan(MOCK_PRESCRIPTION_PRESETS[0], true);
    }
  };

  const handleProceedToAnalysis = (medicineId: string) => {
    navigate(`/medicine/${medicineId}`);
  };

  return (
    <div className="min-h-screen pb-16 bg-[#F8FAFC]">
      {/* Progress Stepper for Step 1 Scan */}
      <ProgressStepper currentStep="scan" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Stage 01 • Prescription Acquisition
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's understand your prescription
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Upload a prescription or enter a medicine manually to initiate verified generic matching.
          </p>
        </div>

        {/* Tab Toggle: Upload Prescription vs Enter Medicine Manually */}
        <div className="flex justify-center">
          <div className="p-1 bg-slate-200/80 rounded-xl inline-flex gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4 text-teal-600" />
              <span>Upload Prescription</span>
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'manual'
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-teal-600" />
              <span>Enter Medicine Manually</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: UPLOAD PRESCRIPTION ================= */}
        {activeTab === 'upload' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Quick Demo Presets Banner */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Recommended For Live Demo: Click a Sample Prescription
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTriggerUnclearScan}
                    className="text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded border border-amber-200 transition-colors"
                    title="Simulate unreadable prescription error state"
                  >
                    Test Unreadable Scan Error State
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MOCK_PRESCRIPTION_PRESETS.map((preset) => {
                  const isSelected = selectedPreset?.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleTriggerScan(preset)}
                      className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                        isSelected 
                          ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20' 
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                        <span className="truncate">{preset.title}</span>
                        <span className="text-[10px] text-teal-700 bg-white px-1.5 py-0.5 rounded border border-teal-200">
                          96% match
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{preset.doctor}</div>
                      <div className="text-[11px] font-semibold text-slate-700 mt-2 truncate text-teal-700">
                        → {preset.detectedMedicineName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Invalid File Error Notification */}
            {fileError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start justify-between gap-3 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Invalid File Format</strong>
                    <span>{fileError}</span>
                  </div>
                </div>
                <button
                  onClick={() => setFileError(null)}
                  className="text-red-700 hover:text-red-900"
                  aria-label="Dismiss error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-slate-300 hover:border-teal-500 transition-colors text-center shadow-soft relative">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handleGenericFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                aria-label="Upload prescription image"
              />

              <div className="max-w-md mx-auto space-y-3 pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
                  <Upload className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Drop your prescription here
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    or choose an image / PDF document from your device
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-medium">
                  <span>JPG</span>
                  <span>•</span>
                  <span>PNG</span>
                  <span>•</span>
                  <span>PDF (Scan)</span>
                </div>
              </div>
            </div>

            {/* Image Preview Thumbnail (if custom image uploaded) */}
            {imagePreviewUrl && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <img 
                  src={imagePreviewUrl} 
                  alt="Prescription preview" 
                  className="w-16 h-16 object-cover rounded-lg border border-slate-300"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Uploaded Prescription Preview</span>
                  <span className="text-slate-500">{uploadedFileName}</span>
                </div>
              </div>
            )}

            {/* Scanning Progress State */}
            {isScanning && (
              <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-soft-lg text-center space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-600 mb-1">
                  <RefreshCw className="w-6 h-6 animate-spin text-teal-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Reading Prescription via Simulated OCR...
                  </h4>
                  <p className="text-xs text-teal-700 font-medium mt-1">
                    {scanProgressText}
                  </p>
                </div>

                <div className="max-w-md mx-auto w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full animate-pulse w-3/4" />
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Simulated OCR processing pipeline for prototype evaluation
                </span>
              </div>
            )}

            {/* Unsuccessful OCR Detection Error State */}
            {ocrFailed && !isScanning && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-amber-300 shadow-soft-lg space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <FileQuestion className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      We couldn't confidently identify this medicine
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      The prescription image handwriting or contrast was unclear (Confidence: 34% — below safety threshold).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Document: <span className="font-mono text-slate-800">{uploadedFileName}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('manual')}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-medigen-navy text-white text-xs font-semibold hover:bg-slate-900 shadow-sm transition-colors text-center"
                  >
                    Enter Medicine Manually
                  </button>
                  <button
                    onClick={() => {
                      setOcrFailed(false);
                      handleTriggerScan(MOCK_PRESCRIPTION_PRESETS[0]);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors text-center"
                  >
                    Try Sample Clear Prescription
                  </button>
                </div>
              </div>
            )}

            {/* Detected Medicine Card (Result of OCR) */}
            {detectedMedicine && !isScanning && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-teal-300 shadow-soft-lg space-y-5 animate-in slide-in-from-bottom-2 duration-300">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Prescription Scanned Successfully
                    </span>
                    <span className="text-xs text-slate-500">
                      Confidence: <strong className="text-slate-800">{detectedMedicine.confidence}%</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    Document: <span className="font-mono text-slate-600">{uploadedFileName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Left: Detected Clinical Prescription Metadata */}
                  <div className="md:col-span-2 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Detected Prescribed Medicine
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {detectedMedicine.detectedMedicineName}
                    </h3>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-700">Prescribing Clinician:</strong> {detectedMedicine.doctor} • {detectedMedicine.clinic}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-700">Dosage Regimen:</strong> {detectedMedicine.dosage}
                    </p>
                  </div>

                  {/* Right: Review & Confirm CTA */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleProceedToAnalysis(detectedMedicine.detectedMedicineId)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-medigen-navy hover:bg-slate-900 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
                    >
                      <span>Review Medicine</span>
                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('manual')}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1.5 transition-colors"
                    >
                      Didn't detect the right medicine? Enter manually
                    </button>
                  </div>

                </div>

                {/* Safety notice micro-box */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>OCR extracted text from prescription image. Final clinical verification is required with your pharmacist.</span>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: MANUAL SEARCH ================= */}
        {activeTab === 'manual' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search Input Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
              <label htmlFor="medicine-search" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Search Prescribed Medicine or Active Salt
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="medicine-search"
                  type="text"
                  placeholder="E.g., Atorvastatin 10 mg, Pantoprazole 40 mg, Metformin 500 mg, Lipitor, Pan 40..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-inner"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                <span>Autocomplete grounded in structured prototype medicine database</span>
                <span className="font-semibold text-teal-700">{searchResults.length} records found</span>
              </div>
            </div>

            {/* Search Results List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {searchQuery ? 'Matching Medicines' : 'Available Demo Records (Select to Test):'}
              </h3>

              {searchResults.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No medicine found for "{searchQuery}"</p>
                  <p className="text-xs text-slate-500">Please choose one of the available demo medications from the list or clear your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-teal-600 font-semibold underline"
                  >
                    View all demo medicines
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.map((med) => (
                    <div
                      key={med.id}
                      onClick={() => handleProceedToAnalysis(med.id)}
                      className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-teal-500 hover:shadow-soft transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {med.brandName}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {med.dosageForm}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Active: <strong className="text-slate-700">{med.activeIngredient}</strong> ({med.strength})
                        </div>
                        <div className="text-xs text-teal-600 font-semibold">
                          Potential generic savings: {med.potentialSavingsPercent}%
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-teal-600 transition-colors">
                        <span>Select</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
