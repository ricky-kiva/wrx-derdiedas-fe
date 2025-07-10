import React from 'react';

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
      <span className={`flex items-center bg-btn-gold rounded-full
        ${ isIconOnly ? 'w-full h-full justify-center' : hideTextOnMobile
          ? 'lg:gap-x-2 lg:px-5 gap-0 px-0 w-full h-full justify-center lg:justify-start'
          : 'gap-x-2 px-5'}`
      }>
        {!isIconOnly && 
          <span className={hideTextOnMobile ? 'hidden lg:inline' : 'inline'}>
            {text}
          </span>
        }
        {icon && React.createElement(icon, { className: "w-3 h-3 fill-bg-indigo" })}
      </span>
    </button>
  );
};
