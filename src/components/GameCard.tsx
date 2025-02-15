import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './common/CustomButton';
import { GameTypes } from '../types/game-types';
import gamePlaceholder from '../assets/game-placeholder.png';

type GameCardProps = {
  game: GameTypes;
};

const GameCard = ({ game }: GameCardProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToLibrary = () => {
    setIsAdded(true);
  };

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ minHeight: '170px', maxHeight: '170px', overflow: 'hidden' }}>
        <Box
          component='img'
          src={game.background_image || gamePlaceholder}
          alt={game.name}
          sx={{
            width: '100%',
            objectFit: 'cover',
            transition: '300ms ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant='h6'
            sx={{ lineHeight: 1.3, marginBottom: '4px' }}
          >
            {game.name || 'No Name'}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            {game.genres.length > 1 ? 'Genres: ' : 'Genre: '}
            {game.genres.map((genre: any) => genre.name).join(', ')}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            Rating: {game.rating || 'No rating'}
          </Typography>
        </Box>

        <Box>
          <CustomButton
            variant='orange'
            onClick={handleAddToLibrary}
            disabled={isAdded}
            sx={{ marginTop: '10px' }}
          >
            {isAdded ? 'Added to Library' : 'Add to My Library'}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default GameCard;
