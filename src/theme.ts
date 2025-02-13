import '@fontsource/orbitron/index.css';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#121212',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
  },
});

export default theme;
