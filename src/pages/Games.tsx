import { Box, Typography, CircularProgress } from '@mui/material';
import FiltersSidebar from '../components/games/FiltersSidebar';
import GameCard from '../components/GameCard';
import { useGames } from '../hooks/games-hook';

const Games = () => {
  const { data: games, isPending, error } = useGames();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
      }}
    >
      <FiltersSidebar />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#121212',
          color: '#fff',
          padding: '16px',
          overflow: 'auto',
          maxHeight: 'calc(100vh - 68px)',
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
          {isPending ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <CircularProgress color='secondary' />
            </Box>
          ) : error ? (
            <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
              Failed to load games. Please try again.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '40px',
              }}
            >
              {games.map((game: any) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Games;
