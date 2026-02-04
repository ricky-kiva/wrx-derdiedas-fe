import React from "react";
import { getCornerClass, type CornerStyle } from '../../utils/styler/component';
import Lottie from 'lottie-react';
import LottieLoading from '../../assets/lottie/loading-1.json';

export interface GoldenFilledLabelProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  hideTextOnMobile?: boolean;
  isLoading?: boolean;
  cornerStyle?: CornerStyle;
  small?: boolean;
  compact?: boolean;
  iconLeft?: boolean;
}

export const GoldenFilledLabel: React.FC<GoldenFilledLabelProps> = (props) => {
  const { text, icon, hideTextOnMobile=false, isLoading=false, cornerStyle, small=false, compact=false, iconLeft=false } = props;
  
  const isIconOnly = !text;
  const cornerClass = getCornerClass(cornerStyle);

  const baseClass = isIconOnly
    ? 'w-full h-full justify-center'
    : hideTextOnMobile
      ? `lg:gap-x-2 ${compact ? 'lg:px-3' : 'lg:px-5'} gap-0 ${compact ? 'px-4' : 'px-0'} w-full h-full justify-center lg:justify-start`
      : `gap-x-2 ${compact ? 'px-3' : 'px-4'}`;

  const textNode = !isIconOnly && (<span className={hideTextOnMobile ? 'hidden lg:inline' : 'inline'}>{text}</span>);
  const iconNode = isLoading 
    ? <Lottie 
      animationData={LottieLoading} 
      loop 
      autoplay 
      className='scale-[2.75] origin-center inline-block'
      style={{
        display: 'inline-block',
        width: '12px',
        height: '12px', 
      }}/> 
    : (icon && React.createElement(icon, { className: `${small ? 'w-2 h-2' : 'w-3 h-3'} fill-bg-indigo` }));

  const content = iconLeft ? [iconNode, textNode] : [textNode, iconNode];

  return (
    <span className={`flex items-center bg-btn-gold ${cornerClass} ${baseClass}`}>
      {content}
    </span>
  );
};
