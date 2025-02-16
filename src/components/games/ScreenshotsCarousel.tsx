import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import placeholderImg from '../../assets/game-placeholder.png';

const ScreenshotsCarousel = ({ screenshots }: { screenshots: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevScreenshot = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const nextScreenshot = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid hsla(0, 0%, 100%, 0.12)',
      }}
    >
      <IconButton
        onClick={prevScreenshot}
        sx={{
          position: 'absolute',
          left: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <Box
        component='img'
        src={screenshots[currentIndex]?.image || placeholderImg}
        alt={`Screenshot ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <IconButton
        onClick={nextScreenshot}
        sx={{
          position: 'absolute',
          right: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </Box>
  );
};

export default ScreenshotsCarousel;
