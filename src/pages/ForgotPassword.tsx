import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { useResetPassword } from '../hooks/auth-hook';

const ForgotPassword = () => {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return setError('Email is required');

    resetPassword(email);
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          marginTop: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}
        >
          Forgot Password
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '360px',
          }}
        >
          <CustomInput
            label='Email:'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton type='submit' disabled={isPending}>
              {isPending ? 'Sending...' : 'Send'}
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
