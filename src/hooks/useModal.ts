import { createContext, useContext } from 'react';
import type { LetterModalContent } from '../components/Modal';

export interface OpenModalOptions {
  compact?: boolean;
  wider?: boolean;
  cleanQParams?: boolean
}

type ModalCtxType = {
  openModal: (content: LetterModalContent, options?: OpenModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalCtxType | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal called outside of ModalProvider');
  return ctx;
}
