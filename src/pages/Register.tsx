/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CustomSelect from '../components/common/CustomSelect';
import { COUNTRY_OPTIONS } from '../constants/select-options';
import { useRegister } from '../hooks/auth-hook';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import useAuthStore from '../store/auth-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchemaTypes } from '../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registration, isPending } = useRegister();
  const setIsUserSaved = useAuthStore((state) => state.setIsUserSaved);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterSchemaTypes>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country: COUNTRY_OPTIONS[0].value,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data: RegisterSchemaTypes) => {
    registration(
      { email: data.email, password: data.password },
      {
        onSuccess: async (user: any) => {
          if (!user?.uid) {
            console.error('No user UID found.');
            return;
          }

          try {
            await setDoc(doc(db, 'users', user.uid), {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              country: data.country,
            });

            setIsUserSaved(true);
          } catch (error) {
            console.error('Error saving user data:', error);
          }
        },
      }
    );
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
          Sign Up
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
          }}
        >
          <Box>
            <CustomInput label='First name:' {...register('first_name')} />
            {errors.first_name && (
              <Typography sx={{ color: 'red', fontSize: '12px', mt: '5px' }}>
                {errors.first_name.message}
              </Typography>
            )}
          </Box>

          <Box>
            <CustomInput label='Last name:' {...register('last_name')} />
            {errors.last_name && (
              <Typography sx={{ color: 'red', fontSize: '12px', mt: '5px' }}>
                {errors.last_name.message}
              </Typography>
            )}
          </Box>

          <CustomSelect
            value={watch('country')}
            options={COUNTRY_OPTIONS}
            {...register('country')}
          />

          <Box>
            <CustomInput label='Email:' {...register('email')} />
            {errors.email && (
              <Typography sx={{ color: 'red', fontSize: '12px', mt: '5px' }}>
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
              <Typography sx={{ color: 'red', fontSize: '12px', mt: '5px' }}>
                {errors.password.message}
              </Typography>
            )}
          </Box>

          <Box>
            <CustomInput
              label='Confirm password:'
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirm_password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge='end'
                  >
                    {showConfirmPassword ? (
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
            {errors.confirm_password && (
              <Typography sx={{ color: 'red', fontSize: '12px', mt: '5px' }}>
                {errors.confirm_password.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton type='submit' disabled={isPending}>
              {isPending ? 'Registering...' : 'Register'}
            </CustomButton>
          </Box>
          <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}>
            Already have an account?&nbsp;
            <Link
              className='cursor-hover'
              sx={{ fontSize: '0.9rem' }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
