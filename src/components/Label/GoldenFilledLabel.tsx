import React from "react";
import { getCornerClass, type CornerStyle } from '../../utils/styler/component';

export interface GoldenFilledLabelProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  hideTextOnMobile?: boolean;
  cornerStyle?: CornerStyle;
  small?: boolean;
  compact?: boolean;
  iconLeft?: boolean;
}

export const GoldenFilledLabel: React.FC<GoldenFilledLabelProps> = (props) => {
  const { text, icon, hideTextOnMobile=false, cornerStyle, small=false, compact=false, iconLeft=false } = props;
  
  const isIconOnly = !text;
  const cornerClass = getCornerClass(cornerStyle);

  const baseClass = isIconOnly
    ? 'w-full h-full justify-center'
    : hideTextOnMobile
      ? `lg:gap-x-2 ${compact ? 'lg:px-3' : 'lg:px-5'} gap-0 ${compact ? 'px-4' : 'px-0'} w-full h-full justify-center lg:justify-start`
      : `gap-x-2 ${compact ? 'px-3' : 'px-5'}`;

  const iconNode = icon && React.createElement(icon, { className: `${small ? 'w-2 h-2' : 'w-3 h-3'} fill-bg-indigo` });
  const textNode = !isIconOnly && (<span className={hideTextOnMobile ? 'hidden lg:inline' : 'inline'}>{text}</span>);

  const content = iconLeft ? [iconNode, textNode] : [textNode, iconNode];

  return (
    <span className={`flex items-center bg-btn-gold ${cornerClass} ${baseClass}`}>
      {content}
    </span>
  );
};
