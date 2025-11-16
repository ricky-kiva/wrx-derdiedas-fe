import { ToastContext } from '../hooks/useToast';
import { JumpingToast } from '../components/Toast';
import { useCallback, useRef, useState } from 'react';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [msg, setMsg] = useState<string | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setToast = useCallback((msg: string | null) => {
    setMsg(msg);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setMsg(null);

    requestAnimationFrame(() => {
      setMsg(msg);

      timerRef.current = setTimeout(() => {
        setMsg(null);
        timerRef.current = null;
      }, 2000);
    });
  }, []);
  
  return (
    <ToastContext.Provider value={{ setToast, toastMsg: msg }}>
      {children}
      <JumpingToast />
    </ToastContext.Provider>
  );
};
