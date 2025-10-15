import LogoDerDieDas from '../../assets/images/logo-derdiedas-1-c.png';
import IconBook from '../../assets/images/icon-book-1.svg?react';
import IconYouTube from '../../assets/images/icon-youtube-1.svg?react';
import IconGamepad from '../../assets/images/icon-gamepad-1.svg?react';
import HeaderMenu from './HeaderMenu';
import type { GoldenButtonProps } from '../Button';
import type { LetterModalContent } from '../Modal';
import { DDDNote } from '../Content';
import { Link } from 'react-router-dom';
import type { GoldenNavProps } from '../Nav/GoldenNav';

interface MainHeaderProps {
  setModalContent: React.Dispatch<React.SetStateAction<LetterModalContent | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ setModalContent, setShowModal }) => {
  const navItemProps: (GoldenButtonProps | GoldenNavProps)[] = [
    { icon: IconBook, label: 'Note for DerDieDas', onClick: (() => {
      setShowModal(true); 
      setModalContent({ 
        title: 'NOTE ON DERDIEDAS',
        body: <DDDNote />
      });
    }) },
    { to: 'https://www.youtube.com/@rexzeppelin', text: 'Support my new channel', icon: IconYouTube, hideTextOnMobile: true },
    { to: '/game', text: 'Play', icon: IconGamepad, hideTextOnMobile: false}
  ];
  
  return (
    <header className='w-full flex justify-between'>    
      <Link to="/">
        <img
          src={LogoDerDieDas}
          alt="DerDieDas Logo"
          className="w-16 hover:animate-spin-propeller"
        />
      </Link>
      <HeaderMenu itemProps={navItemProps} />
    </header>
  );
};
