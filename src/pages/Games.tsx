import { Box } from '@mui/material';
import FiltersSidebar from '../components/games/FiltersSidebar';
import GameCard from '../components/GameCard';
import { gamesData } from '../../mockData';

const Games = () => {
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
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '40px',
            }}
          >
            {gamesData.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Games;
