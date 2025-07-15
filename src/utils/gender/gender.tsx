import type { JSX } from 'react';
import type { Gender } from '../../types/types';

export const highlightGenderRules = (word: string, gender: Gender): JSX.Element | string => {
  const suffixGroups: Record<Gender, RegExp> = {
    masculine: /(ling|ich|ig|er|us)$/i,
    feminine: /(ung|schaft|ion|heit|keit|tät|ik|ade|age|euse|ere|ie|anz|enz)$/i,
    neuter: /(chen|um|ment|ma)$/i
  };

  const prefixGroup: Record<Gender, RegExp | null> = {
    masculine: null,
    feminine: null,
    neuter: /^ge/i
  };

  const matchAndHighlight = (regex: RegExp | null, type: 'prefix' | 'suffix'): JSX.Element | null => {
    if (!regex) return null;

    const match = word.match(regex);
    if (!match) return null;

    const part = match[0];

    if (type === 'prefix') {
      return (
        <>
          <span className='underline'>{part}</span>
          {word.slice(part.length)}
        </>
      );
    } else {
      return (
        <>
          {word.slice(0, -part.length)}
          <span className='underline'>{part}</span>
        </>
      );
    }
  };

  return (
    matchAndHighlight(prefixGroup[gender], 'prefix')
      ?? matchAndHighlight(suffixGroups[gender], 'suffix')
      ?? word
  );
};
