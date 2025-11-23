import { createContext, useContext } from 'react';
import type { User } from '../types/user/types';

interface AuthCtxType {
  accessToken: (string | null);
  isLoading: boolean;
  user: (User | null);
  login: (googleIdToken: string, fromGame?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthCtxType | null>(null);

export const useAuth = (): AuthCtxType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth called outside of AuthProvider');
  return ctx;
};
