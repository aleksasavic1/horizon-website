import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/navigation/Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
