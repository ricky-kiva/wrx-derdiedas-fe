import React from "react";
import { getCornerClass, type CornerStyle } from '../../utils/styler/component';

export interface GoldenFilledLabelProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  hideTextOnMobile?: boolean;
  cornerStyle?: CornerStyle;
  compact?: boolean;
}

export const GoldenFilledLabel: React.FC<GoldenFilledLabelProps> = (props) => {
  const { text, icon, hideTextOnMobile=false, cornerStyle, compact=false } = props;
  
  const isIconOnly = !text;
  const cornerClass = getCornerClass(cornerStyle);

  const baseClass = isIconOnly
    ? 'w-full h-full justify-center'
    : hideTextOnMobile
      ? `lg:gap-x-2 ${compact ? 'lg:px-3' : 'lg:px-5'} gap-0 ${compact ? 'px-4' : 'px-0'} w-full h-full justify-center lg:justify-start`
      : `gap-x-2 ${compact ? 'px-3' : 'px-5'}`;

  return (
    <span className={`flex items-center bg-btn-gold ${cornerClass} ${baseClass}`}>
      {!isIconOnly && (
        <span className={hideTextOnMobile ? 'hidden lg:inline' : 'inline'}>
          {text}
        </span>
      )}
      {icon && React.createElement(icon, { className: "w-3 h-3 fill-bg-indigo" })}
    </span>
  );
};
