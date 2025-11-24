import type { NumberSuffix } from './types';

export const DEFAULT_NUMBER_SUFFIX: NumberSuffix[] = [
  { value: 1_000_000_000_000, suffix: 'T' },
  { value: 1_000_000_000,     suffix: 'B' },
  { value: 1_000_000,         suffix: 'M' },
  { value: 1_000,             suffix: 'K' },
];
