import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './common/CustomButton';
import { GameTypes } from '../types/game-types';

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
          src={game.image}
          alt={game.title}
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

      <Box sx={{ padding: '12px' }}>
        <Typography variant='h6'>{game.title}</Typography>
        <Typography variant='body2' sx={{ opacity: 0.7 }}>
          Genre: {game.genre}
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.7 }}>
          Rating: {game.rating} ⭐
        </Typography>

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
  );
};

export default GameCard;
