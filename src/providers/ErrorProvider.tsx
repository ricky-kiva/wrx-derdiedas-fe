import { useState } from 'react';
import { JumpingError } from '../components/Error';
import { ErrorContext } from '../hooks/useError';

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ setErrorMsg }}>
      {children}
      {errorMsg && <JumpingError msg={errorMsg} />}
    </ErrorContext.Provider>
  );
};
