/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import FiltersSidebar from '../components/games/FiltersSidebar';
import GameCard from '../components/GameCard';
import { useGames } from '../hooks/games-hook';

const Games = () => {
  const [filters, setFilters] = useState<Record<string, string>>({
    page_size: '20',
  });

  const [page, setPage] = useState(1);
  const [allGames, setAllGames] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const {
    data: games,
    isPending,
    error,
    isFetching: isQueryFetching,
  } = useGames({ ...filters, page: page.toString() });

  useEffect(() => {
    setAllGames([]);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (games) {
      setAllGames((prevGames) => {
        const uniqueGames = new Map(prevGames.map((game) => [game.id, game]));
        games.forEach((game: any) => uniqueGames.set(game.id, game));
        return Array.from(uniqueGames.values());
      });
      setIsFetching(false);
    }
  }, [games]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching &&
        !isQueryFetching
      ) {
        setIsFetching(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, isQueryFetching]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
      }}
    >
      <FiltersSidebar setFilters={setFilters} />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#121212',
          color: '#fff',
          padding: '16px',
          overflow: 'visible',
        }}
      >
        <Typography
          sx={{
            fontSize: '2.3rem',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '16px 0',
          }}
        >
          Discover the Best Games of All Time
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          {isPending && !allGames.length ? (
            <CircularProgress color='secondary' />
          ) : error ? (
            <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
              Failed to load games. Please try again.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '40px',

                  '@media (max-width: 1720px)': {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                  },
                  '@media (max-width: 1380px)': {
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  },
                }}
              >
                {allGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </Box>
            </>
          )}
        </Box>
        {isFetching && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}
          >
            <CircularProgress color='secondary' />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Games;
