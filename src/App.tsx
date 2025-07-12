import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useState } from 'react';
import { JumpingError } from './components/Error';

function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <MainContainer children={
      <>
        <MainHeader />
        <FormContainer setErrorMsg={setErrorMsg} />
        <MainFooter />
        {errorMsg && <JumpingError msg={errorMsg} />}
      </>
    }/>
  );
}

export default App;
