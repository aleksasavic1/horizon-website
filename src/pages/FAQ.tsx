import { Box, Container, Typography } from '@mui/material';
import CustomAccordion from '../components/common/CustomAccordion';
import { FAQ_DATA } from '../constants/faq-data';
import godOfWarImg from '../assets/images/god-of-war-bg.jpg';

const FAQ = () => {
  return (
    <Box
      sx={{
        p: 3,
        color: 'white',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${godOfWarImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 68px)',

        '@media (max-width: 768px)': {
          p: 2,
        },
      }}
    >
      <Container
        maxWidth='md'
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          p: 0,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '2.3rem',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '16px auto 32px',
            padding: '0 10px',
            lineHeight: 1.4,

            '@media (max-width: 768px)': {
              fontSize: '2rem',
            },
            '@media (min-width: 1921px)': {
              fontSize: '2.4rem',
            },
          }}
        >
          Frequently Asked Questions
        </Typography>
        <CustomAccordion items={FAQ_DATA} />
      </Container>
    </Box>
  );
};

export default FAQ;
