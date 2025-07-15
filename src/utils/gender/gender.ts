import type { Gender, GenderLabel } from '../../types/types';

export const getGenderLabel = (gender: Gender | null): GenderLabel => {
  switch (gender) {
    case 'masculine':
      return 'DER';
    case 'feminine':
      return 'DIE';
    case 'neuter':
      return 'DAS';
    default:
      return '?';
  }
};
