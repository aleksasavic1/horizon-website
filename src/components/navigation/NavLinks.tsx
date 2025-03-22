import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {links.map((link) => {
        const isActive =
          location.pathname === link.path ||
          (link.path === '/games' &&
            matchPath('/games/:id', location.pathname));

        return isActive ? (
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
            className='cursor-hover'
            sx={{
              fontFamily: 'sans-serif',
              fontSize: '15px',
              color: 'hsla(0, 0%, 100%, 0.8)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 32px',
              userSelect: 'none',
              '@media (max-width:1439px)': {
                padding: '8px 24px',
              },
              '@media (max-width:1279px)': {
                padding: '8px 16px',
              },
              '&:hover': { opacity: 1 },
              '@media (min-width: 1921px)': {
                fontSize: '18px',
              },
            }}
          >
            {link.label}
          </Typography>
        );
      })}
    </Box>
  );
};

export default NavLinks;
