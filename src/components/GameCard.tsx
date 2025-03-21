import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Skeleton } from '@mui/material';
import CustomButton from './common/CustomButton';
import { GameTypes, Genre, CarouselGameTypes } from '../types/game-types';
import gamePlaceholder from '../assets/game-placeholder.png';
import useLibraryStore from '../store/library-store';
import { useGameStores } from '../hooks/games-hook';
import { toast } from 'react-toastify';

type GameCardProps = {
  game: GameTypes | CarouselGameTypes;
  isInLibrary?: boolean;
  isCarousel?: boolean;
};

const GameCard = ({
  game,
  isInLibrary = false,
  isCarousel = false,
}: GameCardProps) => {
  const navigate = useNavigate();
  const { games, addGame, removeGame } = useLibraryStore();
  const isAdded = games.some((g) => g.id === game.id);
  const { data: stores, isPending } = useGameStores(game.id.toString());
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddOrRemove = (event: React.MouseEvent) => {
    event.stopPropagation();

    const formattedGame: GameTypes = {
      ...game,
      genres: game.genres ?? [],
      reviews_count: game.reviews_count ?? 0,
    };

    if (isAdded) {
      removeGame(formattedGame.id);
      toast.success(
        `${formattedGame.name} has been removed from your collection.`
      );
    } else {
      addGame(formattedGame);
      toast.success(`${formattedGame.name} has been added to your collection!`);
    }
  };

  const handleStore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(stores[0].url, '_blank');
  };

  const handleClick = (event: React.MouseEvent) => {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      event.preventDefault();
      window.open(`/games/${game.id}`, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/games/${game.id}`);
    }
  };

  return (
    <Box
      onClick={handleClick}
      onAuxClick={(e) => {
        if (e.button === 1) {
          window.open(`/games/${game.id}`, '_blank', 'noopener,noreferrer');
        }
      }}
      onMouseDown={(e) => e.button === 1 && e.preventDefault()}
      className='cursor-hover'
      sx={{
        width: '100%',
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          minHeight: '170px',
          maxHeight: '170px',
          overflow: 'hidden',

          '@media (max-width: 767px)': {
            minHeight: isCarousel ? '170px' : '300px',
            maxHeight: isCarousel ? '170px' : '300px',
          },

          '@media (max-width: 480px)': {
            minHeight: isCarousel ? '170px' : '200px',
            maxHeight: isCarousel ? '170px' : '200px',
          },
        }}
      >
        {!imageLoaded && (
          <Skeleton variant='rectangular' width='100%' height='100%' />
        )}
        <Box
          component='img'
          src={game.background_image || gamePlaceholder}
          alt={game.name}
          loading='lazy'
          onLoad={() => setImageLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '170px',
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
            {(game.genres?.length ?? 0) > 1 ? 'Genres: ' : 'Genre: '}
            {game.genres && game.genres.length > 0
              ? game.genres
                  .slice(0, 3)
                  .map((genre: Genre) => genre.name)
                  .join(', ') + (game.genres.length > 3 ? ', ...' : '')
              : 'N/A'}
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '100px',
                  }}
                >
                  <CircularProgress color='secondary' />
                </Box>
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
