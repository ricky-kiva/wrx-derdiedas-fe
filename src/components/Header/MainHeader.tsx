import LogoDerDieDas from '../../assets/images/logo-derdiedas-1-c.png';
import IconBook from '../../assets/images/icon-book-1.svg?react';
import IconYouTube from '../../assets/images/icon-youtube-1.svg?react';
import IconGamepad from '../../assets/images/icon-gamepad-1.svg?react';
import IconUser from '../../assets/images/icon-user-1.svg?react';
import IconLogout from '../../assets/images/icon-logout-1.svg?react';
import IconMagnifyingGlass from '../../assets/images/icon-magnifying-glass-1.svg?react';
import IconBars from '../../assets/images/icon-bars-1.svg?react';
import IconMedal from '../../assets/images/icon-medal-1.svg?react';
import HeaderMenu from './HeaderMenu';
import { GoogleLoginButton, type GoldenButtonProps } from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatDisplayUsername } from '../../utils/styler';
import { useModal } from '../../hooks/useModal';
import { DDDNote } from '../Content';
import { Leaderboard } from '../Content/Leaderboard';
import { UserInfo } from '../Content/UserInfo';
import { MobileHeaderMenu } from './MobileHeaderMenu';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useEffect, useRef, useState } from 'react';
import type { GoldenNavProps } from '../Nav';
import { AnimatePresence } from 'framer-motion';

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuNavRef = useRef<HTMLButtonElement>(null);

  const { user, logout } = useAuth();
  const { openModal } = useModal();
  const isMobile = useIsMobile(768);

  const location = useLocation();

  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handler = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current) return;
      if (mobileMenuNavRef.current?.contains(target)) return;
      if (!menuRef.current.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };

    document.addEventListener('pointerdown', handler);

    return () => document.removeEventListener('pointerdown', handler);
  }, [isMobileMenuOpen]);

  const noteNavItem = { icon: IconBook, label: 'Note for DerDieDas', onClick: (() => {
    openModal({ title: '📕 NOTE ON DERDIEDAS', body: <DDDNote /> });
    setIsMobileMenuOpen(false);
  })};

  const leaderboardNavItem = { icon: IconMedal, label: 'Leaderboard', onClick: (() => {
    openModal({ title: '🏅 LEADERBOARD', body: <Leaderboard /> }, { wider: true, cleanQParams: true });
    setIsMobileMenuOpen(false);
  })};

  const newChannelNavItem = { 
    to: 'https://www.youtube.com/@rexzeppelin', text: 'Support my new channel', icon: IconYouTube, hideTextOnMobile: true 
  };

  const mobileMenuNavItem = { icon: IconBars, label: 'Menu', buttonRef: mobileMenuNavRef, onClick: (() => setIsMobileMenuOpen((prev) => !prev))};

  const gameNavItem = !isGameRoute 
    ? { to: '/game', text: 'Play', icon: IconGamepad, hideTextOnMobile: true }
    : { to: '/', text: 'Search', icon: IconMagnifyingGlass, hideTextOnMobile: true };

  const userNavItem = user 
    ? [
      { icon: IconUser, text: formatDisplayUsername(user.name), hideTextOnMobile: true, onClick: (() => {
        openModal({ title: `❤️ HI THERE!`, body: <UserInfo /> }, { compact: true });
      })},
      { icon: IconLogout, label: 'Logout', hideTextOnMobile: true, onClick: logout }
    ] satisfies (GoldenButtonProps | GoldenNavProps)[] 
    : [];

  const navItemProps: (GoldenButtonProps | GoldenNavProps)[] = [
    noteNavItem, leaderboardNavItem, newChannelNavItem, gameNavItem, ...userNavItem
  ];

  const mobileNavItemProps: (GoldenButtonProps | GoldenNavProps)[] = [
    gameNavItem, mobileMenuNavItem
  ];

  const mobileMenuItemProps: (GoldenButtonProps | GoldenNavProps)[] = [
    noteNavItem, leaderboardNavItem, newChannelNavItem, ...userNavItem
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
        <HeaderMenu itemProps={isMobile ? mobileNavItemProps : navItemProps} />
        <AnimatePresence>
          {isMobileMenuOpen && isMobile && <MobileHeaderMenu ref={menuRef} itemProps={mobileMenuItemProps} />}
        </AnimatePresence>
        {!user && <div className='absolute right-0 top-full mt-1 hidden lg:block'>
          <GoogleLoginButton fromGame={isGameRoute ? true : false} />
        </div>}
      </header>
    </>
  );
};
