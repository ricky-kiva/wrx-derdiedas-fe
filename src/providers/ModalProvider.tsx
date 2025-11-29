import type React from 'react';
import { useState } from 'react';
import { LetterModal, type LetterModalContent } from '../components/Modal';
import { ModalContext, type OpenModalOptions } from '../hooks/useModal';
import { AnimatePresence } from 'framer-motion';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = useState<LetterModalContent | undefined>();
  const [isCompact, setIsCompact] = useState(false);
  const [isWider, setIsWider] = useState(false);
  const [cleanQParams, setCleanQParams] = useState(false);

  const openModal = (c: LetterModalContent, options?: OpenModalOptions) => {
    setContent(c);
    setIsCompact(options?.compact ?? false);
    setIsWider(options?.wider ?? false);
    setCleanQParams(options?.cleanQParams ?? false);
  };

  const closeModal = () => {
    setContent(undefined);

    if (cleanQParams) {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
    }

    setIsCompact(false);
    setIsWider(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {content && <LetterModal onClose={closeModal} content={content} isCompact={isCompact} isWider={isWider} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
