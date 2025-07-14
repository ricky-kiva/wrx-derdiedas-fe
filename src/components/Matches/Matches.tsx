import type React from 'react';
import MatchItem from './MatchItem';

interface MatchesMatchData {
  id: string,
  word: string
}

interface MatchesProps {
  matchesData: MatchesMatchData[],
  onMatchClick: (word: string) => void;
}

export const Matches: React.FC<MatchesProps> = ({ matchesData, onMatchClick }) => {
  if (matchesData.length <= 1) return null;

  return (
    <>
      <hr className='border-t border-bg-indigo drop-shadow-txt-black' />
      <div className='flex gap-1 overflow-x-auto rounded-full scrollbar-custom-gold'>
        {matchesData.slice(1).map(({ id, word }) => (
          <MatchItem key={id} word={word} onClick={() => onMatchClick(word)} />
        ))}
      </div>
    </>
  );
};
