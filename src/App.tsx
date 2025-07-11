import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';

function App() {
  return (
    <MainContainer children={
      <>
        <MainHeader />
        <FormContainer />
        <MainFooter />
      </>
    }/>
  );
}

export default App;
