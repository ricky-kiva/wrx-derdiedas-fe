import React from 'react';
import { GoldenFilledLabel } from '../Label';

export interface GoldenButtonProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  hideTextOnMobile?: boolean;
  onClick?: () => void;
}

export const GoldenButton: React.FC<GoldenButtonProps> = (props) => {
  const { text, icon, label, hideTextOnMobile=false, onClick } = props;
  
  const isIconOnly = !text;

  return (
    <button
      onClick={onClick}
      type="submit"
      aria-label={isIconOnly ? label : text}
      className={`h-10 flex border-gold-color-only border-gold-hover rounded-full p-[1.5px] 
        ${isIconOnly ? 'aspect-square': hideTextOnMobile ? 'lg:aspect-auto aspect-square' : ''}`}
    >
      <GoldenFilledLabel text={text} icon={icon} hideTextOnMobile={hideTextOnMobile} />
    </button>
  );
};
