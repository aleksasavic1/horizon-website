import '@fontsource/chakra-petch/index.css';
import '@fontsource/orbitron/index.css';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    blueBox: {
      border: string;
      bg: string;
    };
    orangeBox: {
      border: string;
      bg: string;
    };
  }
  interface PaletteOptions {
    blueBox?: {
      border: string;
      bg: string;
    };
    orangeBox?: {
      border: string;
      bg: string;
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#121212',
    },
    text: {
      primary: '#fff',
    },
    blueBox: {
      border: 'hsl(175, 64%, 27%)',
      bg: 'hsla(175, 64%, 27%, 0.2)',
    },
    orangeBox: {
      border: 'hsl(33, 100%, 30%)',
      bg: 'hsla(33, 100%, 50%, 0.12)',
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
