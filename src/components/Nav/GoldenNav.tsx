import React from 'react';
import { Link } from 'react-router-dom';
import { GoldenFilledLabel } from '../Label';

export interface GoldenNavProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  hideTextOnMobile?: boolean;
  to: string;
}

export const GoldenNav: React.FC<GoldenNavProps> = (props) => {
  const { text, icon, label, hideTextOnMobile=false, to } = props;

  const isIconOnly = !text;
  const isExternal = /^https?:\/\//.test(to);

  const sharedClass = `h-10 flex border-gold-color-only border-gold-hover transition-all active:scale-[0.98] 
  rounded-full p-[1.5px] ${isIconOnly ? 'aspect-square': hideTextOnMobile ? 'lg:aspect-auto aspect-square' : ''}`;
  
  return isExternal ? (
    <a
      href={to}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={isIconOnly ? label : text}
      className={sharedClass}
    >
      <GoldenFilledLabel text={text} icon={icon} hideTextOnMobile={hideTextOnMobile} />
    </a>
  ) : (
    <Link
      to={to}
      aria-label={isIconOnly ? label : text}
      className={sharedClass}
    >
      <GoldenFilledLabel text={text} icon={icon} hideTextOnMobile={hideTextOnMobile} />
    </Link>
  );
};
