import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import NavLinks from './NavLinks';
import CustomButton from '../common/CustomButton';
import useAuthStore from '../../store/auth-store';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  console.log(isAuthenticated);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 48px',
        '@media (max-width:1440px)': {
          padding: '16px 25px',
        },
        color: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Typography
          onClick={() => navigate('/')}
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'hsla(0, 0%, 100%, 0.8)',
            cursor: 'pointer',
            transition: '400ms ease',
            '&:hover': {
              color: 'hsla(0, 0%, 100%, 0.9)',
            },
          }}
        >
          Horizon
        </Typography>
      </Box>

      <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <NavLinks />
      </Box>

      <Box
        sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
      >
        {!isAuthenticated ? (
          <>
            <CustomButton
              sx={{
                padding: '6px 20px',
                fontSize: '13px',
                fontFamily: 'Orbitron, sans-serif',
              }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </CustomButton>
            <CustomButton
              variant='outlined'
              sx={{
                padding: '6px 16px',
                fontSize: '13px',
                fontFamily: 'Orbitron, sans-serif',
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </CustomButton>
          </>
        ) : (
          <CustomButton
            variant='outlined'
            sx={{ padding: '6px 16px' }}
            onClick={handleLogout}
          >
            Logout
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
