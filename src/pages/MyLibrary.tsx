import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CustomInput from '../components/common/CustomInput';
import useLibraryStore from '../store/library-store';
import GameCard from '../components/GameCard';
import { filterGamesBySearch } from '../utils/helper-functions';
import batmanBg from '../assets/images/batman-bg.jpg';
import { GameTypes } from '../types/game-types';

const MyLibrary = () => {
  const { games } = useLibraryStore();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = filterGamesBySearch(games, searchQuery);

  return (
    <Box
      sx={{
        p: 3,
        color: 'white',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${batmanBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 68px)',

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
          lineHeight: 1.4,

          '@media (max-width: 768px)': {
            fontSize: '2rem',
          },
          '@media (min-width: 1921px)': {
            fontSize: '2.4rem',
          },
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
          '@media (min-width: 1921px)': {
            fontSize: '1.3rem',
          },
        }}
      >
        Explore your personal game collection! Keep track of your favorite
        games, discover new ones, and build the ultimate gaming library.
      </Typography>

      <Box
        sx={{ display: 'flex', justifyContent: 'end', marginBottom: '32px' }}
      >
        <CustomInput
          placeholder='Search Games'
          name='search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '340px',
            height: '48px',
            '@media (max-width: 768px)': {
              width: '300px',
            },
            '@media (max-width: 440px)': {
              width: '100%',
            },
          }}
          startAdornment={
            <SearchRoundedIcon sx={{ color: 'gray', fontSize: '24px' }} />
          }
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {games.length === 0 ? (
          <Typography
            sx={{
              textAlign: 'center',
              opacity: 0.7,
              '@media (min-width: 1921px)': {
                fontSize: '1.1rem',
              },
            }}
          >
            No games in your library yet.
          </Typography>
        ) : filteredGames.length === 0 ? (
          <Typography
            sx={{
              textAlign: 'center',
              opacity: 0.7,
              '@media (min-width: 1921px)': {
                fontSize: '1.1rem',
              },
            }}
          >
            No games found for your search.
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
            {filteredGames.map((game: GameTypes) => (
              <GameCard key={game.id} game={game} isInLibrary />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyLibrary;
