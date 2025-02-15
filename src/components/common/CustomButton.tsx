import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { ReactNode } from 'react';

const GradientButton = styled(Button)({
  background: 'linear-gradient(190deg, #293763, #4d5d8a)',
  padding: '6px 30px',
  color: '#fff',
  textTransform: 'none',
  fontSize: '14px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  border: 'none',

  '&:hover': {
    boxShadow: '0 0 3px hsla(0, 0%, 100%, 0.2)',
  },

  '&:disabled': {
    background: '#ccc',
    color: '#666',
    boxShadow: 'none',
    transform: 'none',
  },
});

const OutlineButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  padding: '6px 12px',
  color: 'hsla(0, 0%, 100%, 0.9)',
  textTransform: 'none',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid hsla(0, 0%, 100%, 0.4)',
  transition: 'all 0.3s ease',

  '&:hover': {
    boxShadow: '0 0 3px hsla(0, 0%, 100%, 0.2)',
  },

  '&:disabled': {
    color: '#666',
    borderColor: '#ccc',
    background: 'transparent',
  },
});

const OrangeButton = styled(Button)({
  background: 'linear-gradient(190deg, #db7909, #5e3b13)',
  padding: '6px 30px',
  color: '#fff',
  textTransform: 'none',
  fontSize: '14px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  border: 'none',
  minWidth: '180px',

  '&:hover': {
    boxShadow: '0 0 3px hsla(0, 0%, 100%, 0.2)',
  },

  '&:disabled': {
    background: 'linear-gradient(190deg, #5a5553, #312f2f )',
    color: '#fff',
    boxShadow: 'none',
    transform: 'none',
  },
});

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  children: ReactNode;
  variant?: 'contained' | 'outlined' | 'orange';
}

const CustomButton = ({
  children,
  variant = 'contained',
  ...props
}: CustomButtonProps) => {
  if (variant === 'outlined')
    return <OutlineButton {...props}>{children}</OutlineButton>;
  if (variant === 'orange')
    return <OrangeButton {...props}>{children}</OrangeButton>;
  return <GradientButton {...props}>{children}</GradientButton>;
};

export default CustomButton;
