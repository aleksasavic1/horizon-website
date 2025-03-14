import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NavLinks from './NavLinks';
import CustomButton from '../common/CustomButton';
import useAuthStore from '../../store/auth-store';
import profilePlaceholder from '../../assets/profile-placeholder.jpg';

const ListItemStyles = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  textAlign: 'center',
};

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { profilePicture } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 48px',
        backgroundColor: isScrolled ? 'rgba(18, 18, 18, 0.8)' : '#121212',
        color: '#fff',
        boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',

        '@media (max-width:1439px)': {
          padding: '16px 25px',
        },
        '@media (max-width: 640px)': {
          height: '60px',
        },
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

            '@media (max-width: 640px)': {
              fontSize: '20px',
            },
          }}
        >
          Horizon
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          '@media (max-width: 946px)': {
            display: 'none',
          },
        }}
      >
        <NavLinks />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          '@media (max-width: 946px)': {
            display: 'none',
          },
        }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <CustomButton
              variant='outlined'
              sx={{ padding: '6px 16px' }}
              onClick={handleLogout}
            >
              Logout
            </CustomButton>
            <Box
              component='img'
              src={profilePicture || profilePlaceholder}
              alt='profile picture'
              onClick={() => navigate('/my-profile')}
              sx={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: '0.3s ease-in-out',
                filter: 'brightness(0.9)',

                '&:hover': {
                  filter: 'brightness(1)',
                },
              }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'none',
          justifyContent: 'flex-end',
          '@media (max-width: 946px)': {
            display: 'flex',
          },
        }}
      >
        <IconButton onClick={() => setOpen(true)} sx={{ color: '#fff' }}>
          <MenuIcon sx={{ fontSize: '28px', transform: 'scaleY(1.2)' }} />
        </IconButton>
      </Box>

      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: '40vw',
            backgroundColor: '#1e1e1e',
            minHeight: '100vh',
            padding: '16px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',

            '@media (max-width: 814px)': {
              width: '50vw',
            },

            '@media (max-width: 640px)': {
              width: '100vw',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/my-profile');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='My Profile' />
            </ListItem>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/games');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='Games' />
            </ListItem>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/library');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='Library' />
            </ListItem>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/faq');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='FAQ' />
            </ListItem>
            <ListItem
              component='div'
              onClick={() => {
                navigate('/contact');
                setOpen(false);
              }}
              sx={ListItemStyles}
            >
              <ListItemText primary='Contact Us' />
            </ListItem>
          </List>

          <Box
            sx={{
              textAlign: 'center',
              mt: 'auto',
              mb: '12px',
            }}
          >
            {!isAuthenticated ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CustomButton
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                    '@media (max-width: 640px)': {
                      width: '240px',
                    },
                  }}
                  onClick={() => {
                    navigate('/login');
                    setOpen(false);
                  }}
                >
                  Sign In
                </CustomButton>
                <CustomButton
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '@media (max-width: 640px)': {
                      width: '240px',
                    },
                  }}
                  onClick={() => {
                    navigate('/register');
                    setOpen(false);
                  }}
                >
                  Sign Up
                </CustomButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CustomButton
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '@media (max-width: 640px)': {
                      width: '240px',
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </CustomButton>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
