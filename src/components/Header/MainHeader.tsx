import LogoDerDieDas from '../../assets/images/logo-derdiedas-1-c.png';
import IconBook from '../../assets/images/icon-book-1.svg?react';
import IconYouTube from '../../assets/images/icon-youtube-1.svg?react';
import IconGamepad from '../../assets/images/icon-gamepad-1.svg?react';
import IconUser from '../../assets/images/icon-user-1.svg?react';
import IconLogout from '../../assets/images/icon-logout-1.svg?react';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';
import HeaderMenu from './HeaderMenu';
import { GoogleLoginButton, type GoldenButtonProps } from '../Button';
import type { LetterModalContent } from '../Modal';
import { DDDNote } from '../Content';
import { Link, useLocation } from 'react-router-dom';
import type { GoldenNavProps } from '../Nav/GoldenNav';
import { useAuth } from '../../hooks/useAuth';
import { formatDisplayUsername } from '../../utils/styler';
import { endGame } from '../../services/game';
import type { StartGameData } from '../../types/game/types';

interface MainHeaderProps {
  game: (StartGameData | null);
  setGame: React.Dispatch<React.SetStateAction<StartGameData | null>>;
  setModalContent: React.Dispatch<React.SetStateAction<LetterModalContent | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { game, setGame, setModalContent, setShowModal } = props;

  const { user, logout } = useAuth();

  const location = useLocation();

  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

  const navItemProps: (GoldenButtonProps | GoldenNavProps)[] = [
    { icon: IconBook, label: 'Note for DerDieDas', onClick: (() => {
      setShowModal(true); 
      setModalContent({ 
        title: 'NOTE ON DERDIEDAS',
        body: <DDDNote />
      });
    }) },
    { to: 'https://www.youtube.com/@rexzeppelin', text: 'Support my new channel', icon: IconYouTube, hideTextOnMobile: true },
    (!isGameRoute 
      ? { to: '/game', text: 'Play', icon: IconGamepad, hideTextOnMobile: true }
      : { to: '/', text: 'Search', icon: IconMagnifyingGlass, hideTextOnMobile: true, onClick: (game 
          ? async () => {
            await endGame({ gameId: game.gameId });
            console.log(`deleted gameId: ${game.gameId}`);
            setGame(null);
          }
          : (() => {})) 
        }),
    ...(user 
      ? [
        { icon: IconUser, text: formatDisplayUsername(user.name), hideTextOnMobile: true, onClick: (() => {}) },
        { icon: IconLogout, onClick: (() => logout()) }
      ] satisfies (GoldenButtonProps | GoldenNavProps)[] 
      : [])
  ];
  
  return (
    <>
      <header className='relative w-full flex justify-between gap-4'>    
        <Link to="/">
          <img
            src={LogoDerDieDas}
            alt="DerDieDas Logo"
            className="w-16 hover:animate-spin-propeller"
          />
        </Link>
        <HeaderMenu itemProps={navItemProps} />
        {!user && <div className='absolute right-0 top-full mt-1 hidden lg:block'>
          <GoogleLoginButton/>
        </div>}
      </header>
    </>
  );
};
