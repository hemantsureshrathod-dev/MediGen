import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AuthContext, AuthResponse, UserProfile } from './authContextDef';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  // If not configured, we are not loading; if configured, we load until session is restored
  const [loading, setLoading] = useState<boolean>(configured);

  const activeUserIdRef = useRef<string | null>(null);

  const fetchProfile = async (currentUser: User) => {
    activeUserIdRef.current = currentUser.id;
    setProfileLoading(true);
    setProfileError(null);

    try {
      // 1. Attempt to fetch profile for the current user only
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      // Guard against race conditions if session changed during async call
      if (activeUserIdRef.current !== currentUser.id) return;

      if (error) {
        console.warn('[MediGen Auth] Profile fetch notice:', error.message);
        setProfileError(error.message);
        // Fallback display profile so the UI remains usable
        setProfile({
          id: currentUser.id,
          display_name: currentUser.user_metadata?.display_name || currentUser.email?.split('@')[0] || 'User',
          created_at: currentUser.created_at || null,
          updated_at: null,
        });
        return;
      }

      if (!data) {
        // Profile row does not exist yet. Safely create it using authenticated client
        const initialDisplayName = currentUser.user_metadata?.display_name || currentUser.email?.split('@')[0] || 'User';
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: currentUser.id,
            display_name: initialDisplayName,
          })
          .select()
          .single();

        if (activeUserIdRef.current !== currentUser.id) return;

        if (insertError) {
          console.warn('[MediGen Auth] Profile auto-creation notice:', insertError.message);
          setProfile({
            id: currentUser.id,
            display_name: initialDisplayName,
            created_at: currentUser.created_at || null,
            updated_at: null,
          });
        } else {
          setProfile(newProfile);
        }
      } else {
        setProfile(data);
      }
    } catch (err: unknown) {
      if (activeUserIdRef.current !== currentUser.id) return;
      const msg = err instanceof Error ? err.message : 'Could not retrieve profile.';
      console.warn('[MediGen Auth] Recoverable error fetching profile:', msg);
      setProfileError(msg);
      setProfile({
        id: currentUser.id,
        display_name: currentUser.user_metadata?.display_name || currentUser.email?.split('@')[0] || 'User',
        created_at: currentUser.created_at || null,
        updated_at: null,
      });
    } finally {
      if (activeUserIdRef.current === currentUser.id) {
        setProfileLoading(false);
      }
    }
  };

  const updateProfile = async (updates: { display_name: string }): Promise<{ error: Error | null }> => {
    if (!configured || !user) {
      return { error: new Error('Cannot update profile: user is not authenticated.') };
    }

    try {
      const trimmedName = updates.display_name.trim();
      const { data, error } = await supabase
        .from('profiles')
        .update({
          display_name: trimmedName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data);
      return { error: null };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to update profile.');
      return { error };
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user);
    }
  };

  useEffect(() => {
    if (!configured) {
      return;
    }

    let isMounted = true;

    // 1. Restore current active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!isMounted) return;
      if (error) {
        console.error('[MediGen Auth] Session restore error:', error.message);
      }
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        activeUserIdRef.current = null;
        setProfile(null);
      }
      setLoading(false);
    }).catch((err) => {
      if (!isMounted) return;
      console.error('[MediGen Auth] Unexpected error fetching session:', err);
      setLoading(false);
    });

    // 2. Listen to real-time auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        activeUserIdRef.current = null;
        setProfile(null);
        setProfileError(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    if (!configured) {
      return {
        error: new Error('Supabase is not configured yet. Please supply VITE_SUPABASE_PUBLISHABLE_KEY in .env.local to use live authentication.')
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error };
      }

      setSession(data.session);
      setUser(data.user);
      if (data.user) {
        fetchProfile(data.user);
      }
      return { error: null };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred during sign in.');
      return { error };
    }
  };

  const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    if (!configured) {
      return {
        error: new Error('Supabase is not configured yet. Please supply VITE_SUPABASE_PUBLISHABLE_KEY in .env.local to use live authentication.')
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error };
      }

      const needsEmailVerification = data.user && !data.session;

      if (data.session && data.user) {
        setSession(data.session);
        setUser(data.user);
        fetchProfile(data.user);
      }

      return {
        error: null,
        needsEmailVerification: Boolean(needsEmailVerification),
      };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred during sign up.');
      return { error };
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    activeUserIdRef.current = null;
    setProfile(null);
    setProfileError(null);
    setUser(null);
    setSession(null);

    if (!configured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error };
      }
      return { error: null };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred during sign out.');
      return { error };
    }
  };

  const value = {
    user,
    session,
    profile,
    profileLoading,
    profileError,
    loading,
    isConfigured: configured,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
