import { useState } from 'react';
import { Typography, Box } from '@mui/material';

const MAX_LENGTH = 600;

const ShowMore = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '14px',
          '@media (min-width: 1921px)': {
            fontSize: '16px',
          },
        }}
      >
        {isExpanded ? text : `${text.substring(0, MAX_LENGTH)}...`}
      </Typography>

      {text.length > MAX_LENGTH && (
        <Typography
          className='cursor-hover'
          onClick={toggleExpanded}
          sx={{
            color: 'darkorange',
            fontSize: '14px',
            display: 'inline-block',
            marginTop: '4px',
            textDecoration: 'underline',
            '@media (min-width: 1921px)': {
              fontSize: '16px',
            },
          }}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Typography>
      )}
    </Box>
  );
};

export default ShowMore;
