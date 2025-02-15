import { useQuery } from '@tanstack/react-query';
import { fetchGames, fetchGameDetails } from '../services/games-api';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
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
