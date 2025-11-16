import { useEffect, useState } from 'react';
import { login as loginSvc, logout as logoutSvc, refreshToken } from '../services/auth';
import { AuthContext } from '../hooks/useAuth';
import { setupReqAuthInterceptor, setupResAuthInterceptor } from '../lib/api/interceptor';
import type { User } from '../types/user/types';
import { useToast } from '../hooks/useToast';
import { googleLogout } from '@react-oauth/google';

interface AuthProviderProps {
  children: React.ReactNode;
}

const USER_STORAGE_KEY = 'user_info';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const { setToast } = useToast();

  useEffect(() => {
    return setupReqAuthInterceptor(accessToken);
  }, [accessToken]);

  useEffect(() => {
    return setupResAuthInterceptor(setAccessToken, setToast);
  }, [setAccessToken, setToast]);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const res = await refreshToken();
        setAccessToken(res.data.data.accessToken);
      } catch {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateAuth();
  }, [setToast]);

  const login = async (googleIdToken: string) => {
    setIsLoading(true);

    const res = await loginSvc({ googleIdToken });

    const { accessToken, user } = res.data.data;

    setAccessToken(accessToken);
    setUser(user);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

    setIsLoading(false);
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
        localStorage.removeItem(USER_STORAGE_KEY);
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
