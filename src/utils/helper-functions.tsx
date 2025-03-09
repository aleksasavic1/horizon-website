import { GameTypes } from '../types/game-types';

export const filterGamesBySearch = (
  games: GameTypes[],
  searchQuery: string
) => {
  if (!searchQuery) return games;

  return games.filter((game) =>
    game.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
};
