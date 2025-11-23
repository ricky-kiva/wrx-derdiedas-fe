import type React from 'react';

interface HDividerProps {
  text?: string
}

export const HDivider: React.FC<HDividerProps> = ({ text }) => {
  return (
    <div className='flex items-center my-6'>
      <div className='flex-grow h-px bg-bg-indigo'></div>
      {text && <span className='mx-2 opacity-85'>{text}</span>}
      <div className='flex-grow h-px bg-bg-indigo'></div>
    </div>
  );
};
