import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';

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
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 68, color: '#FF6B6B', mb: 1 }} />

      <Typography
        variant='h1'
        sx={{ fontSize: '40px', marginBottom: '12px', fontWeight: 'bold' }}
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
