import CustomAccordion from '../components/common/CustomAccordion';
import { Container, Typography } from '@mui/material';
import { FAQ_DATA } from '../constants/faq-data';

const FAQ: React.FC = () => {
  return (
    <Container
      maxWidth='md'
      sx={{
        color: '#fff',
        backgroundColor: 'transparent',
        padding: '20px',
        borderRadius: '8px',

        '@media (max-width: 640px)': {
          padding: '10px',
        },

        '@media (max-width: 480px)': {
          padding: '4px',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '16px',
          lineHeight: 1.4,
          '@media (max-width: 768px)': {
            fontSize: '2rem',
          },
          '@media (max-width: 640px)': {
            fontSize: '1.7rem',
            margin: '16px 16px 8px 16px',
          },
        }}
      >
        Frequently Asked Questions
      </Typography>
      <CustomAccordion items={FAQ_DATA} />
    </Container>
  );
};

export default FAQ;
