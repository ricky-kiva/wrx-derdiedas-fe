import { date } from '../../lib/date/date';
import { DEFAULT_NUMBER_SUFFIX } from './constants';
import type { NumberSuffix } from './types';

export const formatRelativeDate = (dateStr: string) => {
  return date(dateStr).fromNow();
};

export const  formatNumberSuffix = (
  num: number,
  decimals: number=2,
  scales: NumberSuffix[]=DEFAULT_NUMBER_SUFFIX
): string => {
  const absNum = Math.abs(num);

  for (const { value, suffix } of scales) {
    if (absNum >= value) {
      const shortNum = (num / value).toFixed(decimals);
      
      return shortNum.replace(/\.?0+$/, '') + suffix;
    }
  }

  return num.toString();
};

export const formatDisplayUsername = (name: string): string => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return '';

  const first = parts[0];
  const rest = parts.slice(1);

  const firstFormatted =
    first.length > 8
      ? `${first.slice(0, 7)}.,`
      : `${first.charAt(0).toUpperCase()}${first.slice(1)}`;

  if (rest.length === 0) return firstFormatted;

  const initials = rest.map((w) => w.charAt(0).toUpperCase()).join('');

  return `${firstFormatted} ${initials}.`;
};

export const formatRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return rank;
  }
};
