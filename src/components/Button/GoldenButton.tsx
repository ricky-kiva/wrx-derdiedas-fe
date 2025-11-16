import React from 'react';
import { GoldenFilledLabel } from '../Label';
import { getCornerClass, type CornerStyle } from '../../utils/styler/component';

export interface GoldenButtonProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  hideTextOnMobile?: boolean;
  cornerStyle?: CornerStyle;
  compact?: boolean;
  inRow?: boolean;
  onClick?: () => void;
}

export const GoldenButton: React.FC<GoldenButtonProps> = (props) => {
  const { text, icon, label, hideTextOnMobile=false, cornerStyle, compact=false, inRow=false, onClick } = props;
  
  const isIconOnly = !text;
  const cornerClass = getCornerClass(cornerStyle);
  const paddingClass = inRow ? 'pt-[1.5px] pb-[1.5px] pl-[1.5px]' : 'p-[1.5px]';

  return (
    <button
      onClick={onClick}
      type="submit"
      aria-label={isIconOnly ? label : text}
      className={`w-fit h-10 flex border-gold-color-only border-gold-hover ${cornerClass} ${paddingClass} 
        ${isIconOnly ? 'aspect-square': hideTextOnMobile ? 'lg:aspect-auto aspect-square' : ''}`}
    >
      <GoldenFilledLabel text={text} icon={icon} hideTextOnMobile={hideTextOnMobile} cornerStyle={cornerStyle} compact={compact} />
    </button>
  );
};
