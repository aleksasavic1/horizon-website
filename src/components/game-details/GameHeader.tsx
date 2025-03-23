import { Box, Typography, Stack, Skeleton } from '@mui/material';
import CustomTooltip from '../common/CustomTooltip';
import ReturnBack from '../common/ReturnBack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { GameTypes } from '../../types/game-types';
import placeholderImg from '../../assets/images/game-placeholder.png';

type GameHeaderProps = {
  game: GameTypes;
  isPending: boolean;
  formattedDate: string;
  fullStars: number;
  hasHalfStar: boolean;
  emptyStars: number;
};

const GameHeader = ({
  game,
  isPending,
  formattedDate,
  fullStars,
  hasHalfStar,
  emptyStars,
}: GameHeaderProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isPending ? (
        <Skeleton
          variant='rectangular'
          width='100%'
          height='400px'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            bgcolor: 'grey.800',
          }}
        />
      ) : (
        <Box
          component='img'
          src={game?.background_image || placeholderImg}
          alt={game?.name || ''}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 20%',
            position: 'absolute',
            borderBottom: '1px solid hsla(0, 0%, 100%, 0.33)',
            top: 0,
            left: 0,
            zIndex: 2,
            maskImage:
              'linear-gradient(to right, transparent, white 30%, white 40%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, white 30%, white 40%, transparent)',
          }}
        />
      )}

      <ReturnBack />

      <Typography
        variant='h3'
        sx={{
          position: 'relative',
          zIndex: 3,
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
          textAlign: 'center',
          mx: 2,

          '@media (max-width: 640px)': {
            fontSize: '2.3rem',
          },
        }}
      >
        {isPending ? (
          <Skeleton variant='text' width={220} height={45} />
        ) : (
          game?.name || ''
        )}
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          bottom: 7,
          right: 28,
          zIndex: 3,
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
          textAlign: 'center',

          '@media (max-width: 640px)': {
            right: 14,
          },
          '@media (max-width: 400px)': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          component='span'
          sx={{
            '@media (max-width: 400px)': {
              marginBottom: '-4px',
            },
          }}
        >
          Released:{' '}
        </Box>
        {formattedDate}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 28,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',

          '@media (max-width: 640px)': {
            left: 14,
          },
        }}
      >
        <CustomTooltip title={`Rating: ${game?.rating || 'N/A'}`}>
          <Stack direction='row' spacing={0.25}>
            {[...Array(fullStars)].map((_, index) => (
              <StarIcon
                key={`full-${index}`}
                sx={(theme) => ({ color: theme.palette.yellow.gold })}
              />
            ))}

            {hasHalfStar && (
              <StarHalfIcon
                key='half'
                sx={(theme) => ({ color: theme.palette.yellow.gold })}
              />
            )}

            {[...Array(emptyStars)].map((_, index) => (
              <StarBorderIcon
                key={`empty-${index}`}
                sx={(theme) => ({ color: theme.palette.yellow.gold })}
              />
            ))}
          </Stack>
        </CustomTooltip>
      </Box>
    </Box>
  );
};

export default GameHeader;
