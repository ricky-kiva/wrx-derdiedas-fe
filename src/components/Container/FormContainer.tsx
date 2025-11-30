import { useState } from 'react';
import type { Gender } from '../../types/shared/types';
import { GameForm, SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';
import { Matches } from '../Matches';
import { useLocation } from 'react-router-dom';
import type { SearchedNoun } from '../../types/noun/types';
import { motion } from 'framer-motion';

export const FormContainer: React.FC = () => {
  const [data, setData] = useState<SearchedNoun[] | null>(null);
  const [firstItemGender, setFirstItemGender] = useState<Gender | null>(null);
  const [formInput, setFormInput] = useState('');
  const [meanings, setMeanings] = useState<string[] | undefined>([]);
  const [isGameWordHighlighted, setIsGameWordHighlighted] = useState(false);

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
    <motion.div
      animate={{ y: (data ? -32 : 0) }}
      transition={{ duration: 0.4, ease: 'easeInOut' }} 
      className={`w-full md:w-3/4 ${isGameRoute ? 'lg:w-3/4' : 'lg:w-1/2'} flex flex-col gap-y-6 items-center self-center `}
    >
      <div className="relative w-full">
        { isGameRoute 
          ? <GameForm 
            setMeanings={setMeanings} 
            setIsHighlighted={setIsGameWordHighlighted} 
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
          <MeaningExcerpt 
            meanings={isGameRoute ? meanings : data?.[0]?.item.meanings} 
            isHighlighted={isGameWordHighlighted}
          />
          { !isGameRoute && <Matches 
            matchesData={data 
              ? data.map(d => ({ id: d.item.id, word: d.item.word })) 
              : []} 
            onMatchClick={handleMatchClick}
          /> }
        </div>
      </div>
    </motion.div>
  );
};
