import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../common/CustomButton';

const NavLinks = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/games' },
    { label: 'My Library', path: '/library' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {links.map((link) =>
        location.pathname === link.path ? (
          <CustomButton
            key={link.path}
            onClick={() => handleClick(link.path)}
            sx={{ fontFamily: 'sans-serif' }}
          >
            {link.label}
          </CustomButton>
        ) : (
          <Typography
            key={link.path}
            onClick={() => handleClick(link.path)}
            sx={{
              fontFamily: 'sans-serif',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'hsla(0, 0%, 100%, 0.8)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 32px',
              '@media (max-width:1440px)': {
                padding: '8px 24px',
              },
              '@media (max-width:1280px)': {
                padding: '8px 12px',
              },
              '&:hover': { opacity: 1 },
            }}
          >
            {link.label}
          </Typography>
        )
      )}
    </Box>
  );
};

export default NavLinks;
