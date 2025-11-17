import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useEffect, useState } from 'react';
import { LetterModal, type LetterModalContent } from './components/Modal';
import type { StartGameData } from './types/game/types';
import { useToast } from './hooks/useToast';
import { setupResErrorInterceptor } from './lib/api/interceptor';

function App() {
  const [modalContent, setModalContent] = useState<LetterModalContent | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [game, setGame] = useState<StartGameData | null>(null);

  const { setToast } = useToast();

  useEffect(() => {
    setupResErrorInterceptor(setToast);
  }, [setToast]);

  useEffect(() => {
    if (!showModal) setModalContent(undefined);
  }, [showModal]);

  return (
    <>
      {showModal && <LetterModal setShowModal={setShowModal} content={modalContent} />}
      <MainContainer children={
        <>
          <MainHeader game={game} setGame={setGame} setShowModal={setShowModal} setModalContent={setModalContent} />
          <FormContainer game={game} setGame={setGame} setShowModal={setShowModal} setModalContent={setModalContent} />
          <MainFooter />
        </>
      } />
    </>
  );
}

export default App;
