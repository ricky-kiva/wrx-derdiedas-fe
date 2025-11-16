import { GoldenButton } from '../Button';
import IconCheck from '../../assets/images/icon-check-1.svg?react';
import LottieLoading from '../../assets/lottie/loading-1.json';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import type { StartGameResponseData } from '../../types/game/types';
import type { Gender } from '../../types/shared/types';
import { answerGame, startGame as startGameSvc } from '../../services/game';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

interface GameFormProps {
  game: (StartGameResponseData | null);
  setGame: React.Dispatch<React.SetStateAction<StartGameResponseData | null>>;
}

export const GameForm: React.FC<GameFormProps> = (props) => {
  const { game, setGame } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [points, setPoints] = useState(0);

  const { user } = useAuth();
  const { setToast } = useToast();

  useEffect(() => {
    const startGame = async () => {
      try {
        setIsLoading(true);
        const res = await startGameSvc({ userId: user?.id });
        setGame(res.data.data);
      } finally {
        setIsLoading(false);
      }
    };
    
    startGame();
  }, [user?.id, setGame]);

  const handleCorrect = (isCorrect: boolean) => {
    if (isCorrect) setToast("Correct! 🎉"); 
    else setToast("Missed it! Let's retry 🙊");
  };

  const handleAnswer = async (answer: Exclude<Gender, '?'>) => {
    try {
      setIsLoading(true);

      if (game !== null) {
        const res = await answerGame({
          answer,
          gameId: game?.gameId,
          nounId: game?.nouns?.[0]?.id,
          userId: user?.id
        });

        const { correct, currentScore, nouns: nextNouns } = res.data.data;

        setPoints(currentScore);

        setGame(prev => {
          if (!prev) return prev;
          return { 
            ...prev, 
            nouns: nextNouns 
              ? nextNouns 
              : prev.nouns.slice(1) 
          };
        });

        handleCorrect(correct);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-x-2 md:gap-x-4 gap-y-2 lg:gap-y-0'>
      <div className='w-full flex justify-center items-end lg:items-center gap-x-1 md:gap-x-2'>
        <div className='flex flex-1 flex-col lg:flex-row'>
          <div className='flex w-16 border-gold-hover rounded-t-2xl lg:rounded-l-full'>
            <div className='h-10 flex py-[1.5px] pl-[1.5px] pr-[0.75px] border-gold-color-only rounded-t-2xl lg:rounded-l-full'>
              <div className='w-16 flex justify-center items-center gap-x-2 px-5 bg-form-black rounded-t-2xl lg:rounded-l-full'>
                <span className='mt-1 lg:mt-0 lg:ml-1'>{points}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-1 border-gold-hover rounded-bl-full lg:rounded-none'>
            <div className='h-10 w-full flex p-[1.5px] border-gold-color-only rounded-bl-full lg:rounded-none'>
              <div className='relative w-full flex justify-center items-center gap-x-2 px-5 bg-btn-gold rounded-bl-full lg:rounded-none'>
                { isLoading 
                  ? <Lottie animationData={LottieLoading} loop autoplay className='scale-[0.125] origin-center ml-1'/>
                  : <span className='ml-1 break-all'>{game?.nouns?.[0].word}</span> }
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <GoldenButton text='DER' cornerStyle='square' compact={true} inRow={true} onClick={() => handleAnswer("masculine")} />
          <GoldenButton text='DIE' cornerStyle='square' compact={true} inRow={true} onClick={() => handleAnswer("feminine")} />
          <GoldenButton text='DAS' cornerStyle='right' compact={true} onClick={() => handleAnswer("neuter")} />
        </div>
      </div>
      <GoldenButton text='Done' icon={IconCheck} />
    </div>
  );
};
