import { useEffect, useState } from 'react';
import type { Gender } from '../../types/shared/types';
import { GameForm, SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';
import { Matches } from '../Matches';
import type { LetterModalContent } from '../Modal';
import { useLocation } from 'react-router-dom';
import type { SearchNounItem } from '../../types/search/types';
import { useToast } from '../../hooks/useToast';
import type { StartGameResponseData } from '../../types/game/types';

interface FormContainerProps {
  game: (StartGameResponseData | null);
  setGame: React.Dispatch<React.SetStateAction<StartGameResponseData | null>>;
  setModalContent: React.Dispatch<React.SetStateAction<LetterModalContent | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { game, setGame, setShowModal, setModalContent } = props;

  const [data, setData] = useState<SearchNounItem[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [firstItemGender, setFirstItemGender] = useState<Gender | null>(null);
  const [formInput, setFormInput] = useState('');

  const { setToast } = useToast();

  const location = useLocation();
  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

  useEffect(() => {
    setToast(errorMsg);
  }, [errorMsg, setToast]);

  const handleMatchClick = (word: string) => {
    if (!data) return;

    const matched = data.find(d => (d.item.word === word));
    const rest = data.filter(d => d.item.word !== word).sort((a, b) => a.score - b.score);

    if (matched) {
      setData([matched, ...rest]);
      setFormInput(matched.item.word);
      setFirstItemGender(matched.item.gender);
    };
  };

  return (
    <div className={`w-full md:w-3/4 ${isGameRoute ? 'lg:w-3/4' : 'lg:w-1/2'} flex flex-col gap-y-6 items-center self-center 
      transform -translate-y-4 lg:-translate-y-10`}
    >
      <div className="relative w-full">
        { isGameRoute 
          ? <GameForm game={game} setGame={setGame} />
          : <SearchForm 
            gender={firstItemGender}
            input={formInput}
            setGender={setFirstItemGender}
            setData={setData} 
            setErrorMsg={setErrorMsg}
            setInput={setFormInput} 
          /> }
        <div className="absolute top-[calc(100%+1.5rem)] w-full flex flex-col gap-y-5
          px-6"
        >
          <MeaningExcerpt 
            meanings={data?.[0]?.item.meanings} 
            setShowModal={setShowModal}
            setModalContent={setModalContent} 
          />
          { !isGameRoute && <Matches 
            matchesData={data 
              ? data.map(d => ({ id: d.item.id, word: d.item.word })) 
              : []} 
            onMatchClick={handleMatchClick}
          /> }
        </div>
      </div>
    </div>
  );
};
