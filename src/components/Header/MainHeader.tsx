import LogoDerDieDas from '../../assets/images/logo-derdiedas-1-c.png';
import IconBook from '../../assets/images/icon-book-1.svg?react';
import IconYouTube from '../../assets/images/icon-youtube-1.svg?react';
import IconGamepad from '../../assets/images/icon-gamepad-1.svg?react';
import HeaderMenu from './HeaderMenu';
import type { GoldenButtonProps } from '../Button';

export const MainHeader = () => {
  const buttonProps: GoldenButtonProps[] = [
    { icon: IconBook, label: 'Note for DerDieDas', onClick: (() => {}) },
    { text: 'Support my new channel', icon: IconYouTube, hideTextOnMobile: true, onClick: (() => {}) },
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
