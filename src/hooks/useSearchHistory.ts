import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
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

interface SavedSearchRow {
  id: string;
  user_id: string;
  medicine_id: string;
  medicine_name: string;
  search_data: {
    brandName?: string;
    genericName?: string;
    potentialSavings?: number;
    savingsPercent?: number;
    bestStore?: string;
    brandedPrice?: number;
    genericPrice?: number;
  };
  created_at: string;
}

const GUEST_STORAGE_KEY = 'medigen_guest_search_history_v1';

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

function formatTimestamp(isoDateStr: string): { timestamp: string; dateStr: string } {
  try {
    const d = new Date(isoDateStr);
    if (isNaN(d.getTime())) {
      return { timestamp: 'Just now', dateStr: 'Today' };
    }

    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();

    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return { timestamp: `Today, ${timeStr}`, dateStr: 'Today' };
    }
    if (isYesterday) {
      return { timestamp: `Yesterday, ${timeStr}`, dateStr: 'Yesterday' };
    }

    const formattedDate = d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    return {
      timestamp: `${formattedDate}, ${timeStr}`,
      dateStr: formattedDate
    };
  } catch {
    return { timestamp: 'Recent', dateStr: 'Recent' };
  }
}

function mapRowToHistoryItem(row: SavedSearchRow): HistoryItem {
  const { timestamp, dateStr } = formatTimestamp(row.created_at);
  const data = row.search_data || {};
  return {
    id: row.id,
    medicineId: row.medicine_id,
    medicineName: row.medicine_name,
    brandName: data.brandName || row.medicine_name,
    genericName: data.genericName || '',
    timestamp,
    dateStr,
    potentialSavings: Number(data.potentialSavings ?? 0),
    savingsPercent: Number(data.savingsPercent ?? 0),
    bestStore: data.bestStore || 'Jan Aushadhi Kendra',
    brandedPrice: Number(data.brandedPrice ?? 0),
    genericPrice: Number(data.genericPrice ?? 0),
  };
}

function getInitialGuestHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_HISTORY));
    return INITIAL_DEFAULT_HISTORY;
  } catch {
    return INITIAL_DEFAULT_HISTORY;
  }
}

export function useSearchHistory() {
  const { user } = useAuth();
  const configured = isSupabaseConfigured();

  const [history, setHistory] = useState<HistoryItem[]>(() => (!user ? getInitialGuestHistory() : []));
  const [loading, setLoading] = useState<boolean>(Boolean(user && configured));
  const [error, setError] = useState<string | null>(null);

  // In-flight guard to avoid duplicate clicks creating multiple records
  const savingInProgressRef = useRef<boolean>(false);
  const activeUserIdRef = useRef<string | null>(null);

  // User-triggered manual refresh
  const refreshHistory = useCallback(async () => {
    const currentUserId = user?.id ?? null;
    activeUserIdRef.current = currentUserId;
    setLoading(true);
    setError(null);

    if (currentUserId && configured) {
      try {
        const { data, error: dbError } = await supabase
          .from('saved_searches')
          .select('*')
          .eq('user_id', currentUserId)
          .order('created_at', { ascending: false });

        if (activeUserIdRef.current !== currentUserId) return;

        if (dbError) {
          console.error('[MediGen SearchHistory] Supabase fetch error:', dbError.message);
          setError(dbError.message);
          setHistory([]);
        } else if (data) {
          const mapped = data.map((item) => mapRowToHistoryItem(item as SavedSearchRow));
          setHistory(mapped);
        }
      } catch (err: unknown) {
        if (activeUserIdRef.current !== currentUserId) return;
        const msg = err instanceof Error ? err.message : 'Failed to retrieve saved searches';
        setError(msg);
        setHistory([]);
      } finally {
        if (activeUserIdRef.current === currentUserId) {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  }, [user?.id, configured]);

  // Sync searches on user session change
  useEffect(() => {
    let isCancelled = false;
    const currentUserId = user?.id ?? null;
    activeUserIdRef.current = currentUserId;

    if (currentUserId && configured) {
      (async () => {
        try {
          const { data, error: dbError } = await supabase
            .from('saved_searches')
            .select('*')
            .eq('user_id', currentUserId)
            .order('created_at', { ascending: false });

          if (isCancelled || activeUserIdRef.current !== currentUserId) return;
          if (dbError) {
            console.error('[MediGen SearchHistory] Supabase fetch error:', dbError.message);
            setError(dbError.message);
            setHistory([]);
          } else if (data) {
            const mapped = data.map((item) => mapRowToHistoryItem(item as SavedSearchRow));
            setHistory(mapped);
          }
          setLoading(false);
        } catch (err: unknown) {
          if (isCancelled || activeUserIdRef.current !== currentUserId) return;
          const msg = err instanceof Error ? err.message : 'Failed to retrieve saved searches';
          console.error('[MediGen SearchHistory] Unexpected fetch error:', msg);
          setError(msg);
          setHistory([]);
          setLoading(false);
        }
      })();
    } else {
      // Guest mode: asynchronously load from localStorage so no cascading synchronous render
      Promise.resolve().then(() => {
        if (isCancelled || activeUserIdRef.current !== null) return;
        setHistory(getInitialGuestHistory());
        setLoading(false);
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [user?.id, configured]);

  // Sync guest history changes to localStorage
  useEffect(() => {
    if (!user) {
      try {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(history));
      } catch (err) {
        console.warn('[MediGen SearchHistory] Guest storage sync warning:', err);
      }
    }
  }, [history, user]);

  const saveSearch = async (item: SavedSearchPayload): Promise<HistoryItem | null> => {
    if (savingInProgressRef.current) {
      return null;
    }

    savingInProgressRef.current = true;

    try {
      if (user && configured) {
        // Authenticated: insert into public.saved_searches with session user ID
        const searchPayload = {
          brandName: item.brandName,
          genericName: item.genericName,
          potentialSavings: item.potentialSavings,
          savingsPercent: item.savingsPercent,
          bestStore: item.bestStore,
          brandedPrice: item.brandedPrice,
          genericPrice: item.genericPrice,
        };

        const { data, error: insertError } = await supabase
          .from('saved_searches')
          .insert({
            user_id: user.id, // Strictly use session user ID, never client-supplied ID
            medicine_id: item.medicineId,
            medicine_name: item.medicineName,
            search_data: searchPayload,
          })
          .select()
          .single();

        if (insertError) {
          console.error('[MediGen SearchHistory] Insert error:', insertError.message);
          setError(insertError.message);
          return null;
        }

        const newItem = mapRowToHistoryItem(data as SavedSearchRow);
        setHistory((prev) => [newItem, ...prev.filter((p) => p.id !== newItem.id)]);
        return newItem;
      } else {
        // Guest mode: local item creation
        const now = new Date();
        const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const newItem: HistoryItem = {
          ...item,
          id: `guest-hist-${Date.now()}`,
          timestamp: timeStr,
          dateStr: 'Today',
        };

        setHistory((prev) => {
          const filtered = prev.filter((p) => p.medicineId !== item.medicineId);
          return [newItem, ...filtered];
        });
        return newItem;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save search';
      console.error('[MediGen SearchHistory] Save error:', msg);
      setError(msg);
      return null;
    } finally {
      savingInProgressRef.current = false;
    }
  };

  const deleteSearch = async (id: string) => {
    // Optimistic UI update
    setHistory((prev) => prev.filter((item) => item.id !== id));

    if (user && configured) {
      try {
        const { error: deleteError } = await supabase
          .from('saved_searches')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id); // RLS and user_id guarantee ownership

        if (deleteError) {
          console.error('[MediGen SearchHistory] Delete error:', deleteError.message);
          setError(deleteError.message);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete record';
        setError(msg);
      }
    }
  };

  const clearAllHistory = async () => {
    setHistory([]);

    if (user && configured) {
      try {
        const { error: clearError } = await supabase
          .from('saved_searches')
          .delete()
          .eq('user_id', user.id); // Delete only the authenticated user's records

        if (clearError) {
          console.error('[MediGen SearchHistory] Clear error:', clearError.message);
          setError(clearError.message);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to clear history';
        setError(msg);
      }
    } else {
      try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const resetToSampleHistory = () => {
    // Only available in guest mode so we do NOT upload sample records to Supabase
    if (!user) {
      setHistory(INITIAL_DEFAULT_HISTORY);
      try {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_HISTORY));
      } catch {
        // ignore
      }
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
