/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import CustomTooltip from '../components/common/CustomTooltip';
import CustomButton from '../components/common/CustomButton';
import CustomModal from '../components/common/CustomModal';
import ShowMore from '../components/common/ShowMore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useGameDetails, useGameScreenshots } from '../hooks/games-hook';
import ScreenshotsCarousel from '../components/games/ScreenshotsCarousel';
import placeholderImg from '../assets/game-placeholder.png';
import websiteLogo from '../assets/website-logo.png';
import redditLogo from '../assets/reddit-logo.png';
import returnIcon from '../assets/return-icon.png';
import gameDetailsBg from '../assets/game-details-bg.jpg';

const GameDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: game, isPending, error } = useGameDetails(id || '');

  const { data: screenshots, isPending: scPending } = useGameScreenshots(
    id || ''
  );

  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState<boolean>(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] =
    useState<boolean>(false);

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
    : 'N/A';

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.0', '') + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'K+';
    }
    return num.toString();
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isPending) {
    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#121212',
          color: '#fff',
          padding: '16px',
          overflow: 'auto',
          minHeight: 'calc(100vh - 68px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color='secondary' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#121212',
          color: '#fff',
          padding: '16px',
          overflow: 'auto',
          height: 'calc(100vh - 68px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
          Failed to load game details. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        color: '#fff',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 68px)',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(${gameDetailsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 68px)',
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

        <Box
          component='img'
          className='cursor-hover'
          src={returnIcon}
          alt='Return Icon'
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            top: 15,
            left: 15,
            width: '40px',
            transition: '300ms ease',
            zIndex: 200,
            '&:hover': {
              transform: 'scale(1.1)',
            },
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
            mx: 2,

            '@media (max-width: 640px)': {
              fontSize: '2.3rem',
            },
          }}
        >
          {game?.name || ''}
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
              // display: 'flex',
              // flexDirection: 'column',
              left: 14,
            },
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
          margin: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',

          '@media (max-width: 640px)': {
            margin: '16px',
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          {game?.developers.slice(0, 2).map((developer: any, index: number) => (
            <Typography
              key={index}
              sx={{
                backgroundColor: theme.palette.blueBox.bg,
                border: `1px solid ${theme.palette.blueBox.border}`,
                padding: '4px 8px',
                borderRadius: '4px',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {developer?.name || ''}
            </Typography>
          ))}

          <CustomButton
            variant='outlined'
            onClick={() => setIsDeveloperModalOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignSelf: 'center',
              padding: '4px 8px',
            }}
          >
            See Developers
          </CustomButton>

          {game?.developers.length > 2 && (
            <CustomButton
              variant='outlined'
              onClick={() => setIsDeveloperModalOpen(true)}
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignSelf: 'center',
                padding: '4px 8px',
              }}
            >
              See More
            </CustomButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {game?.genres.length > 4 && (
            <CustomButton
              variant='outlined'
              onClick={() => setIsGenreModalOpen(true)}
              sx={{
                display: { xs: 'none', md: 'flex' },
                padding: '4px 8px',
              }}
            >
              See More
            </CustomButton>
          )}
          <CustomButton
            variant='outlined'
            onClick={() => setIsGenreModalOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignSelf: 'center',
              padding: '4px 8px',
            }}
          >
            See Genres
          </CustomButton>
          {game?.genres.slice(0, 4).map((genre: any, index: number) => {
            return (
              <Typography
                key={index}
                sx={{
                  backgroundColor: theme.palette.blueBox.bg,
                  border: `1px solid ${theme.palette.blueBox.border}`,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {genre?.name || ''}
              </Typography>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridAutoColumns: 'minmax(0, 1fr)',
          gap: '40px 0',
          margin: '20px 0 40px 0',

          '@media (max-width: 946px)': {
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          },
        }}
      >
        <Box
          sx={{
            padding: '0 30px',
            order: 1,

            '@media (max-width: 640px)': {
              padding: '0 16px',
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                margin: '4px 0',
                '@media (min-width: 1921px)': {
                  fontSize: '1.5rem',
                },
              }}
            >
              Available platforms:
            </Typography>
            <Typography
              sx={{
                '@media (min-width: 1921px)': {
                  fontSize: '18px',
                },
              }}
            >
              {game?.platforms
                ?.map((platform: any) => platform?.platform?.name)
                .filter(Boolean)
                .join(', ')}{' '}
            </Typography>
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Typography
              sx={{
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'baseline',
                '@media (min-width: 1921px)': {
                  fontSize: '18px',
                },
              }}
            >
              Youtube:{' '}
              {game?.youtube_count && parseInt(game.youtube_count) > 0
                ? `${formatNumber(parseInt(game.youtube_count))} views`
                : 'No views available'}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'baseline',
                '@media (min-width: 1921px)': {
                  fontSize: '18px',
                },
              }}
            >
              Twitch:{' '}
              {game?.twitch_count && parseInt(game.twitch_count) > 0
                ? `${formatNumber(parseInt(game.twitch_count))} views`
                : 'No views available'}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'baseline',
                '@media (min-width: 1921px)': {
                  fontSize: '18px',
                },
              }}
            >
              Reddit:{' '}
              {game?.reddit_count && parseInt(game.reddit_count) > 0
                ? `${formatNumber(parseInt(game.reddit_count))} posts`
                : 'No posts available'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: '0 30px',
            order: 2,

            '@media (max-width: 640px)': {
              padding: '0 16px',
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              margin: '4px 0',

              '@media (min-width: 1921px)': {
                fontSize: '1.5rem',
              },
            }}
          >
            Overview:
          </Typography>

          <ShowMore text={game?.description_raw || 'No description'} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 30px',
            order: 3,

            '@media (max-width: 946px)': {
              order: 4,
            },

            '@media (max-width: 640px)': {
              padding: '0 16px',
            },
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
                  : theme.palette.orangeBox.bg,
                borderColor: isRecommended
                  ? 'hsla(0, 0%, 100%, 0.4)'
                  : theme.palette.orangeBox.border,

                '@media (min-width: 1921px)': {
                  fontSize: '16px',
                },
              }}
            >
              Minimum
            </CustomButton>
            <CustomButton
              variant='outlined'
              onClick={() => setIsRecommended(true)}
              sx={{
                backgroundColor: isRecommended
                  ? theme.palette.orangeBox.bg
                  : 'transparent',
                borderColor: isRecommended
                  ? theme.palette.orangeBox.border
                  : 'hsla(0, 0%, 100%, 0.4)',
                '@media (min-width: 1921px)': {
                  fontSize: '16px',
                },
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
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                marginBottom: '8px',
                lineHeight: 1.3,
                fontSize: '18px',
                '@media (min-width: 1921px)': {
                  fontSize: '22px',
                },
              }}
            >
              {!isRecommended
                ? 'Minimum Requirements:'
                : 'Recommended Requirements:'}
            </Typography>

            {!isRecommended ? (
              parsedMinimumReq.length > 0 ? (
                parsedMinimumReq.slice(0, 5).map((line: any, index: number) => {
                  const [key, ...value] = line.split(':');
                  return (
                    <Typography
                      key={index}
                      sx={{
                        opacity: 0.9,
                        lineHeight: '1.65',
                        fontSize: '14px',
                        '@media (min-width: 1921px)': {
                          fontSize: '16px',
                        },
                      }}
                    >
                      <strong>{key.trim()}:</strong> {value.join(':').trim()}
                    </Typography>
                  );
                })
              ) : (
                <Typography
                  sx={{
                    opacity: 0.9,
                    lineHeight: '1.65',
                    fontSize: '14px',
                    '@media (min-width: 1921px)': {
                      fontSize: '16px',
                    },
                  }}
                >
                  No minimum requirements available.
                </Typography>
              )
            ) : parsedRecommendedReq.length > 0 ? (
              parsedRecommendedReq
                .slice(0, 5)
                .map((line: any, index: number) => {
                  const [key, ...value] = line.split(':');
                  return (
                    <Typography
                      key={index}
                      sx={{
                        opacity: 0.9,
                        lineHeight: '1.65',
                        fontSize: '14px',
                        '@media (min-width: 1921px)': {
                          fontSize: '16px',
                        },
                      }}
                    >
                      <strong>{key.trim()}:</strong> {value.join(':').trim()}
                    </Typography>
                  );
                })
            ) : (
              <Typography
                sx={{
                  opacity: 0.9,
                  lineHeight: '1.65',
                  fontSize: '14px',
                  '@media (min-width: 1921px)': {
                    fontSize: '16px',
                  },
                }}
              >
                No recommended requirements available.
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            padding: '0 30px',
            position: 'relative',
            order: 4,

            '@media (max-width: 946px)': {
              order: 3,
            },

            '@media (max-width: 640px)': {
              padding: '0 16px',
            },
          }}
        >
          {scPending ? (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='360px'
              sx={{ borderRadius: '8px', bgcolor: 'grey.800' }}
            />
          ) : screenshots && screenshots.length > 0 ? (
            <ScreenshotsCarousel screenshots={screenshots} />
          ) : (
            <Box
              component='img'
              src={game?.background_image_additional || placeholderImg}
              alt={game?.name || ''}
              loading='lazy'
              sx={{
                width: '100%',
                height: '360px',
                objectFit: 'cover',
                border: '1px solid hsla(0, 0%, 100%, 0.12)',
              }}
            />
          )}

          <Box
            component='img'
            src={redditLogo}
            alt='Reddit Logo'
            className='cursor-hover'
            onClick={() => openLink(game?.reddit_url || '')}
            sx={{
              margin: '0 30px',
              position: 'absolute',
              bottom: 15,
              left: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              transition: '300ms ease',
              filter: 'drop-shadow(2px 2px 2px black) brightness(84%)',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <Box
            component='img'
            src={websiteLogo}
            alt='Website Logo'
            className='cursor-hover'
            onClick={() => openLink(game?.website || '')}
            sx={{
              margin: '0 30px',
              position: 'absolute',
              bottom: 15,
              left: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              transition: '300ms ease',
              filter: 'drop-shadow(2px 2px 2px black) brightness(84%)',
              '&:hover': {
                transform: 'scale(1.08)',
              },
            }}
          />
        </Box>
      </Box>
      <CustomModal
        open={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Typography sx={{ textAlign: 'center', fontSize: '1.5rem', my: 2 }}>
            All Developers
          </Typography>
          <Box sx={{ overflowY: 'auto' }}>
            {game?.developers.map((developer: any, index: number) => (
              <Typography
                key={index}
                sx={{
                  backgroundColor: theme.palette.blueBox.bg,
                  padding: '12px 16px',
                  borderRadius: '4px',
                  my: 1,
                  border: `1px solid ${theme.palette.blueBox.border}`,
                }}
              >
                {developer?.name || ''}
              </Typography>
            ))}
          </Box>
        </Box>
      </CustomModal>

      <CustomModal
        open={isGenreModalOpen}
        onClose={() => setIsGenreModalOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Typography sx={{ textAlign: 'center', fontSize: '1.5rem', my: 2 }}>
            All Genres
          </Typography>
          <Box sx={{ overflowY: 'auto' }}>
            {game?.genres.map((genre: any, index: number) => {
              return (
                <Typography
                  key={index}
                  sx={{
                    backgroundColor: theme.palette.blueBox.bg,
                    padding: '12px 16px',
                    borderRadius: '4px',
                    my: 1,
                    border: `1px solid ${theme.palette.blueBox.border}`,
                  }}
                >
                  {genre?.name || ''}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default GameDetails;
