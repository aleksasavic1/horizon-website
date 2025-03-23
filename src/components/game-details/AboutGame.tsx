import { Box, Typography, Skeleton } from '@mui/material';
import CustomButton from '../common/CustomButton';
import ScreenshotsCarousel from '../games/ScreenshotsCarousel';
import ShowMore from '../common/ShowMore';
import { formatNumber, openLink } from '../../utils/helper-functions';
import { PlatformInfo, GameTypes } from '../../types/game-types';
import websiteLogo from '../../assets/images/website-logo.png';
import redditLogo from '../../assets/images/reddit-logo.png';
import placeholderImg from '../../assets/images/game-placeholder.png';

type AboutGameProps = {
  game: GameTypes;
  isRecommended: boolean;
  setIsRecommended: React.Dispatch<React.SetStateAction<boolean>>;
  parsedMinimumReq: string[];
  parsedRecommendedReq: string[];
  screenshots: { id: string; image: string }[];
  scPending: boolean;
};

const AboutGame = ({
  game,
  isRecommended,
  setIsRecommended,
  parsedMinimumReq,
  parsedRecommendedReq,
  screenshots,
  scPending,
}: AboutGameProps) => {
  return (
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
              ?.map((platform: PlatformInfo) => platform?.platform?.name)
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

        {!game?.description_raw ? (
          <Skeleton
            variant='rectangular'
            height={120}
            width='100%'
            sx={{ borderRadius: '6px', mt: 1 }}
          />
        ) : (
          <ShowMore text={game.description_raw} />
        )}
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
            sx={(theme) => ({
              backgroundColor: isRecommended
                ? 'transparent'
                : theme.palette.orangeBox.bg,
              borderColor: isRecommended
                ? 'hsla(0, 0%, 100%, 0.4)'
                : theme.palette.orangeBox.border,

              '@media (min-width: 1921px)': {
                fontSize: '16px',
              },
            })}
          >
            Minimum
          </CustomButton>
          <CustomButton
            variant='outlined'
            onClick={() => setIsRecommended(true)}
            sx={(theme) => ({
              backgroundColor: isRecommended
                ? theme.palette.orangeBox.bg
                : 'transparent',
              borderColor: isRecommended
                ? theme.palette.orangeBox.border
                : 'hsla(0, 0%, 100%, 0.4)',
              '@media (min-width: 1921px)': {
                fontSize: '16px',
              },
            })}
          >
            Recommended
          </CustomButton>
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.black.jetBlack,
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            width: '100%',
          })}
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
              parsedMinimumReq
                .slice(0, 5)
                .map((line: string, index: number) => {
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
              .map((line: string, index: number) => {
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
            bottom: 12,
            left: 15,
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

            '@media (max-width: 640px)': {
              left: 0,
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
            bottom: 12,
            left: 60,
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
            '@media (max-width: 640px)': {
              left: 44,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutGame;
