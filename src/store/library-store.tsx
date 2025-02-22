import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GameTypes } from '../types/game-types';

interface LibraryState {
  games: GameTypes[];
  addGame: (game: GameTypes) => void;
  removeGame: (id: number) => void;
}

const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      games: [],
      addGame: (game) => {
        const currentGames = get().games;
        if (!currentGames.some((g) => g.id === game.id)) {
          set({ games: [...currentGames, game] });
        }
      },
      removeGame: (id) => {
        set({ games: get().games.filter((game) => game.id !== id) });
      },
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLibraryStore;
