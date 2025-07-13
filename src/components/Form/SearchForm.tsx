import { GoldenButton } from '../Button';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';
import LottieLoading from '../../assets/lottie/loading-1.json';
import { useState } from 'react';
import { getByWord } from '../../services/nouns';
import { getGenderLabel } from '../../utils/gender';
import type { Gender, SearchNounItem } from '../../types/types';
import { parseErrorMessage } from '../../utils/error';
import Lottie from 'lottie-react';

interface SearchFormProps {
  setData: React.Dispatch<React.SetStateAction<SearchNounItem[] | null>>
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>
}

export const SearchForm: React.FC<SearchFormProps> = ({ setData, setErrorMsg }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState<Gender | null>(null);

  const displayErrorMsg = (e: unknown) => {
    setErrorMsg(parseErrorMessage(e));
    setTimeout(() => setErrorMsg(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input) {
      displayErrorMsg('Hey, you forgot to type a word!');
      return;
    }

    setIsLoading(true);

    try {
      const res = await getByWord(input);

      const data = res.data.data;

      setInput(data[0].item.word);
      setGender(data[0].item.gender);
      setData(data);
    } catch (e: unknown) {
      displayErrorMsg(e);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className='w-full flex justify-center gap-x-2 md:gap-x-4'>
      <div className='flex flex-1 border-gold-hover rounded-full'>
        <div className='w-16 flex py-[1.5px] pl-[1.5px] pr-[0.75px] border-gold-color-only rounded-l-full'>
          <div className='w-16 flex justify-center items-center gap-x-2 px-5 bg-btn-gold rounded-l-full'>
            { isLoading 
              ? <Lottie animationData={LottieLoading} loop autoplay className='scale-[1.75] origin-center'/>
              : <span className='ml-1'>{getGenderLabel(gender)}</span> }
          </div>
        </div>
        <div className='w-full flex p-[1.5px] border-gold-color-only rounded-r-full'>
          <input 
            type='text' 
            name='word' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full px-3 bg-form-black rounded-r-full outline-none' 
          />
        </div>
      </div>
      <GoldenButton text='Check' icon={IconMagnifyingGlass}/>
    </form>
  );
};
