import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/navigation/Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ paddingTop: '68px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
