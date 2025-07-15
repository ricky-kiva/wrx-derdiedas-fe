import type { JSX } from 'react';

export const highlightGenderRules = (word: string): JSX.Element | string => {
  const suffixRegex = /(ling|ich|ig|er|ung|schaft|ion|heit|keit|tät|ik|ade|age|euse|ere|ie|anz|enz|chen|um|ment)$/i;

  const lower = word.toLowerCase();

  if (lower === 'mädchen') return word;

  const match = word.match(suffixRegex);

  if (match) {
    const suffix = match[0];
    const base = word.slice(0, -suffix.length);

    return (
      <>
        {base}
        <span className='underline'>{suffix}</span>
      </>
    );
  }

  return word;
};
