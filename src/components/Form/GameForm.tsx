import { GoldenButton } from '../Button';
import IconCheck from '../../assets/images/icon-check-1.svg?react';
import LottieLoading from '../../assets/lottie/loading-1.json';
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import type { Gender } from '../../types/shared/types';
import { answerGame, endGame, getGame, startGame } from '../../services/game';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { LocalStorageTokens } from '../../commons/LocalStorageTokens';
import { useGameStore } from '../../hooks/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { GuestSubmitGameStep } from '../Content';
import { useIsMobile } from '../../hooks/useIsMobile';

interface GameFormProps {
  setMeanings: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const GameForm: React.FC<GameFormProps> = ({ setMeanings }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [points, setPoints] = useState(0);

  const gameStartedRef = useRef(false);
  
  const { user } = useAuth();
  const { setToast } = useToast();
  const { openModal } = useModal();
  const isMobile = useIsMobile(768);
  
  const gameId = useGameStore(s => s.gameId);
  const nouns = useGameStore(s => s.nouns);
  const setGameId = useGameStore(s => s.setGameId);
  const setNouns = useGameStore(s => s.setNouns);

  const navigate = useNavigate();

  useEffect(() => {
    if (gameStartedRef.current) return;

    gameStartedRef.current = true;

    const initGame = async () => {
      setIsLoading(true);
      
      try {
        let gameData;

        const localGameId = localStorage.getItem(LocalStorageTokens.GAME_ID);

        if (localGameId) {
          const res = await getGame(localGameId, { _silent: true });

          if (res.data.status === 'success') {
            gameData = res.data.data;
            setPoints(res.data.data.points);
          }
        }

        if (!gameData) {
          const res = await startGame({ userId: user?.id });

          if (res.data.status === 'success') {
            gameData = res.data.data;
            localStorage.setItem(LocalStorageTokens.GAME_ID, gameData.id);
          }
        }

        if (gameData) {
          setGameId(gameData.id);
          setNouns(gameData.nouns);
          setMeanings(gameData.nouns[0].meanings);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    initGame();
  }, [user?.id, setNouns, setGameId, setMeanings]);

  const handleCorrect = (isCorrect: boolean) => {
    if (isCorrect) setToast("Correct! 🎉"); 
    else setToast("Missed it! Let's retry 🙊");
  };

  const handleAnswer = async (answer: Exclude<Gender, '?'>) => {
    try {
      setIsLoading(true);

      if (gameId !== null) {
        const res = await answerGame(gameId, {
          answer,
          nounId: nouns[0].id,
          userId: user?.id
        });

        if (res.data.status === 'success') {
          const { correct, currentScore, nouns: nextNouns } = res.data.data;

          setPoints(currentScore);
          setNouns(nextNouns ? nextNouns : nouns.slice(1));
          setMeanings(nextNouns ? nextNouns[0].meanings : nouns.slice(1)[0].meanings);
          handleCorrect(correct);
          return;
        }
      }
    } catch {
      const resNewGame = await startGame({ userId: user?.id });

      if (resNewGame.data.status === 'success') {
        localStorage.setItem(LocalStorageTokens.GAME_ID, resNewGame.data.data.id);
        
        setGameId(resNewGame.data.data.id);
        setNouns(resNewGame.data.data.nouns);
        setMeanings(resNewGame.data.data.nouns[0].meanings);
        setPoints(0);

        setToast('Game expired or corrupted. Starting a fresh one! 🎮');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = async () => {
    if (!gameId) return;

    if (user) {
      await endGame(gameId);
      localStorage.removeItem(LocalStorageTokens.GAME_ID);
      setToast('Game ended. Points are saved! 🎯');
      navigate('/');
      return;
    }

    openModal({ 
      title: '🏅 SUBMIT SCORE TO LEADERBOARD',
      body: <GuestSubmitGameStep />
    }, { compact: true });
  };

  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-end lg:items-center gap-x-1 md:gap-x-2 gap-y-2 md:gap-y-0'>
      <div className='flex flex-1 w-full flex-col lg:flex-row'>
        <div className='flex w-16 border-gold-hover rounded-t-2xl lg:rounded-l-full'>
          <div className='h-10 flex py-[1.5px] pl-[1.5px] pr-[0.75px] border-gold-color-only rounded-t-2xl lg:rounded-l-full'>
            <div className='w-16 flex justify-center items-center gap-x-2 px-5 bg-form-black rounded-t-2xl lg:rounded-l-full'>
              <span className='mt-1 lg:mt-0 lg:ml-1'>{points}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-1 border-gold-hover rounded-bl-full rounded-r-full md:rounded-r-none lg:rounded-none'>
          <div className='h-10 w-full flex p-[1.5px] border-gold-color-only rounded-bl-full rounded-r-full md:rounded-r-none lg:rounded-none'>
            <div className='relative w-full flex justify-center items-center gap-x-2 px-5 bg-btn-gold rounded-bl-full rounded-r-full md:rounded-r-none lg:rounded-none'>
              { isLoading 
                ? <Lottie animationData={LottieLoading} loop autoplay className='scale-[0.125] origin-center ml-1'/>
                : <span className='ml-1 break-all'>{nouns?.[0]?.word}</span> }
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row-reverse md:flex-row w-full md:w-fit justify-between gap-x-1 md:gap-x-4'>
        <div className='flex'>
          <GoldenButton text='DER' cornerStyle={isMobile ? 'left' : 'square'} inRow={true} onClick={() => handleAnswer("masculine")} />
          <GoldenButton text='DIE' cornerStyle='square' inRow={true} onClick={() => handleAnswer("feminine")} />
          <GoldenButton text='DAS' cornerStyle='right' onClick={() => handleAnswer("neuter")} />
        </div>
        <GoldenButton text='Done' icon={IconCheck} onClick={handleDone} />
      </div>
    </div>
  );
};
