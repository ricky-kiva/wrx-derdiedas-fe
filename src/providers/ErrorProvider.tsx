import { ErrorContext } from '../hooks/useError';
import { JumpingToast } from '../components/Toast';
import { useCallback, useRef, useState } from 'react';

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMsg, _setErrorMsg] = useState<string | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setErrorMsg = useCallback((msg: string | null) => {
    _setErrorMsg(msg);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    _setErrorMsg(null);

    requestAnimationFrame(() => {
      _setErrorMsg(msg);

      timerRef.current = setTimeout(() => {
        _setErrorMsg(null);
        timerRef.current = null;
      }, 2000);
    });
  }, []);
  
  return (
    <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
      {children}
      <JumpingToast />
    </ErrorContext.Provider>
  );
};
