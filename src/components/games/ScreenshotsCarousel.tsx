import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Screenshot } from '../../types/game-types';
import placeholderImg from '../../assets/game-placeholder.png';

const ScreenshotsCarousel = ({
  screenshots,
}: {
  screenshots: Screenshot[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevScreenshot = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const nextScreenshot = () => {
    setDirection(1);
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
        overflow: 'hidden',

        '@media (min-width: 2048px)': {
          height: '440px',
        },
        '@media (min-width: 2560px)': {
          height: '520px',
        },
      }}
    >
      <IconButton
        onClick={prevScreenshot}
        sx={{
          position: 'absolute',
          left: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode='wait'>
          <motion.img
            key={screenshots[currentIndex]?.image || placeholderImg}
            src={screenshots[currentIndex]?.image || placeholderImg}
            alt={`Screenshot ${currentIndex + 1}`}
            initial={{
              x: direction,
              opacity: 0,
              filter: 'blur(8px)',
            }}
            animate={{
              x: 0,
              opacity: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              x: -direction,
              opacity: 0,
              filter: 'blur(6px)',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </AnimatePresence>
      </Box>

      <IconButton
        onClick={nextScreenshot}
        sx={{
          position: 'absolute',
          right: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </Box>
  );
};

export default ScreenshotsCarousel;
