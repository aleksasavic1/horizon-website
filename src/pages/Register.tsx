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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    country: COUNTRY_OPTIONS[0].value,
    email: '',
    password: '',
    confirm_password: '',
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data:', formData);
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
          <CustomInput
            label='Last name:'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
          />
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
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomButton type='submit'>Register</CustomButton>
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
