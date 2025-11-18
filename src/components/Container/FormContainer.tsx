import { useState } from 'react';
import type { Gender } from '../../types/shared/types';
import { GameForm, SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';
import { Matches } from '../Matches';
import { useLocation } from 'react-router-dom';
import type { StartGameData } from '../../types/game/types';
import type { SearchedNoun } from '../../types/noun/types';

interface FormContainerProps {
  game: (StartGameData | null);
  setGame: React.Dispatch<React.SetStateAction<StartGameData | null>>;
};

export const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { game, setGame } = props;

  const [data, setData] = useState<SearchedNoun[] | null>(null);
  const [firstItemGender, setFirstItemGender] = useState<Gender | null>(null);
  const [formInput, setFormInput] = useState('');

  const location = useLocation();
  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

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
          ? <GameForm 
            game={game} 
            setGame={setGame} 
          />
          : <SearchForm 
            gender={firstItemGender}
            input={formInput}
            setGender={setFirstItemGender}
            setData={setData} 
            setInput={setFormInput} 
          /> }
        <div className="absolute top-[calc(100%+1.5rem)] w-full flex flex-col gap-y-5
          px-6"
        >
          <MeaningExcerpt meanings={data?.[0]?.item.meanings} />
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
