import { createContext, useContext } from 'react';

interface ErrorCtxType {
  setErrorMsg: (msg: string | null) => void;
}

export const ErrorContext = createContext<ErrorCtxType | null>(null);

export function useError() {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError called outside of ErrorProvider");
  return ctx;
}
