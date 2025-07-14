import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useEffect, useState } from 'react';
import { JumpingError } from './components/Error';
import { LetterModal, type LetterModalContent } from './components/Modal';

function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<LetterModalContent | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => { 
    if (!showModal) setModalContent(undefined); 
  }, [showModal]);

  return (
    <>
      {showModal && <LetterModal setShowModal={setShowModal} content={modalContent} />}
      <MainContainer children={
        <>
          <MainHeader setShowModal={setShowModal}/>
          <FormContainer 
            setErrorMsg={setErrorMsg} 
            setShowModal={setShowModal} 
            setModalContent={setModalContent} 
          />
          <MainFooter />
          {errorMsg && <JumpingError msg={errorMsg} />}
        </>
      }/>
    </>
  );
}

export default App;
