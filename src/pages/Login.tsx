import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';

const Login = () => {
  const navigate = useNavigate();

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
          Login
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CustomInput label='Email:' />
          <CustomInput label='Password:' />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
              onClick={() => console.log('Forgot Password Clicked.')}
            >
              Forgot Password?
            </Link>
            <CustomButton>Login</CustomButton>
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
