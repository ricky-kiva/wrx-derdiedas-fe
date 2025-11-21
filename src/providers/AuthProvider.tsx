import { useEffect, useState } from 'react';
import { login as loginSvc, logout as logoutSvc, refreshToken } from '../services/auth';
import { AuthContext } from '../hooks/useAuth';
import { setupReqAuthInterceptor, setupResAuthInterceptor } from '../lib/api/interceptor';
import type { User } from '../types/user/types';
import { useToast } from '../hooks/useToast';
import { googleLogout } from '@react-oauth/google';
import { LocalStorageTokens } from '../commons/LocalStorageTokens';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(LocalStorageTokens.USER_INFO);
    return stored ? JSON.parse(stored) : null;
  });

  const { setToast } = useToast();

  useEffect(() => {
    return setupReqAuthInterceptor(accessToken);
  }, [accessToken]);

  useEffect(() => {
    return setupResAuthInterceptor(setAccessToken, setToast);
  }, [setToast]);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const res = await refreshToken();
        if (res.data.status === 'success') setAccessToken(res.data.data.accessToken); 
      } catch {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem(LocalStorageTokens.USER_INFO);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateAuth();
  }, []);

  const login = async (googleIdToken: string) => {
    setIsLoading(true);

    const res = await loginSvc({ googleIdToken });

    if (res.data.status === 'success') {
      const { accessToken, user } = res.data.data;

      setAccessToken(accessToken);
      setUser(user);

      localStorage.setItem(LocalStorageTokens.USER_INFO, JSON.stringify(user));

      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (user) {
      try {
        setIsLoading(true);
        await logoutSvc({ id: user.id });
        googleLogout();
      } finally {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem(LocalStorageTokens.USER_INFO);
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
