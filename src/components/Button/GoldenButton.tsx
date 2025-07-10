import React from 'react';

export interface GoldenButtonProps {
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  onClick?: () => void;
}

export const GoldenButton: React.FC<GoldenButtonProps> = ({ text, icon, label, onClick }) => {
  const isIconOnly = !text;
  
  return (
    <button 
      onClick={onClick}
      type='submit'
      aria-label={isIconOnly ? label : text } 
      className={`flex border-gold-color-only-plus-hover rounded-full p-[1.5px] ${isIconOnly ? 'h-10 aspect-square' : 'h-10'}`}
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
