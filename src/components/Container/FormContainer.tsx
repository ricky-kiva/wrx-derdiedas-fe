import { useEffect, useState } from 'react';
import type { Gender, SearchNounItem } from '../../types/types';
import { SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';
import { Matches } from '../Matches';

interface FormContainerProps {
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>
};

export const FormContainer: React.FC<FormContainerProps> = ({ setErrorMsg: pSetErrorMsg }) => {
  const [data, setData] = useState<SearchNounItem[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [firstItemGender, setFirstItemGender] = useState<Gender | null>(null);
  const [formInput, setFormInput] = useState('');

  useEffect(() => {
    pSetErrorMsg(errorMsg);
  }, [errorMsg, pSetErrorMsg]);

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
    <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col gap-y-6 items-center self-center 
      transform -translate-y-10'
    >
      <div className="relative w-full">
        <SearchForm 
          gender={firstItemGender}
          input={formInput}
          setGender={setFirstItemGender}
          setData={setData} 
          setErrorMsg={setErrorMsg}
          setInput={setFormInput} 
        />
        <div className="absolute top-[calc(100%+1.5rem)] w-full flex flex-col gap-y-5
          px-6"
        >
          <MeaningExcerpt meanings={data?.[0]?.item.meanings} />
          <Matches 
            matchesData={data 
              ? data.map(d => ({ id: d.item.id, word: d.item.word })) 
              : []} 
            onMatchClick={handleMatchClick}
          />
        </div>
      </div>
    </div>
  );
};
