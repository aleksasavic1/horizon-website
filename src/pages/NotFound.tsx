import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';
import notFoundBg from '../assets/not-found-bg.jpg';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 68px)',
        justifyContent: 'center',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${notFoundBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        pb: '68px',
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 68,
          color: '#FF6B6B',
          mb: 1,

          '@media (max-width: 640px)': {
            fontSize: 58,
          },
        }}
      />

      <Typography
        variant='h1'
        sx={{
          fontSize: '40px',
          marginBottom: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
          mx: 2,

          '@media (max-width: 640px)': {
            fontSize: '30px',
          },
        }}
      >
        404 - Page Not Found
      </Typography>

      <Typography
        variant='body1'
        sx={{
          fontSize: '16px',
          color: 'hsla(0, 0%, 100%, 0.7)',
          mb: 3,
          textAlign: 'center',
          maxWidth: '400px',
          mx: 2,

          '@media (max-width: 640px)': {
            fontSize: '14px',
            mb: 2,
          },
        }}
      >
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </Typography>

      <CustomButton variant='contained' onClick={() => navigate('/')}>
        Go to Homepage
      </CustomButton>
    </Box>
  );
};

export default NotFound;
