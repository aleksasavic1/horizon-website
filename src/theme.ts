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
    gray: {
      lightGray: string;
      dimGray: string;
      jetGray: string;
      darkGray: string;
      snowGray: string;
      mediumGray: string;
      softGray: string;
    };
    black: {
      eerieBlack: string;
      darkCharcoal: string;
      charcoal: string;
      jetBlack: string;
    };
    green: {
      mintGreen: string;
    };
    red: {
      default: string;
      coralRed: string;
    };
    yellow: {
      gold: string;
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
    gray?: {
      lightGray: string;
      dimGray: string;
      jetGray: string;
      darkGray: string;
      snowGray: string;
      mediumGray: string;
      softGray: string;
    };
    black?: {
      eerieBlack: string;
      darkCharcoal: string;
      charcoal: string;
      jetBlack: string;
    };
    green?: {
      mintGreen: string;
    };
    red?: {
      default: string;
      coralRed: string;
    };
    yellow?: {
      gold: string;
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
    gray: {
      lightGray: '#ccc',
      dimGray: '#666',
      jetGray: '#1c1c1c',
      darkGray: '#3a3a3a',
      snowGray: '#f1f1f1',
      mediumGray: '#696969',
      softGray: '#d3d3d3',
    },
    black: {
      eerieBlack: '#181818',
      darkCharcoal: '#252525',
      charcoal: '#2c2c2c',
      jetBlack: '#1e1e1e',
    },
    green: {
      mintGreen: '#53b896',
    },
    red: {
      default: '#FF0000',
      coralRed: '#FF6B6B',
    },
    yellow: {
      gold: '#FFD700',
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
