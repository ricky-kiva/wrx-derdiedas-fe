import React, { type Ref } from 'react';
import { GoldenFilledLabel } from '../Label';
import { getCornerClass, type ButtonType, type CornerStyle } from '../../utils/styler/component';

export interface GoldenButtonProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  type?: ButtonType;
  buttonRef?: Ref<HTMLButtonElement>
  hideTextOnMobile?: boolean;
  cornerStyle?: CornerStyle;
  small?: boolean;
  compact?: boolean;
  inRow?: boolean;
  iconLeft?: boolean;
  onClick?: () => void;
}

export const GoldenButton: React.FC<GoldenButtonProps> = (props) => {
  const { 
    text, icon, label, buttonRef, cornerStyle, onClick,
    type='button',
    hideTextOnMobile=false, 
    small=false, 
    compact=false, 
    inRow=false,
    iconLeft=false
   } = props;
  
  const isIconOnly = !text;
  const cornerClass = getCornerClass(cornerStyle);
  const paddingClass = inRow ? 'pt-[1.5px] pb-[1.5px] pl-[1.5px]' : 'p-[1.5px]';

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      type={type}
      aria-label={isIconOnly ? label : text}
      className={`w-fit ${small ? 'h-8' : 'h-10'} flex border-gold-color-only border-gold-hover transition-all active:scale-[0.98] 
        ${cornerClass} ${paddingClass} ${isIconOnly ? 'aspect-square': hideTextOnMobile ? 'lg:aspect-auto aspect-square' : ''}`}
    >
      <GoldenFilledLabel text={text} icon={icon} hideTextOnMobile={hideTextOnMobile} cornerStyle={cornerStyle} small={small} compact={compact} iconLeft={iconLeft} />
    </button>
  );
};
