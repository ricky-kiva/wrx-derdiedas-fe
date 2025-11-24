import type React from 'react';
import { useState } from 'react';
import { LetterModal, type LetterModalContent } from '../components/Modal';
import { ModalContext, type OpenModalOptions } from '../hooks/useModal';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = useState<LetterModalContent | undefined>();
  const [isCompact, setIsCompact] = useState(false);
  const [isWider, setIsWider] = useState(false);

  const openModal = (c: LetterModalContent, options?: OpenModalOptions) => {
    setContent(c);
    setIsCompact(options?.compact ?? false);
    setIsWider(options?.wider ?? false);
  };

  const closeModal = () => {
    setContent(undefined);
    setIsCompact(false);
    setIsWider(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {content && <LetterModal onClose={closeModal} content={content} isCompact={isCompact} isWider={isWider} />}
    </ModalContext.Provider>
  );
};
