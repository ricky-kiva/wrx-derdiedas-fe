import { createContext, useContext } from 'react';
import type { LetterModalContent } from '../components/Modal';

type ModalCtxType = {
  openModal: (content: LetterModalContent) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalCtxType | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal called outside of ModalProvider');
  return ctx;
}
