import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  medicineId: string;
  medicineName: string;
  brandName: string;
  genericName: string;
  timestamp: string;
  dateStr: string;
  potentialSavings: number;
  savingsPercent: number;
  bestStore: string;
  brandedPrice: number;
  genericPrice: number;
}

const STORAGE_KEY = 'medigen_search_history_v1';

const INITIAL_DEFAULT_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    medicineId: 'atorvastatin-10',
    medicineName: 'Atorvastatin 10 mg',
    brandName: 'Atorva 10 / Lipitor',
    genericName: 'Atorvastatin Tablets IP 10 mg',
    timestamp: 'Today, 10:15 AM',
    dateStr: 'Today',
    potentialSavings: 108,
    savingsPercent: 60,
    bestStore: 'Pradhan Mantri Jan Aushadhi Kendra',
    brandedPrice: 180,
    genericPrice: 72,
  },
  {
    id: 'hist-2',
    medicineId: 'pantoprazole-40',
    medicineName: 'Pantoprazole 40 mg',
    brandName: 'Pan 40 / Pantocid',
    genericName: 'Pantoprazole Gastro-resistant Tablets IP 40 mg',
    timestamp: 'Yesterday, 4:20 PM',
    dateStr: 'Yesterday',
    potentialSavings: 97,
    savingsPercent: 62,
    bestStore: 'Pradhan Mantri Jan Aushadhi Kendra',
    brandedPrice: 155,
    genericPrice: 58,
  },
  {
    id: 'hist-3',
    medicineId: 'metformin-500',
    medicineName: 'Metformin 500 mg',
    brandName: 'Glycomet 500 / Glucophage',
    genericName: 'Metformin Hydrochloride Tablets IP 500 mg',
    timestamp: 'Oct 07, 2026, 2:45 PM',
    dateStr: '07-Oct-2026',
    potentialSavings: 43,
    savingsPercent: 66,
    bestStore: 'Pradhan Mantri Jan Aushadhi Kendra',
    brandedPrice: 65,
    genericPrice: 22,
  }
];

export function useSearchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_HISTORY));
      return INITIAL_DEFAULT_HISTORY;
    } catch {
      return INITIAL_DEFAULT_HISTORY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.error('Failed to save history to localStorage', err);
    }
  }, [history]);

  const saveSearch = (item: Omit<HistoryItem, 'id' | 'timestamp' | 'dateStr'>) => {
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newItem: HistoryItem = {
      ...item,
      id: `hist-${Date.now()}`,
      timestamp: timeStr,
      dateStr: 'Today',
    };
    setHistory(prev => {
      // Remove duplicate if same medicine was already in the top
      const filtered = prev.filter(p => p.medicineId !== item.medicineId);
      return [newItem, ...filtered];
    });
    return newItem;
  };

  const deleteSearch = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const resetToSampleHistory = () => {
    setHistory(INITIAL_DEFAULT_HISTORY);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_HISTORY));
    } catch {
      // ignore
    }
  };

  return {
    history,
    saveSearch,
    deleteSearch,
    clearAllHistory,
    resetToSampleHistory
  };
}
