import type React from 'react';
import { useState } from 'react';
import { LetterModal, type LetterModalContent } from '../components/Modal';
import { ModalContext } from '../hooks/useModal';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = useState<LetterModalContent | undefined>();

  const openModal = (c: LetterModalContent) => setContent(c);
  const closeModal = () => setContent(undefined);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {content && <LetterModal onClose={closeModal} content={content}/>}
    </ModalContext.Provider>
  );
};
