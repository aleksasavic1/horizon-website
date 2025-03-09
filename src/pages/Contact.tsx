import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/auth-store';

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
};

const Contact = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return;

    const userId = user?.uid;
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        } else {
          console.log('No user data found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 68px)',
      }}
    >
      <Box
        sx={{
          p: 4,
          border: '1px solid hsla(0, 0%, 100%, 0.2)',
          borderRadius: '20px',
        }}
      >
        <Typography>Contact Us</Typography>

        <Box>
          <CustomInput label='First name:' value={userData.first_name} />
          <CustomInput label='Last name:' value={userData.last_name} />
          <CustomInput label='Email:' value={userData.email} />
          <CustomInput label='Subject:' />
        </Box>

        <CustomButton variant='outlined'>Send</CustomButton>
      </Box>
    </Box>
  );
};

export default Contact;
