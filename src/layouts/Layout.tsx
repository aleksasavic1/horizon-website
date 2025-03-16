import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/navigation/Navbar';

type LayoutProps = {
  children: ReactNode;
  profilePicture: string | null;
};

const Layout = ({ children, profilePicture }: LayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar profilePicture={profilePicture} />
      <Box
        sx={{
          paddingTop: '68px',
          '@media (max-width: 640px)': {
            paddingTop: '60px',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
