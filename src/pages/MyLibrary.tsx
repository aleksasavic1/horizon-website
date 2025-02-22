import { Box, Typography } from '@mui/material';
import useLibraryStore from '../store/library-store';
import GameCard from '../components/GameCard';

const MyLibrary = () => {
  const { games } = useLibraryStore();

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <Typography
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '16px 0 32px 0',
        }}
      >
        My Library
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {games.length === 0 ? (
          <Typography sx={{ textAlign: 'center', opacity: 0.7 }}>
            No games in your library yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '40px',

              '@media (max-width: 1440px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
              },
              '@media (max-width: 1080px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
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
