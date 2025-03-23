import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import GameHeader from '../components/game-details/GameHeader';
import MiddleContent from '../components/game-details/MiddleContent';
import AboutGame from '../components/game-details/AboutGame';
import { useGameDetails, useGameScreenshots } from '../hooks/games-hook';
import { parseRequirements, formatDate } from '../utils/helper-functions';
import gameDetailsBg from '../assets/images/game-details-bg.jpg';

const GameDetails = () => {
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

  const parsedMinimumReq = parseRequirements(rawMinimumReq);
  const parsedRecommendedReq = parseRequirements(rawRecommendedReq);

  const formattedDate = game?.released ? formatDate(game.released) : 'N/A';

  if (isPending) {
    return (
      <Box
        sx={(theme) => ({
          flex: 1,
          backgroundColor: theme.palette.background.default,
          color: 'white',
          padding: '16px',
          overflow: 'auto',
          minHeight: 'calc(100vh - 68px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <CircularProgress color='secondary' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={(theme) => ({
          flex: 1,
          backgroundColor: theme.palette.background.default,
          color: 'white',
          padding: '16px',
          overflow: 'auto',
          height: 'calc(100vh - 68px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
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
        color: 'white',
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
      <GameHeader
        game={game}
        isPending={isPending}
        formattedDate={formattedDate}
        fullStars={fullStars}
        hasHalfStar={hasHalfStar}
        emptyStars={emptyStars}
      />

      <MiddleContent
        game={game}
        isGenreModalOpen={isGenreModalOpen}
        setIsGenreModalOpen={setIsGenreModalOpen}
        isDeveloperModalOpen={isDeveloperModalOpen}
        setIsDeveloperModalOpen={setIsDeveloperModalOpen}
      />

      <AboutGame
        game={game}
        isRecommended={isRecommended}
        setIsRecommended={setIsRecommended}
        parsedMinimumReq={parsedMinimumReq}
        parsedRecommendedReq={parsedRecommendedReq}
        screenshots={screenshots}
        scPending={scPending}
      />
    </Box>
  );
};

export default GameDetails;
