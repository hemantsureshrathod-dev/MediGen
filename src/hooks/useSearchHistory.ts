import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

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

export interface SavedSearchPayload {
  medicineId: string;
  medicineName: string;
  brandName: string;
  genericName: string;
  potentialSavings: number;
  savingsPercent: number;
  bestStore: string;
  brandedPrice: number;
  genericPrice: number;
}

export const INITIAL_DEFAULT_HISTORY: HistoryItem[] = [
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

const STORAGE_KEY = 'medigen_search_history_v1';
const LEGACY_GUEST_KEY = 'medigen_guest_search_history_v1';

function getInitialHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_GUEST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Seed default sample history for educational demonstration
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_HISTORY));
    return INITIAL_DEFAULT_HISTORY;
  } catch {
    return INITIAL_DEFAULT_HISTORY;
  }
}

/**
 * Custom hook managing search history persisted strictly in browser LocalStorage
 * in exact accordance with the MediGen Field Project Report.
 * Operates uniformly for both guest visitors and authenticated users without
 * unexpected cache deletion or duplicate competing stores.
 */
export function useSearchHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>(getInitialHistory);
  const [loading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state changes to browser LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn('[MediGen SearchHistory] LocalStorage sync warning:', err);
    }
  }, [history]);

  // Reload history from LocalStorage
  const refreshHistory = useCallback(async () => {
    try {
      const items = getInitialHistory();
      setHistory(items);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reload search history';
      setError(msg);
    }
  }, []);

  // Save an analyzed medicine to LocalStorage
  const saveSearch = async (item: SavedSearchPayload): Promise<HistoryItem | null> => {
    try {
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      const newItem: HistoryItem = {
        ...item,
        id: `hist-${Date.now()}`,
        timestamp: timeStr,
        dateStr: 'Today',
      };

      setHistory((prev) => {
        const filtered = prev.filter((p) => p.medicineId !== item.medicineId);
        const updated = [newItem, ...filtered];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      return newItem;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save search';
      console.error('[MediGen SearchHistory] Save error:', msg);
      setError(msg);
      return null;
    }
  };

  // Delete an individual history item
  const deleteSearch = async (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Clear all items from LocalStorage
  const clearAllHistory = async () => {
    setHistory([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  // Restore academic demonstration sample records
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
    loading,
    error,
    isAuthenticated: Boolean(user),
    saveSearch,
    deleteSearch,
    clearAllHistory,
    resetToSampleHistory,
    refreshHistory,
  };
}
