import type React from 'react';
import MatchItem from './MatchItem';

interface MatchesProps {
  words: string[]
}

export const Matches: React.FC<MatchesProps> = ({ words }) => {
  if (!words || words.length === 0) return null;

  return (
    <>
      <hr className='border-t border-bg-indigo drop-shadow-txt-black' />
      <div className='flex gap-1 overflow-x-auto rounded-full scrollbar-custom-gold'>
        {words.map((word) => (
          <MatchItem word={word} />
        ))}
      </div>
    </>
  );
};
