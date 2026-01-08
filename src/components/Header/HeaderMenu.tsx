import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GoldenButton, GoogleLoginButton, type GoldenButtonProps } from '../Button';
import { GoldenNav, type GoldenNavProps } from '../Nav';

interface HeaderMenuProps {
  itemProps: (GoldenButtonProps | GoldenNavProps)[]
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ itemProps }) => {
  const { user } = useAuth();

  const location = useLocation();

  const pathName = location.pathname;
  const isGameRoute = pathName.startsWith('/game');

  return (
    <nav className='flex gap-1 sm:gap-2 justify-end'>
      {itemProps.map((prop, i) => {
        if ('to' in prop) return <GoldenNav key={i} {...prop} />;
        return <GoldenButton key={i} {...prop} buttonRef={'buttonRef' in prop ? prop.buttonRef : undefined} />;
      })}
      {!user && <div className="block lg:hidden">
        <GoogleLoginButton fromGame={isGameRoute ? true : false} />
      </div>}
    </nav>
  );
};

export default HeaderMenu;
