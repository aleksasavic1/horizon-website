import { useQuery } from '@tanstack/react-query';
import {
  fetchGames,
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameStores,
} from '../services/games-api';
import { GameTypes } from '../types/game-types';

export const useGames = (filters: Record<string, string>) => {
  return useQuery<GameTypes[]>({
    queryKey: ['games', filters],
    queryFn: () => fetchGames(filters),
  });
};

export const useGameDetails = (id: string) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGameDetails(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useGameScreenshots = (id: string) => {
  return useQuery({
    queryKey: ['gameScreenshots', id],
    queryFn: () => fetchGameScreenshots(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useGameStores = (id: string) => {
  return useQuery({
    queryKey: ['gameStores', id],
    queryFn: () => fetchGameStores(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
