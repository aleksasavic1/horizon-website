import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import GameCard from '../components/GameCard';
import Carousel from '../components/common/Carousel';
import { useGames } from '../hooks/games-hook';
import codBg from '../assets/cod-bg.jpg';
import HomeContent from '../components/home/HomeContent';

type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
};

const Home = () => {
  const [cod, setCod] = useState<Game[]>([]);
  const [gta, setGta] = useState<Game[]>([]);

  const {
    data: codGames,
    isPending: isCodPending,
    error: codError,
  } = useGames({
    search: 'call of duty',
    page_size: '15',
  });

  const {
    data: gtaGames,
    isPending: isGtaPending,
    error: gtaError,
  } = useGames({
    search: 'grand theft auto',
    page_size: '15',
  });

  useEffect(() => {
    if (codGames) {
      setCod(codGames);
    }
  }, [codGames]);

  useEffect(() => {
    if (gtaGames) {
      setGta(gtaGames);
    }
  }, [gtaGames]);

  return (
    <Box
      sx={{
        color: '#fff',
        p: 3,

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${codBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',

        '@media (max-width: 768px)': {
          p: 2,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '16px auto 8px',
          padding: '0 10px',
          lineHeight: 1.3,

          '@media (max-width: 768px)': {
            fontSize: '2rem',
          },
        }}
      >
        Explore The Best Games
      </Typography>

      <Typography
        sx={{
          fontSize: '1.1rem',
          textAlign: 'center',
          color: 'hsla(0, 0%, 100%, 0.6)',
          maxWidth: '860px',
          margin: '0 auto 32px',

          '@media (max-width: 768px)': {
            fontSize: '1rem',
          },
        }}
      >
        Discover, explore, and track the most popular games of all time.
      </Typography>

      <HomeContent />

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '2rem', mb: 3, lineHeight: 1.3 }}
        >
          Call of Duty Games
        </Typography>

        {isCodPending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color='secondary' />
          </Box>
        ) : codError ? (
          <Typography sx={{ textAlign: 'center', color: 'red', my: 4 }}>
            Failed to load games. Please try again.
          </Typography>
        ) : codGames.length > 0 ? (
          <Carousel
            items={cod}
            renderItem={(game) => (
              <GameCard key={game.id} game={game} isCarousel />
            )}
          />
        ) : (
          <Typography sx={{ textAlign: 'center', my: 4 }}>
            No games available.
          </Typography>
        )}
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ textAlign: 'center', fontSize: '2rem', mb: 3, lineHeight: 1.3 }}
        >
          Grand Theft Auto Games
        </Typography>

        {isGtaPending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color='secondary' />
          </Box>
        ) : gtaError ? (
          <Typography sx={{ textAlign: 'center', color: 'red', my: 4 }}>
            Failed to load games. Please try again.
          </Typography>
        ) : gtaGames.length > 0 ? (
          <Carousel
            items={gta}
            renderItem={(game) => (
              <GameCard key={game.id} game={game} isCarousel />
            )}
          />
        ) : (
          <Typography sx={{ textAlign: 'center', my: 4 }}>
            No games available.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
