import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import { GameTypes } from '../../types/game-types';

type MiddleContentProps = {
  game: GameTypes;
  isGenreModalOpen: boolean;
  setIsGenreModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeveloperModalOpen: boolean;
  setIsDeveloperModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MiddleContent = ({
  game,
  isGenreModalOpen,
  setIsGenreModalOpen,
  isDeveloperModalOpen,
  setIsDeveloperModalOpen,
}: MiddleContentProps) => {
  const theme = useTheme();

  return (
    <>
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
          {game?.developers
            .slice(0, 2)
            .map((developer: { name: string }, index: number) => (
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
          {game?.genres
            .slice(0, 4)
            .map((genre: { name: string }, index: number) => {
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
            {game?.developers.map(
              (developer: { name: string }, index: number) => (
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
              )
            )}
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
            {game?.genres.map((genre: { name: string }, index: number) => {
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
    </>
  );
};

export default MiddleContent;
