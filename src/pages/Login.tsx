import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { useLogin } from '../hooks/auth-hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaTypes } from '../utils/validation';
import nfsBg from '../assets/images/nfs-bg.png';

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaTypes>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: LoginSchemaTypes) => {
    login(data);
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
          Sign In
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

          <Box>
            <CustomInput
              label='Password:'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={togglePasswordVisibility} edge='end'>
                    {showPassword ? (
                      <VisibilityOff
                        sx={{ fontSize: '20px', color: 'white' }}
                      />
                    ) : (
                      <Visibility sx={{ fontSize: '20px', color: 'white' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && (
              <Typography
                sx={{
                  color: (theme) => theme.palette.red.default,
                  fontSize: '12px',
                  mt: '5px',
                }}
              >
                {errors.password.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              className='cursor-hover'
              sx={{
                fontSize: '0.9rem',
                '@media (min-width: 1921px)': {
                  fontSize: '1rem',
                },
              }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Link>
            <CustomButton
              type='submit'
              disabled={isPending}
              sx={{
                '@media (min-width: 1921px)': {
                  fontSize: '15px',
                },
              }}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </CustomButton>
          </Box>
          <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}>
            Don't have an account?&nbsp;
            <Link
              className='cursor-hover'
              sx={{
                fontSize: '0.9rem',
                '@media (min-width: 1921px)': {
                  fontSize: '1rem',
                },
              }}
              onClick={() => navigate('/register')}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
