import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useState } from 'react';
import { JumpingError } from './components/Error';
import { LetterModal } from './components/Modal';

function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal && <LetterModal setShowModal={setShowModal}/>}
      <MainContainer children={
        <>
          <MainHeader setShowModal={setShowModal}/>
          <FormContainer setErrorMsg={setErrorMsg} />
          <MainFooter />
          {errorMsg && <JumpingError msg={errorMsg} />}
        </>
      }/>
    </>
  );
}

export default App;
