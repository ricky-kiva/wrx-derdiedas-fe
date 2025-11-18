import { MainHeader } from './components/Header';
import { MainFooter } from './components/Footer';
import { FormContainer, MainContainer } from './components/Container';
import { useEffect, useState } from 'react';
import type { StartGameData } from './types/game/types';
import { useToast } from './hooks/useToast';
import { setupResErrorInterceptor } from './lib/api/interceptor';

function App() {
  const [game, setGame] = useState<StartGameData | null>(null);

  const { setToast } = useToast();

  useEffect(() => {
    setupResErrorInterceptor(setToast);
  }, [setToast]);

  return (
    <>
      <MainContainer children={
        <>
          <MainHeader game={game} setGame={setGame} />
          <FormContainer game={game} setGame={setGame} />
          <MainFooter />
        </>
      } />
    </>
  );
}

export default App;
