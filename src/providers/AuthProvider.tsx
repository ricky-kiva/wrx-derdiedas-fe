import { useEffect, useState } from 'react';
import { login as loginSvc, logout as logoutSvc, refreshToken } from '../services/auth';
import { AuthContext } from '../hooks/useAuth';
import { setupReqAuthInterceptor, setupResAuthInterceptor } from '../lib/api/interceptor';
import type { User } from '../types/user/types';
import { useToast } from '../hooks/useToast';
import { googleLogout } from '@react-oauth/google';
import { LocalStorageTokens } from '../commons/LocalStorageTokens';
import { endGame, updateGame } from '../services/game';
import { useGameStore } from '../hooks/useGameStore';
import { deleteUser as deleteUserSvc, updateUser as updateUserSvc } from '../services/user';

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

  const gameId = useGameStore(s => s.gameId);

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

  const login = async (googleIdToken: string, fromGame?: boolean) => {
    setIsLoading(true);

    const res = await loginSvc({ googleIdToken });

    if (res.data.status === 'success') {
      const { accessToken, user } = res.data.data;

      setAccessToken(accessToken);
      setUser(user);

      localStorage.setItem(LocalStorageTokens.USER_INFO, JSON.stringify(user));

      setToast('Logged in. Hi! 👋');

      if (fromGame) {
        if (gameId) {
          await updateGame(gameId, { userId: user.id });

          const endRes = await endGame(gameId);
          
          if (endRes.data.status === 'success') {
            if (!endRes.data.data.userId) setToast('Game ended. Your 0 points were not saved 😞');
            else setToast('Game ended. Points are saved! 🎯');
            
            localStorage.removeItem(LocalStorageTokens.GAME_ID);
          } 
        }
      }

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
        setToast('See you later! ❤️');
        setIsLoading(false);
      }
    }
  };

  const deleteUser = async () => {
    if (user) {
      try {
        setIsLoading(true);
        await logoutSvc({ id: user.id });
        googleLogout();
        await deleteUserSvc();
      } finally {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem(LocalStorageTokens.USER_INFO);
        setToast('Deleted. Good luck on your next journey! ⛰️');
        setIsLoading(false);
      }
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<User | undefined> => {
    if (!user?.id) return undefined;

    const res = await updateUserSvc(updates);

    if (res.data.status === 'success') {
      const resUser = res.data.data;

      const updatedUser: User = {
        id: resUser.id,
        name: resUser.name,
        email: user.email
      };

      setUser(prev => {
        if (!prev) return prev;
        const next = { ...prev, ...updatedUser };
        return next;
      });

      localStorage.setItem(LocalStorageTokens.USER_INFO, JSON.stringify(updatedUser));

      return updatedUser;
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoading, user, login, logout, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
