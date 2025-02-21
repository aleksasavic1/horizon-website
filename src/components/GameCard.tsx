import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import CustomButton from './common/CustomButton';
import { GameTypes, Genre } from '../types/game-types';
import gamePlaceholder from '../assets/game-placeholder.png';
import useLibraryStore from '../store/library-store';
import { useGameStores } from '../hooks/games-hook';

type GameCardProps = {
  game: GameTypes;
  isInLibrary?: boolean;
};

const GameCard = ({ game, isInLibrary = false }: GameCardProps) => {
  const navigate = useNavigate();
  const { games, addGame, removeGame } = useLibraryStore();
  const isAdded = games.some((g) => g.id === game.id);
  const { data: stores, isPending } = useGameStores(game.id.toString());

  const handleAddOrRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(isAdded);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isAdded ? removeGame(game.id) : addGame(game);
  };

  const handleStore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(stores[0].url, '_blank');
  };

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <Box
      onClick={handleClick}
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
            height: '100%',
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
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
            {game.name || 'No Name'}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            {game.genres.length > 1 ? 'Genres: ' : 'Genre: '}
            {game.genres.map((genre: Genre) => genre.name).join(', ')}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            Rating: {game.rating || 'No rating'}
          </Typography>
          <Typography variant='body2' sx={{ opacity: 0.7 }}>
            {game.reviews_count
              ? `${game.reviews_count} reviews`
              : 'No reviews'}
          </Typography>
        </Box>

        <Box>
          {!isInLibrary ? (
            <CustomButton
              variant='orange'
              onClick={handleAddOrRemove}
              sx={{
                marginTop: '12px',
                background: !isAdded
                  ? 'linear-gradient(190deg, #db7909, #5e3b13)'
                  : 'linear-gradient(190deg, #db2109, #572718)',
              }}
            >
              {isAdded ? 'Remove' : 'Add to My Library'}
            </CustomButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <CustomButton
                variant='orange'
                onClick={handleAddOrRemove}
                sx={{
                  marginTop: '12px',
                  background: 'linear-gradient(190deg, #db2109, #572718)',
                  minWidth: '100px',
                }}
              >
                Remove
              </CustomButton>
              {isPending ? (
                <CircularProgress color='secondary' />
              ) : (
                stores &&
                stores.length > 0 && (
                  <CustomButton
                    variant='orange'
                    onClick={handleStore}
                    sx={{
                      marginTop: '12px',
                      background: 'linear-gradient(190deg, #14c004, #264e1f)',
                      minWidth: '100px',
                    }}
                  >
                    Store
                  </CustomButton>
                )
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GameCard;
