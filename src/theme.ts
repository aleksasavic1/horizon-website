import '@fontsource/chakra-petch/index.css';
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
    fontFamily: 'Chakra Petch, sans-serif',
    orbitron: {
      fontFamily: 'Orbitron, sans-serif',
    },
  },
});

export default theme;
