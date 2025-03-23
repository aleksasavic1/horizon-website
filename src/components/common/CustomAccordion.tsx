import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CustomAccordionProps = {
  items: { title: string; content: string | React.ReactNode }[];
};

const CustomAccordion: React.FC<CustomAccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        color: 'white',
        boxShadow: '0 0 12px hsla(0, 0%, 0%, 0.4)',
        borderRadius: '8px',
      })}
    >
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          sx={(theme) => ({
            backgroundColor: theme.palette.black.jetBlack,
            color: 'white',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: '0',
            },
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component='div'>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CustomAccordion;
