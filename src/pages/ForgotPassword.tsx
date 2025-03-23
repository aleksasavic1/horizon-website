import { Box, Typography } from '@mui/material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { useResetPassword } from '../hooks/auth-hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaTypes,
} from '../utils/validation';
import nfsBg from '../assets/images/nfs-bg.png';

const ForgotPassword = () => {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaTypes>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchemaTypes) => {
    resetPassword(data.email);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url(${nfsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box
        sx={{
          marginTop: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            '@media (min-width: 1921px)': {
              fontSize: '2.4rem',
            },
          }}
        >
          Forgot Password
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '360px',
            px: '16px',

            '@media (max-width: 360px)': {
              width: '100%',
            },
            '@media (min-width: 1921px)': {
              width: '420px',
            },
          }}
        >
          <Box>
            <CustomInput label='Email:' {...register('email')} />
            {errors.email && (
              <Typography
                sx={{
                  color: (theme) => theme.palette.red.default,
                  fontSize: '12px',
                  mt: '5px',
                }}
              >
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton
              type='submit'
              disabled={isPending}
              sx={{
                '@media (min-width: 1921px)': {
                  fontSize: '15px',
                },
              }}
            >
              {isPending ? 'Sending...' : 'Send'}
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
