import { useState } from 'react';
import type { SearchNounItem } from '../../types/types';
import { SearchForm } from '../Form';
import { MeaningExcerpt } from '../Content';

export const FormContainer: React.FC = () => {
  const [data, setData] = useState<SearchNounItem | null>(null);

  return (
    <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col gap-y-6 items-center'>
      <SearchForm setData={setData} />
      <MeaningExcerpt meanings={data?.item.meanings} />
    </div>
  );
};
