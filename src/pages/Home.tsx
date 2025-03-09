import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import GameCard from '../components/GameCard';
import Carousel from '../components/common/Carousel';
import { useGames } from '../hooks/games-hook';

type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
};

const Home = () => {
  const [newestGames, setNewestGames] = useState<Game[]>([]);

  const {
    data: games,
    isPending,
    error,
  } = useGames({
    ordering: '-released',
    page_size: '10',
  });

  useEffect(() => {
    if (games) {
      setNewestGames(games);
    }
  }, [games]);

  return (
    <Box
      sx={{
        color: '#fff',
        p: 3,

        '@media (max-width: 768px)': {
          p: 2,
        },
      }}
    >
      {isPending ? (
        <CircularProgress color='secondary' />
      ) : error ? (
        <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
          Failed to load games. Please try again.
        </Typography>
      ) : games.length > 0 ? (
        <Carousel
          items={newestGames}
          renderItem={(game) => (
            <GameCard key={game.id} game={game} isCarousel />
          )}
        />
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 5 }}>
          No games available.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
