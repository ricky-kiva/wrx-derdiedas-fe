import type React from 'react';

interface HDividerProps {
  text?: string
  dark?: boolean
  margin?: number
}

export const HDivider: React.FC<HDividerProps> = ({ text, dark, margin=6 }) => {
  return (
    <div className={`flex items-center`} style={{ marginTop: margin, marginBottom: margin }}>
      <div className={`flex-grow h-px ${dark ? 'bg-brdr-goldBrdrBottom' : 'bg-bg-indigo'}`}></div>
      {text && <span className='mx-2 opacity-85'>{text}</span>}
      <div className={`flex-grow h-px ${dark ? 'bg-brdr-goldBrdrBottom' : 'bg-bg-indigo'}`}></div>
    </div>
  );
};
