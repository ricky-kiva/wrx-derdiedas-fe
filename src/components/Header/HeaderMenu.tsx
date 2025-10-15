import { GoldenButton, type GoldenButtonProps } from '../Button';
import { GoldenNav, type GoldenNavProps } from '../Nav/GoldenNav';

interface HeaderMenuProps {
  itemProps: (GoldenButtonProps | GoldenNavProps)[]
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ itemProps }) => (
  <nav className='flex gap-2'>
    {itemProps.map((prop, i) => {
      if ('to' in prop) return <GoldenNav key={i} {...prop} />;
      return <GoldenButton key={i} {...prop} />;
    })}
  </nav>
);

export default HeaderMenu;
