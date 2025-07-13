import type React from 'react';

interface MatchItemProps {
  word: string
  onClick?: () => void;
}

const MatchItem: React.FC<MatchItemProps> = ({ word, onClick }) => (
  <button 
    className='px-3 py-1 bg-txt-black rounded-full border-gold-hover-center shadow-out-btn-bottom-black
      whitespace-nowrap'
    type='button'
    onClick={onClick}
  >
    {word}
  </button>
);

export default MatchItem;
