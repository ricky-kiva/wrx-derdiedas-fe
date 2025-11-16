import type { Gender } from '../shared/types';

export interface Noun {
  id: string;
  word: string;
  gender: Gender;
  meanings: string[]
};

export interface SearchedNoun {
  item: Noun;
  score: number;
}
