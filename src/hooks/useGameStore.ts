import { create } from 'zustand';
import type { Noun } from '../types/noun/types';

interface GameState {
  gameId: string | null;
  nouns: Omit<Noun, 'gender'>[];
  setGameId: (id: string | null) => void;
  setNouns: (nouns: Omit<Noun, 'gender'>[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameId: null,
  nouns: [],
  setGameId: (id) => set({ gameId: id }),
  setNouns: (nouns) => set({ nouns })
}));
