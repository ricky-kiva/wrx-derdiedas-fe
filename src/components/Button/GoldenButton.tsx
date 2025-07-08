import React from 'react';

export interface GoldenButtonProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  onClick: () => void;
}

export const GoldenButton: React.FC<GoldenButtonProps> = ({ text, icon, onClick }) => {
  const isIconOnly = !text;
  
  return (
    <button 
      onClick={onClick} 
      className={`flex bg-gradient-to-b from-brdr-goldBrdrTop to-brdr-goldBrdrBottom p-[1.5px] 
      rounded-full transition-shadow duration-200 shadow-out-btn-bottom-black hover:shadow-in-out-btn-hvr-top-gold-bottom-black
      ${isIconOnly ? 'h-10 aspect-square' : 'h-10'}`}
    >
      <span className={`flex items-center bg-btn-gold rounded-full
        ${isIconOnly ? 'w-full h-full justify-center' : 'gap-x-2 px-5'}`}
      >
        { !isIconOnly && <span>{text}</span> }
        {icon && React.createElement(icon, { className:"w-3 h-3 fill-bg-indigo" })}
      </span>
    </button>
  );
};
