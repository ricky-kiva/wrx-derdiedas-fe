import { useEffect, useState } from 'react';
import { login as loginSvc, logout as logoutSvc, refreshToken } from '../services/auth';
import { AuthContext } from '../hooks/useAuth';
import { setupReqAuthInterceptor, setupResAuthInterceptor } from '../lib/api/interceptor';
import type { User } from '../types/user/types';
import { useError } from '../hooks/useError';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setErrorMsg } = useError();

  useEffect(() => {
    return setupReqAuthInterceptor(accessToken);
  }, [accessToken]);

  useEffect(() => {
    return setupResAuthInterceptor(setAccessToken, setErrorMsg);
  }, [setAccessToken, setErrorMsg]);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const res = await refreshToken();
        setAccessToken(res.data.data.accessToken);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateAuth();
  }, [setErrorMsg]);

  const login = async (googleIdToken: string) => {
    setIsLoading(true);

    const res = await loginSvc({ googleIdToken });

    const { accessToken, user } = res.data.data;

    setAccessToken(accessToken);
    setUser(user);
    setIsLoading(false);
  };

  const logout = async () => {
    if (user) {
      try {
        setIsLoading(true);

        await logoutSvc({ id: user.id });
      } finally {
        setAccessToken(null);
        setUser(null);
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
