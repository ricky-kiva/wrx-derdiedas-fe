import { useAuth } from '../../hooks/useAuth';
import { GoldenButton, GoogleLoginButton, type GoldenButtonProps } from '../Button';
import { GoldenNav, type GoldenNavProps } from '../Nav';

interface HeaderMenuProps {
  itemProps: (GoldenButtonProps | GoldenNavProps)[]
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ itemProps }) => {
  const { user } = useAuth();

  return (
    <nav className='flex gap-2 justify-end'>
      {itemProps.map((prop, i) => {
        if ('to' in prop) return <GoldenNav key={i} {...prop} />;
        return <GoldenButton key={i} {...prop} buttonRef={'buttonRef' in prop ? prop.buttonRef : undefined} />;
      })}
      {!user && <div className="block lg:hidden">
        <GoogleLoginButton />
      </div>}
    </nav>
  );
};

export default HeaderMenu;
