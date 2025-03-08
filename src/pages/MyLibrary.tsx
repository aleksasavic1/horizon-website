import { Box, Typography } from '@mui/material';
import useLibraryStore from '../store/library-store';
import GameCard from '../components/GameCard';
import batmanBg from '../assets/batman-bg.jpg';

const MyLibrary = () => {
  const { games } = useLibraryStore();

  return (
    <Box
      sx={{
        p: 3,
        color: '#fff',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${batmanBg})`,
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
        }}
      >
        My Library
      </Typography>

      <Typography
        sx={{
          fontSize: '1.1rem',
          textAlign: 'center',
          color: 'hsla(0, 0%, 100%, 0.6)',
          maxWidth: '720px',
          margin: '0 auto 32px',

          '@media (max-width: 768px)': {
            fontSize: '1rem',
          },
        }}
      >
        Explore your personal game collection! Keep track of your favorite
        games, discover new ones, and build the ultimate gaming library.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {games.length === 0 ? (
          <Typography sx={{ textAlign: 'center', opacity: 0.7 }}>
            No games in your library yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '40px',

              '@media (min-width: 2559px)': {
                gridTemplateColumns: 'repeat(6, 1fr)',
              },
              '@media (max-width: 1919px)': {
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
              '@media (max-width: 1439px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
              },
              '@media (max-width: 1079px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },
              '@media (max-width: 767px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
              },
            }}
          >
            {games.map((game) => (
              <GameCard key={game.id} game={game} isInLibrary />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyLibrary;
