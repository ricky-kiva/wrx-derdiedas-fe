import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useEffect, useState } from 'react';
import { LetterModal, type LetterModalContent } from './components/Modal';
import type { StartGameResponseData } from './types/game/types';

function App() {
  const [modalContent, setModalContent] = useState<LetterModalContent | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [game, setGame] = useState<StartGameResponseData | null>(null);

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
