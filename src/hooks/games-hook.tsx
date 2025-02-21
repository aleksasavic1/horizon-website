import { useQuery } from '@tanstack/react-query';
import {
  fetchGames,
  fetchGameDetails,
  fetchGameScreenshots,
} from '../services/games-api';

export const useGames = (filters: Record<string, string>) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => fetchGames(filters),
    // staleTime: 1000 * 60 * 5,
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
