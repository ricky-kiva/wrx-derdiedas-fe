import { GoldenButton } from '../Button';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';
import LottieLoading from '../../assets/lottie/loading-1.json';
import React, { useEffect, useRef, useState } from 'react';
import { getByWord } from '../../services/nouns';
import { getGenderLabel, highlightGenderRules } from '../../utils/gender';
import type { Gender } from '../../types/shared/types';
import Lottie from 'lottie-react';
import type { SearchedNoun } from '../../types/noun/types';
import { useToast } from '../../hooks/useToast';
import { LocalStorageTokens } from '../../commons/LocalStorageTokens';
import { deleteGame, endGame as endGameSvc, getGame } from '../../services/game';
import { useAuth } from '../../hooks/useAuth';

interface SearchFormProps {
  gender: Gender | null;
  input: string;
  setData: React.Dispatch<React.SetStateAction<SearchedNoun[] | null>>;
  setGender: React.Dispatch<React.SetStateAction<Gender | null>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { gender, input, setData, setGender, setInput } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { setToast } = useToast();
  const { user } = useAuth();

  const gameTerminatedRef = useRef(false);

  useEffect(() => {
    if (gameTerminatedRef.current) return;

    gameTerminatedRef.current = true;

    const terminateGame = async () => {
      const gameId = localStorage.getItem(LocalStorageTokens.GAME_ID);
      
      if (!gameId) return;

      const gameInStorage = await getGame(gameId);

      if (!(gameInStorage.data.status === 'success')) {
        localStorage.removeItem(LocalStorageTokens.GAME_ID);
        return;
      }

      if (user) {
        await endGameSvc(gameId);
        localStorage.removeItem(LocalStorageTokens.GAME_ID);
        setToast('Game ended. Points are saved! 🎯');
        return;
      }

      await deleteGame(gameId);
      
      localStorage.removeItem(LocalStorageTokens.GAME_ID);
    };

    terminateGame();
  }, [user, setToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resetFormData = () => {
      setData(null);
      setGender(null);
    };

    if (!input) {
      setToast('Hey, you forgot to type a word!');
      resetFormData();
      return;
    }

    setIsLoading(true);

    try {
      const res = await getByWord(input);

      if (res.data.status === 'success') {
        const data = res.data.data;

        if (data.length === 0) {
          setToast('Couldn\'t find that word!');
          resetFormData();
          return;
        }

        setInput(data[0].item.word);
        setGender(data[0].item.gender);
        setData(data);
        setIsSubmitted(true);
      }
    } catch {
      resetFormData();
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
