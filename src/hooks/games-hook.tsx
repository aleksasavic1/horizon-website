import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../services/games-api';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  });
};
