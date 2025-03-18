import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CustomAccordionProps {
  items: { title: string; content: string | React.ReactNode }[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#fff',
        boxShadow: '0 0 12px hsla(0, 0%, 0%, 0.4)',
        borderRadius: '8px',
      }}
    >
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          sx={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: '0',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component='div'>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CustomAccordion;
