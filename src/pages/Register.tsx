/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Link,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import CustomSelect from '../components/common/CustomSelect';
import { COUNTRY_OPTIONS } from '../constants/select-options';
import { RegisterTypes } from '../types/auth-types';
import { useRegister } from '../hooks/auth-hook';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import useAuthStore from '../store/auth-store';

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();
  const setIsUserSaved = useAuthStore((state) => state.setIsUserSaved);

  const [formData, setFormData] = useState<RegisterTypes>({
    first_name: '',
    last_name: '',
    country: COUNTRY_OPTIONS[0].value,
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name) {
      newErrors.first_name = 'This field is required';
    }

    if (!formData.last_name) {
      newErrors.last_name = 'This field is required';
    }

    if (!formData.email) {
      newErrors.email = 'This field is required';
    }

    if (!formData.password) {
      newErrors.password = 'This field is required';
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    register(
      { email: formData.email, password: formData.password },
      {
        onSuccess: async (user: any) => {
          if (!user?.uid) {
            console.error('No user UID found.');
            return;
          }

          try {
            await setDoc(doc(db, 'users', user.uid), {
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              country: formData.country,
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
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '360px',
          }}
        >
          <CustomInput
            label='First name:'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {errors.first_name}
            </Typography>
          )}
          <CustomInput
            label='Last name:'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {errors.last_name}
            </Typography>
          )}
          <CustomSelect
            options={COUNTRY_OPTIONS}
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
          <CustomInput
            label='Email:'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {errors.email}
            </Typography>
          )}
          <CustomInput
            label='Password:'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={togglePasswordVisibility} edge='end'>
                  {showPassword ? (
                    <VisibilityOff sx={{ color: 'white', fontSize: '20px' }} />
                  ) : (
                    <Visibility sx={{ color: 'white', fontSize: '20px' }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {errors.password}
            </Typography>
          )}
          <CustomInput
            label='Confirm password:'
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirm_password'
            value={formData.confirm_password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge='end'
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: 'white', fontSize: '20px' }} />
                  ) : (
                    <Visibility sx={{ color: 'white', fontSize: '20px' }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.confirm_password && (
            <Typography
              sx={{
                color: 'hsl(0, 50%, 60%)',
                fontSize: '12px',
                marginTop: '-8px',
              }}
            >
              {errors.confirm_password}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton type='submit' disabled={isPending}>
              {isPending ? 'Registering...' : 'Register'}
            </CustomButton>
          </Box>
          <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}>
            Already have an account?&nbsp;
            <Link
              sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
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
