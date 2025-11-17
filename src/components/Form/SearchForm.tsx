import { GoldenButton } from '../Button';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';
import LottieLoading from '../../assets/lottie/loading-1.json';
import React, { useState } from 'react';
import { getByWord } from '../../services/nouns';
import { getGenderLabel, highlightGenderRules } from '../../utils/gender';
import type { Gender } from '../../types/shared/types';
import { parseErrorMessage } from '../../utils/error';
import Lottie from 'lottie-react';
import type { SearchedNoun } from '../../types/noun/types';

interface SearchFormProps {
  gender: Gender | null;
  input: string;
  setData: React.Dispatch<React.SetStateAction<SearchedNoun[] | null>>;
  setGender: React.Dispatch<React.SetStateAction<Gender | null>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { gender, input, setData, setGender, setInput, setErrorMsg } = props;

  const displayErrorMsg = (e: unknown) => {
    setErrorMsg(parseErrorMessage(e));
    setTimeout(() => setErrorMsg(null), 2000);
    setData(null);
    setGender(null);
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

      if (res.data.status === 'success') {
        const data = res.data.data;

        if (data.length === 0) {
          displayErrorMsg('Couldn\'t find that word!');
          return;
        }

        setInput(data[0].item.word);
        setGender(data[0].item.gender);
        setData(data);
        setIsSubmitted(true);
      }
      
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
              ? <Lottie animationData={LottieLoading} loop autoplay className='scale-[1.75] origin-center ml-1'/>
              : <span className='ml-1'>{getGenderLabel(gender)}</span> }
          </div>
        </div>
        <div className='relative w-full flex p-[1.5px] border-gold-color-only rounded-r-full'>
          {isSubmitted && gender && (
            <div className="absolute inset-0 flex items-center px-[0.875rem] text-bg-indigo pointer-events-none">
              {highlightGenderRules(input, gender)}
            </div>
          )}
          <input 
            type='text' 
            name='word' 
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (isSubmitted) setIsSubmitted(false);
            }}
            className={`w-full px-3 bg-form-black rounded-r-full outline-none
              ${(isSubmitted && gender) ? 'text-transparent caret-bg-indigo' : ''}`}
          />
        </div>
      </div>
      <GoldenButton text='Check' icon={IconMagnifyingGlass}/>
    </form>
  );
};
