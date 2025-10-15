import React from "react";

export interface GoldenFilledLabelProps {
  text?: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  hideTextOnMobile?: boolean
}

export const GoldenFilledLabel: React.FC<GoldenFilledLabelProps> = ({
  text,
  icon,
  hideTextOnMobile = false,
}) => {
  const isIconOnly = !text;

  return (
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
  );
};
