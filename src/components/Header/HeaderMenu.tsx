import { GoldenButton, type GoldenButtonProps } from '../Button';

interface HeaderMenuProps {
  buttonProps: GoldenButtonProps[]
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ buttonProps }) => (
  <div className='flex gap-2'>
    {buttonProps.map((prop, i) => (
      <GoldenButton key={i} text={prop.text} icon={prop.icon} onClick={prop.onClick} />
    ))}
  </div>
);

export default HeaderMenu;
