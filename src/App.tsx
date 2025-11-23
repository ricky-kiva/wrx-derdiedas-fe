import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useEffect } from 'react';
import { useToast } from './hooks/useToast';
import { setupResErrorInterceptor } from './lib/api/interceptor';

function App() {
  const { setToast } = useToast();

  useEffect(() => {
    setupResErrorInterceptor(setToast);
  }, [setToast]);

  return (
    <>
      <MainContainer children={
        <>
          <MainHeader />
          <FormContainer />
          <MainFooter />
        </>
      } />
    </>
  );
}

export default App;
