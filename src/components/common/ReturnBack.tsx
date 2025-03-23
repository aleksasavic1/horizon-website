import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import returnIcon from '../../assets/icons/return-icon.png';

const ReturnBack = () => {
  const navigate = useNavigate();

  return (
    <Box
      component='img'
      className='cursor-hover'
      src={returnIcon}
      alt='Return Icon'
      onClick={() => navigate(-1)}
      sx={{
        position: 'absolute',
        top: 15,
        left: 15,
        width: '40px',
        transition: '300ms ease',
        zIndex: 200,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    />
  );
};

export default ReturnBack;
