import LogoDerDieDas from '../../assets/images/logo-derdiedas-1-c.png';
import IconBook from '../../assets/images/icon-book-1.svg?react';
import IconYouTube from '../../assets/images/icon-youtube-1.svg?react';
import IconGamepad from '../../assets/images/icon-gamepad-1.svg?react';
import HeaderMenu from './HeaderMenu';
import type { GoldenButtonProps } from '../Button';
import type { LetterModalContent } from '../Modal';
import { DDDNote } from '../Content';

interface MainHeaderProps {
  setModalContent: React.Dispatch<React.SetStateAction<LetterModalContent | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const openMyChannel = () => window
  .open('https://www.youtube.com/@rexzeppelin', '_blank', 'noopener,noreferrer');

export const MainHeader: React.FC<MainHeaderProps> = ({ setModalContent, setShowModal }) => {
  const buttonProps: GoldenButtonProps[] = [
    { icon: IconBook, label: 'Note for DerDieDas', onClick: (() => {
      setShowModal(true); 
      setModalContent({ 
        title: 'NOTE ON DERDIEDAS',
        body: <DDDNote />
      });
    }) },
    { text: 'Support my new channel', icon: IconYouTube, hideTextOnMobile: true, onClick: openMyChannel },
    { text: 'Play', icon: IconGamepad, hideTextOnMobile: false, onClick: (() => {}) }
  ];
  
  return (
    <div className='w-full flex justify-between'>
      <a href='/'>
        <img src={LogoDerDieDas} alt='DerDieDas Logo' className='w-16 hover:animate-spin-propeller' />
      </a>
      <HeaderMenu buttonProps={buttonProps} />
    </div>
  );
};
