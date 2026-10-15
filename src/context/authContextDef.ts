import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  error: Error | null;
  needsEmailVerification?: boolean;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  profileLoading: boolean;
  profileError: string | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  updateProfile: (updates: { display_name: string }) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
