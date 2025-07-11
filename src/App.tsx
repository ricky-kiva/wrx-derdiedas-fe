import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { SearchForm } from './components/Form';
import { MainContainer } from './components/Container';

function App() {
  return (
    <MainContainer children={
      <>
        <MainHeader />
        <SearchForm />
        <MainFooter />
      </>
    }/>
  );
}

export default App;
