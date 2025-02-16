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

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          Sign In
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
              onClick={() => console.log('Forgot Password Clicked.')}
            >
              Forgot Password?
            </Link>
            <CustomButton type='submit'>Login</CustomButton>
          </Box>
          <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}>
            Don't have an account?&nbsp;
            <Link
              sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
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
