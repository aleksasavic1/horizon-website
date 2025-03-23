import { styled } from '@mui/system';
import { Switch, SwitchProps, Box, Typography } from '@mui/material';

interface CustomSwitchProps extends SwitchProps {
  leftLabel?: string;
  rightLabel?: string;
}

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch disableRipple focusVisibleClassName='.Mui-focusVisible' {...props} />
))(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',

  '& .MuiSwitch-switchBase': {
    padding: 2,
    transition: 'all 0.3s ease',

    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: theme.palette.gray.snowGray,

      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.gray.mediumGray,
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.gray.softGray,
    transition: 'all 0.3s ease',
  },

  '& .MuiSwitch-track': {
    borderRadius: 13,
    backgroundColor: theme.palette.gray.mediumGray,
    opacity: 1,
    transition: 'all 0.3s ease',
  },

  '& .Mui-checked .MuiSwitch-thumb': {
    backgroundColor: theme.palette.gray.softGray,
  },
}));

const CustomSwitch = ({
  leftLabel,
  rightLabel,
  ...props
}: CustomSwitchProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {leftLabel && (
        <Typography
          sx={{
            fontSize: '14px',
            color: 'white',
            '@media (min-width: 1921px)': {
              fontSize: '15px',
            },
          }}
        >
          {leftLabel}
        </Typography>
      )}

      <StyledSwitch {...props} />

      {rightLabel && (
        <Typography
          sx={{
            fontSize: '14px',
            color: 'white',
            '@media (min-width: 1921px)': {
              fontSize: '15px',
            },
          }}
        >
          {rightLabel}
        </Typography>
      )}
    </Box>
  );
};

export default CustomSwitch;
