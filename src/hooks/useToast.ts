import { createContext, useContext } from 'react';

interface ToastCtxType {
  toastMsg: (string | null);
  setToast: (msg: string | null) => void;
}

export const ToastContext = createContext<ToastCtxType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast called outside of ToastProvider");
  return ctx;
}
