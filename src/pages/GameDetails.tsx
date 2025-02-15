import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import CustomTooltip from '../components/common/CustomTooltip';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import placeholderImg from '../assets/game-placeholder.png';
import { useGameDetails } from '../hooks/games-hook';
import CustomButton from '../components/common/CustomButton';

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isPending, error } = useGameDetails(id || '');
  console.log('Game details: ', game);

  const [isRecommended, setIsRecommended] = useState<boolean>(false);

  const rating = game?.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const rawMinimumReq = game?.platforms?.[0]?.requirements?.minimum || '';
  const rawRecommendedReq =
    game?.platforms?.[0]?.requirements?.recommended || '';

  const cleanedMinimumReq = rawMinimumReq.replace(/^Minimum:/, '').trim();
  const cleanedRecommendedReq = rawRecommendedReq
    .replace(/^Recommended:/, '')
    .trim();

  const parsedMinimumReq = cleanedMinimumReq
    .split(/(?=[A-Z][a-z]+:)/)
    .map((line: any) => line.trim())
    .filter((line: any) => line.includes(':'));
  const parsedRecommendedReq = cleanedRecommendedReq
    .split(/(?=[A-Z][a-z]+:)/)
    .map((line: any) => line.trim())
    .filter((line: any) => line.includes(':'));

  const formattedDate = game?.released
    ? new Date(game.released).toLocaleDateString('en-GB')
    : 'No release date';

  //   TODO: fix loading
  if (isPending) {
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
      <CircularProgress color='secondary' />
    </Box>;
  }

  if (error) {
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
      <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
        Failed to load game details. Please try again.
      </Typography>
    </Box>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: '#121212',
        color: '#fff',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 68px)',
      }}
    >
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
        <Box
          component='img'
          src={game?.background_image || placeholderImg}
          alt={game?.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 20%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            maskImage:
              'linear-gradient(to right, transparent, white 30%, white 40%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, white 30%, white 40%, transparent)',
          }}
        />

        <Typography
          variant='h3'
          sx={{
            position: 'relative',
            zIndex: 3,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
            textAlign: 'center',
          }}
        >
          {game?.name}
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
          }}
        >
          Released: {formattedDate}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 28,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CustomTooltip title={`Rating: ${game?.rating || 'N/A'}`}>
            <Stack direction='row' spacing={0.25}>
              {[...Array(fullStars)].map((_, index) => (
                <StarIcon key={`full-${index}`} sx={{ color: '#FFD700' }} />
              ))}

              {hasHalfStar && (
                <StarHalfIcon key='half' sx={{ color: '#FFD700' }} />
              )}

              {[...Array(emptyStars)].map((_, index) => (
                <StarBorderIcon
                  key={`empty-${index}`}
                  sx={{ color: '#FFD700' }}
                />
              ))}
            </Stack>
          </CustomTooltip>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px',
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <CustomButton
              variant='outlined'
              onClick={() => setIsRecommended(false)}
              sx={{
                backgroundColor: isRecommended
                  ? 'transparent'
                  : 'hsla(25, 100%, 40%, 0.2)',
                borderColor: isRecommended
                  ? 'hsla(0, 0%, 100%, 0.4)'
                  : 'hsla(25, 100%, 40%, 0.8)',
              }}
            >
              Minimum
            </CustomButton>
            <CustomButton
              variant='outlined'
              onClick={() => setIsRecommended(true)}
              sx={{
                backgroundColor: isRecommended
                  ? 'hsla(25, 100%, 40%, 0.2)'
                  : 'transparent',
                borderColor: isRecommended
                  ? 'hsla(25, 100%, 40%, 0.8)'
                  : 'hsla(0, 0%, 100%, 0.4)',
              }}
            >
              Recommended
            </CustomButton>
          </Box>
          <Box
            sx={{
              backgroundColor: '#1e1e1e',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              width: '680px',
            }}
          >
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', marginBottom: '8px' }}
            >
              {!isRecommended
                ? 'Minimum Requirements:'
                : 'Recommended Requirements:'}
            </Typography>

            {!isRecommended
              ? parsedMinimumReq.slice(0, 5).map((line: any, index: number) => {
                  const [key, ...value] = line.split(':');
                  return (
                    <Typography
                      key={index}
                      sx={{ opacity: 0.9, lineHeight: '1.65' }}
                    >
                      <strong>{key.trim()}:</strong> {value.join(':').trim()}
                    </Typography>
                  );
                })
              : parsedRecommendedReq
                  .slice(0, 5)
                  .map((line: any, index: number) => {
                    const [key, ...value] = line.split(':');
                    return (
                      <Typography
                        key={index}
                        sx={{ opacity: 0.9, lineHeight: '1.65' }}
                      >
                        <strong>{key.trim()}:</strong> {value.join(':').trim()}
                      </Typography>
                    );
                  })}
          </Box>
        </Box>
        <Box sx={{ width: '50%', padding: '0 30px' }}>
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              margin: '8px 0',
            }}
          >
            Overview:
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {game?.description_raw || 'No description'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GameDetails;
