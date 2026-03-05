import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GoldenButton, GoogleLoginButton, type GoldenButtonProps } from '../Button';
import { GoldenNav, type GoldenNavProps } from '../Nav';
import { motion } from 'framer-motion';

interface HeaderMenuProps {
  itemProps: (GoldenButtonProps | GoldenNavProps)[];
  isNoteUnread: boolean;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ itemProps, isNoteUnread }) => {
  const { user } = useAuth();

  const location = useLocation();

  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

  return (
    <nav className='flex gap-1 sm:gap-2 justify-end'>
      {itemProps.map((prop, i) => {
        if ('to' in prop) return <GoldenNav key={i} {...prop} />;
        
        if (isNoteUnread && prop.label?.toLowerCase().startsWith('note ')) {
          return <div>
            <motion.div
              aria-hidden
              className="absolute h-10 w-10 rounded-full bg-brdr-goldBrdrTop pointer-events-none"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className='relative'>
              <GoldenButton key={i} {...prop} buttonRef={'buttonRef' in prop ? prop.buttonRef : undefined} />
            </div>
          </div>;
        }

        return <GoldenButton key={i} {...prop} buttonRef={'buttonRef' in prop ? prop.buttonRef : undefined} />;
      })}
      {!user && <div className="block lg:hidden">
        <GoogleLoginButton fromGame={isGameRoute ? true : false} />
      </div>}
    </nav>
  );
};

export default HeaderMenu;
