import { useEffect, useState } from 'react';
import type { SearchNounItem } from '../../types/types';
import { SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';

interface FormContainerProps {
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>
};

export const FormContainer: React.FC<FormContainerProps> = ({ setErrorMsg: pSetErrorMsg }) => {
  const [data, setData] = useState<SearchNounItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    pSetErrorMsg(errorMsg);
  }, [errorMsg, pSetErrorMsg]);

  return (
    <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col gap-y-6 items-center self-center transform -translate-y-8'>
      <div className="relative w-full">
        <SearchForm setData={setData} setErrorMsg={setErrorMsg} />
        <div className="absolute top-[calc(100%+1rem)] w-full">
          <MeaningExcerpt meanings={data?.item.meanings} />
        </div>
      </div>
    </div>
  );
};
