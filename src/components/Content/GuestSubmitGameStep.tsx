import { useState } from 'react';
import IconPlane from '../../assets/images/icon-plane-1.svg?react';
import { GoldenButton, GoogleLoginButton } from '../Button';
import { HDivider } from './HDivider';
import { endGame } from '../../services/game';
import { useGameStore } from '../../hooks/useGameStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { LocalStorageTokens } from '../../commons/LocalStorageTokens';
import { useModal } from '../../hooks/useModal';

export const GuestSubmitGameStep = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setToast } = useToast();
  const { closeModal } = useModal();

  const gameId = useGameStore(s => s.gameId);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameId) return;

    if (!name) {
      setToast('Hey, you forgot to write your name!');
      return;
    }

    setIsLoading(true);

    const res = await endGame(gameId, { name });

    if (res.data.status === 'success') {
      if (!res.data.data.userId) setToast('Game ended. Your 0 points were not saved 😞'); 
      else setToast('Game ended. Points are saved! 🎯');
      
      localStorage.removeItem(LocalStorageTokens.GAME_ID);
    }

    setIsLoading(false);
    closeModal();
    navigate('/');
  };

  return (
    <div className='flex flex-col'>
      <form 
        onSubmit={handleSubmit}
        className='flex gap-x-2 md:gap-x-4'
      >
        <div className='flex flex-1 border-gold-hover rounded-full'>
          <div className='w-full flex p-[1.5px] border-gold-color-only rounded-full'>
            <input 
              type='text' 
              name='name' 
              placeholder='Display Name'
              value={name}
              onChange={(e) => setName(e.target.value) }
              className={'w-full px-3 text-xs text-bg-indigo bg-form-black rounded-full outline-none'}
            />
          </div>
        </div>
        <GoldenButton icon={IconPlane} isLoading={isLoading} small={true} type='submit' />
      </form>
      <HDivider text='OR CONTINUE SCORING ANYTIME' />
      <div className='w-full flex flex-col items-center gap-2 justify-center'>
        <GoogleLoginButton fromGame={true} />
        <p className='text-[0.6rem] opacity-70 italic'>*Sign in to continue scoring anytime!</p>
      </div>
    </div>
  );
};
