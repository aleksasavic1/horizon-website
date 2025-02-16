import CustomAccordion from '../components/common/CustomAccordion';
import { Container, Typography } from '@mui/material';
import { FAQ_DATA } from '../constants/faq-data';

const FAQ: React.FC = () => {
  return (
    <Container
      maxWidth='md'
      sx={{
        color: '#fff',
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <Typography
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '16px 0',
        }}
      >
        Frequently Asked Questions
      </Typography>
      <CustomAccordion items={FAQ_DATA} />
    </Container>
  );
};

export default FAQ;
