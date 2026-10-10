export interface StorePrice {
  id: string;
  storeName: string;
  storeType: 'Jan Aushadhi' | 'Private Pharmacy' | 'Hospital Pharmacy';
  distanceKm: number;
  price: number;
  availability: 'Available' | 'Limited Stock' | 'Out of Stock';
  address: string;
  phone: string;
  openHours: string;
  coordinates: { x: number; y: number }; // Percentage for interactive SVG map
  lat: number;
  lng: number;
  isBestValue?: boolean;
  isNearest?: boolean;
}

export interface Medicine {
  id: string;
  brandName: string;
  popularBrands: string[];
  genericName: string;
  activeIngredient: string;
  strength: string;
  dosageForm: string; // Tablet, Capsule, Syrup, etc.
  packSize: string; // e.g. "Strip of 10 tablets"
  category: string; // e.g. "Cardiovascular", "Gastrointestinal", "Antidiabetic"
  therapeuticUse: string;
  brandedAvgPrice: number;
  genericAvgPrice: number;
  potentialSavingsPercent: number;
  description: string;
  equivalenceCriteria: {
    sameActiveIngredient: boolean;
    sameStrength: boolean;
    sameDosageForm: boolean;
    bioequivalenceStatus: string;
  };
  safetyNotes: {
    contraindications: string[];
    pharmacistQuestions: string[];
    criticalWarning: string;
  };
  storePrices: StorePrice[];
  isDemoData: boolean;
}

export const DEMO_MEDICINES: Medicine[] = [
  {
    id: 'atorvastatin-10',
    brandName: 'Atorva 10 / Lipitor',
    popularBrands: ['Lipitor', 'Atorva', 'Storvas', 'Atocor'],
    genericName: 'Atorvastatin Tablets IP 10 mg',
    activeIngredient: 'Atorvastatin',
    strength: '10 mg',
    dosageForm: 'Film-coated Tablet',
    packSize: '10 tablets per strip',
    category: 'Cardiovascular / Lipid Lowering',
    therapeuticUse: 'Lowers blood cholesterol and reduces risk of cardiovascular disease',
    brandedAvgPrice: 180,
    genericAvgPrice: 72,
    potentialSavingsPercent: 60,
    description: 'Atorvastatin is an HMG-CoA reductase inhibitor (statin) used to lower bad cholesterol (LDL) and triglycerides in the blood.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Pharmacopeial standard (IP/BP/USP) matching chemical composition and release profile.'
    },
    safetyNotes: {
      contraindications: [
        'Active liver disease or unexplained persistent elevations of transaminases',
        'Pregnancy and breastfeeding (Category X)',
        'Known hypersensitivity to atorvastatin'
      ],
      pharmacistQuestions: [
        'Is the generic salt formulation identical to my prescribed brand?',
        'Does the generic have the same film coating and absorption profile?',
        'Are there any specific dietary restrictions with this generic strip?'
      ],
      criticalWarning: 'Never discontinue or alter statin dosage without direct physician consultation. Blood lipid levels and liver enzymes should be monitored periodically.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 72,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 165,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 110,
        availability: 'Limited Stock',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      },
      {
        id: 'medplus-01',
        storeName: 'MedPlus Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 2.4,
        price: 145,
        availability: 'Available',
        address: 'Rajarampuri 5th Lane, Main Road, Kolhapur',
        phone: '+91 231 2529944',
        openHours: '8:00 AM – 11:00 PM',
        coordinates: { x: 72, y: 55 },
        lat: 16.6910,
        lng: 74.2560,
      }
    ],
    isDemoData: true
  },
  {
    id: 'pantoprazole-40',
    brandName: 'Pan 40 / Pantocid',
    popularBrands: ['Pan 40', 'Pantocid', 'Pantodac', 'Protonix'],
    genericName: 'Pantoprazole Gastro-resistant Tablets IP 40 mg',
    activeIngredient: 'Pantoprazole Sodium',
    strength: '40 mg',
    dosageForm: 'Enteric-coated Tablet',
    packSize: '10 tablets per strip',
    category: 'Gastrointestinal / Proton Pump Inhibitor (PPI)',
    therapeuticUse: 'Relief of gastric acidity, GERD, and peptic ulcer prophylaxis',
    brandedAvgPrice: 155,
    genericAvgPrice: 58,
    potentialSavingsPercent: 62,
    description: 'Pantoprazole reduces stomach acid secretion by inhibiting the gastric proton pump (H+/K+ ATPase) enzyme.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Enteric coated generic equivalent matches gastric acid dissolution standard.'
    },
    safetyNotes: {
      contraindications: [
        'Hypersensitivity to substituted benzimidazoles',
        'Co-administration with rilpivirine-containing products'
      ],
      pharmacistQuestions: [
        'Is this tablet enteric-coated to prevent degradation in gastric acid?',
        'Should I take this 30 minutes before breakfast as prescribed?'
      ],
      criticalWarning: 'Long-term PPI use may affect magnesium and vitamin B12 absorption. Take on an empty stomach 30-60 minutes before breakfast.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 58,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 142,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 95,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      }
    ],
    isDemoData: true
  },
  {
    id: 'metformin-500',
    brandName: 'Glycomet 500 / Glucophage',
    popularBrands: ['Glycomet', 'Glucophage', 'Obimet', 'Formin'],
    genericName: 'Metformin Hydrochloride Tablets IP 500 mg',
    activeIngredient: 'Metformin Hydrochloride',
    strength: '500 mg',
    dosageForm: 'Immediate-release Tablet',
    packSize: '20 tablets per strip',
    category: 'Endocrinology / Anti-diabetic',
    therapeuticUse: 'First-line medication for treatment of type 2 diabetes mellitus',
    brandedAvgPrice: 65,
    genericAvgPrice: 22,
    potentialSavingsPercent: 66,
    description: 'Metformin reduces hepatic glucose production and improves insulin sensitivity in peripheral tissues.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Chemical assay and dissolution rate conform to Indian Pharmacopoeia monographs.'
    },
    safetyNotes: {
      contraindications: [
        'Severe renal impairment (eGFR < 30 mL/min/1.73 m²)',
        'Acute or chronic metabolic acidosis (including diabetic ketoacidosis)'
      ],
      pharmacistQuestions: [
        'Is this standard release or extended release (SR/ER)? Prescriptions must match release mechanism.',
        'Should this be taken with or immediately after meals?'
      ],
      criticalWarning: 'Never substitute Immediate Release (IR) with Sustained Release (SR/ER) without doctor review. Renal function must be tested periodically.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 22,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 45,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      },
      {
        id: 'medplus-01',
        storeName: 'MedPlus Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 2.4,
        price: 58,
        availability: 'Available',
        address: 'Rajarampuri 5th Lane, Main Road, Kolhapur',
        phone: '+91 231 2529944',
        openHours: '8:00 AM – 11:00 PM',
        coordinates: { x: 72, y: 55 },
        lat: 16.6910,
        lng: 74.2560,
      }
    ],
    isDemoData: true
  },
  {
    id: 'amlodipine-5',
    brandName: 'Amlong 5 / Norvasc',
    popularBrands: ['Amlong', 'Norvasc', 'Amlovas', 'Stamlo'],
    genericName: 'Amlodipine Besylate Tablets IP 5 mg',
    activeIngredient: 'Amlodipine',
    strength: '5 mg',
    dosageForm: 'Tablet',
    packSize: '15 tablets per strip',
    category: 'Cardiovascular / Calcium Channel Blocker',
    therapeuticUse: 'Treatment of hypertension and chronic stable angina',
    brandedAvgPrice: 98,
    genericAvgPrice: 28,
    potentialSavingsPercent: 71,
    description: 'Amlodipine inhibits calcium ion influx across vascular smooth-muscle and cardiac muscle cells, relaxing blood vessels.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Molecular equivalent with validated bio-availability profile.'
    },
    safetyNotes: {
      contraindications: [
        'Severe hypotension',
        'Cardiogenic shock or severe aortic stenosis'
      ],
      pharmacistQuestions: [
        'Is the salt compound besylate, maleate or plain amlodipine base?',
        'Does the generic tablet match my doctor’s once-daily morning schedule?'
      ],
      criticalWarning: 'Sudden stoppage of anti-hypertensive drugs may cause rebound blood pressure spike. Monitor ankle swelling (peripheral edema).'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 28,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 88,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 60,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      }
    ],
    isDemoData: true
  },
  {
    id: 'azithromycin-500',
    brandName: 'Azithral 500 / Zithromax',
    popularBrands: ['Azithral', 'Zithromax', 'Azee', 'Zady'],
    genericName: 'Azithromycin Tablets IP 500 mg',
    activeIngredient: 'Azithromycin Dihydrate',
    strength: '500 mg',
    dosageForm: 'Film-coated Tablet',
    packSize: '5 tablets per strip',
    category: 'Infectious Diseases / Macrolide Antibiotic',
    therapeuticUse: 'Bacterial infections of respiratory tract, skin, and ear',
    brandedAvgPrice: 140,
    genericAvgPrice: 55,
    potentialSavingsPercent: 61,
    description: 'Azithromycin binds to the 50S ribosomal subunit of susceptible microorganisms, inhibiting transpeptidation protein synthesis.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Pharmacopeial standard generic with matching microbial potency standards.'
    },
    safetyNotes: {
      contraindications: [
        'Known hypersensitivity to azithromycin, erythromycin, or any macrolide',
        'History of cholestatic jaundice/hepatic dysfunction associated with prior azithromycin use'
      ],
      pharmacistQuestions: [
        'Does this generic pack contain the exact 3 or 5-day course specified by my doctor?',
        'Can I take this with antacids or should I space them out by 2 hours?'
      ],
      criticalWarning: 'Complete the entire prescribed antibiotic course even if symptoms improve to prevent bacterial resistance. Do not take with aluminum-based antacids.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 55,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 130,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 90,
        availability: 'Limited Stock',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      }
    ],
    isDemoData: true
  },
  {
    id: 'cetirizine-10',
    brandName: 'Cetzine 10 / Zyrtec',
    popularBrands: ['Cetzine', 'Zyrtec', 'Alerid', 'Okacet'],
    genericName: 'Cetirizine Hydrochloride Tablets IP 10 mg',
    activeIngredient: 'Cetirizine Hydrochloride',
    strength: '10 mg',
    dosageForm: 'Film-coated Tablet',
    packSize: '10 tablets per strip',
    category: 'Allergy & Immunology / Antihistamine',
    therapeuticUse: 'Relief of symptoms associated with seasonal allergic rhinitis, urticaria, and pruritus',
    brandedAvgPrice: 48,
    genericAvgPrice: 12,
    potentialSavingsPercent: 75,
    description: 'Cetirizine is a second-generation selective peripheral H1-receptor antagonist with low sedative effects.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Standard pharmacopeial formulation matching H1-receptor inhibition profile.'
    },
    safetyNotes: {
      contraindications: [
        'Patients with end-stage renal disease (CrCl < 10 mL/min)',
        'Known hypersensitivity to cetirizine or hydroxyzine'
      ],
      pharmacistQuestions: [
        'Does this generic cause daytime drowsiness?',
        'Can I drive or operate machinery while taking this medication?'
      ],
      criticalWarning: 'May cause mild drowsiness. Avoid alcohol consumption or concurrent central nervous system depressants.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 12,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 25,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 45,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      }
    ],
    isDemoData: true
  },
  {
    id: 'paracetamol-500',
    brandName: 'Crocin 500 / Calpol',
    popularBrands: ['Crocin', 'Calpol', 'Dolo 500', 'Pacimol'],
    genericName: 'Paracetamol Tablets IP 500 mg',
    activeIngredient: 'Paracetamol (Acetaminophen)',
    strength: '500 mg',
    dosageForm: 'Uncoated Tablet',
    packSize: '15 tablets per strip',
    category: 'Analgesics & Antipyretics',
    therapeuticUse: 'Mild to moderate pain relief and fever reduction',
    brandedAvgPrice: 35,
    genericAvgPrice: 10,
    potentialSavingsPercent: 71,
    description: 'Paracetamol exerts analgesic and antipyretic actions primarily via central nervous system cyclooxygenase inhibition.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Standard pharmacopeial generic meeting chemical purity and dissolution limits.'
    },
    safetyNotes: {
      contraindications: [
        'Severe active hepatic impairment or severe active liver disease',
        'Hypersensitivity to paracetamol'
      ],
      pharmacistQuestions: [
        'Does my cold/flu cough syrup also contain paracetamol? (Avoid accidental overdose)',
        'What is the maximum safe daily dose for my weight?'
      ],
      criticalWarning: 'Never exceed 4000 mg (4 grams) in 24 hours. Check other combination medicines to avoid accidental toxic paracetamol overdose.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 10,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 20,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 32,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      }
    ],
    isDemoData: true
  },
  {
    id: 'omeprazole-20',
    brandName: 'Omez 20 / Prilosec',
    popularBrands: ['Omez', 'Prilosec', 'Ocid', 'Lokit'],
    genericName: 'Omeprazole Capsules IP 20 mg',
    activeIngredient: 'Omeprazole',
    strength: '20 mg',
    dosageForm: 'Capsule (Delayed Release Pellets)',
    packSize: '15 capsules per strip',
    category: 'Gastrointestinal / Proton Pump Inhibitor',
    therapeuticUse: 'Heartburn, gastroesophageal reflux disease, and gastric ulcer management',
    brandedAvgPrice: 85,
    genericAvgPrice: 28,
    potentialSavingsPercent: 67,
    description: 'Omeprazole is a proton pump inhibitor that suppresses stomach acid secretion by specific inhibition of the H+/K+-ATPase enzyme system.',
    equivalenceCriteria: {
      sameActiveIngredient: true,
      sameStrength: true,
      sameDosageForm: true,
      bioequivalenceStatus: 'Delayed-release enteric coated micro-pellet formulation conforming to IP monograph.'
    },
    safetyNotes: {
      contraindications: [
        'Hypersensitivity to omeprazole or substituted benzimidazoles',
        'Concomitant administration with nelfinavir or rilpivirine'
      ],
      pharmacistQuestions: [
        'Should this capsule be swallowed whole without chewing or crushing?',
        'Does this interfere with my morning thyroid or calcium supplements?'
      ],
      criticalWarning: 'Do not crush or chew delayed-release capsules. Swallow whole with a glass of water on an empty stomach.'
    },
    storePrices: [
      {
        id: 'pmbjk-01',
        storeName: 'Pradhan Mantri Jan Aushadhi Kendra',
        storeType: 'Jan Aushadhi',
        distanceKm: 1.8,
        price: 28,
        availability: 'Available',
        address: 'Shop 4, Civil Hospital Road, Opp. S.T. Stand, Kolhapur',
        phone: '+91 231 2654321',
        openHours: '8:30 AM – 9:00 PM',
        coordinates: { x: 38, y: 44 },
        lat: 16.7050,
        lng: 74.2433,
        isBestValue: true,
      },
      {
        id: 'local-01',
        storeName: 'Sanjeevani Medico & General Store',
        storeType: 'Private Pharmacy',
        distanceKm: 0.7,
        price: 52,
        availability: 'Available',
        address: 'Laxmipuri Main Market, Near Shivaji Chowk, Kolhapur',
        phone: '+91 231 2621188',
        openHours: '9:00 AM – 10:30 PM',
        coordinates: { x: 48, y: 62 },
        lat: 16.6980,
        lng: 74.2380,
        isNearest: true,
      },
      {
        id: 'apollo-01',
        storeName: 'Apollo Pharmacy',
        storeType: 'Private Pharmacy',
        distanceKm: 1.2,
        price: 80,
        availability: 'Available',
        address: 'Plot 12, Station Road, New Shahupuri, Kolhapur',
        phone: '+91 231 2548900',
        openHours: '24 Hours Open',
        coordinates: { x: 55, y: 35 },
        lat: 16.7025,
        lng: 74.2480,
      }
    ],
    isDemoData: true
  }
];

export const MOCK_PRESCRIPTION_PRESETS = [
  {
    id: 'rx-atorva',
    title: 'Cardiology Clinic Prescription',
    doctor: 'Dr. R. K. Deshmukh, MD (Cardiology)',
    clinic: 'Apex Heart & Vascular Centre, Kolhapur',
    date: '08-Oct-2026',
    patient: 'Hemant R. (Age 42 / M)',
    detectedMedicineId: 'atorvastatin-10',
    detectedMedicineName: 'Tab. Atorva 10 mg (Atorvastatin)',
    confidence: 96,
    dosage: '1 Tab OD (Once daily at bedtime) for 30 days',
    imageType: 'cardiology'
  },
  {
    id: 'rx-panto',
    title: 'Gastroenterology Consultation',
    doctor: 'Dr. Ananya Joshi, MBBS, MD (Medicine)',
    clinic: 'Kolhapur Gastro Care Hospital',
    date: '07-Oct-2026',
    patient: 'S. Patil (Age 35 / F)',
    detectedMedicineId: 'pantoprazole-40',
    detectedMedicineName: 'Tab. Pan 40 mg (Pantoprazole)',
    confidence: 94,
    dosage: '1 Tab before breakfast for 15 days',
    imageType: 'gastro'
  },
  {
    id: 'rx-metformin',
    title: 'Endocrinology & Diabetic Care',
    doctor: 'Dr. Suresh Patil, Diabetologist',
    clinic: 'LifeCare Diabetes Center',
    date: '05-Oct-2026',
    patient: 'P. Kadam (Age 54 / M)',
    detectedMedicineId: 'metformin-500',
    detectedMedicineName: 'Tab. Glycomet 500 mg (Metformin)',
    confidence: 98,
    dosage: '1 Tab BD (Twice daily after meals)',
    imageType: 'diabetes'
  }
];

export function findMedicineById(id: string): Medicine | undefined {
  return DEMO_MEDICINES.find(m => m.id === id);
}

export function searchMedicines(query: string): Medicine[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return DEMO_MEDICINES.filter(m => 
    m.brandName.toLowerCase().includes(q) ||
    m.genericName.toLowerCase().includes(q) ||
    m.activeIngredient.toLowerCase().includes(q) ||
    m.popularBrands.some(b => b.toLowerCase().includes(q))
  );
}
