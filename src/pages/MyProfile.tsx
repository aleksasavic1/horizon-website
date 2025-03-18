import { useState, useEffect } from 'react';
import { Box, IconButton, SelectChangeEvent, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomInput from '../components/common/CustomInput';
import CustomSelect from '../components/common/CustomSelect';
import CustomButton from '../components/common/CustomButton';
import { COUNTRY_OPTIONS } from '../constants/select-options';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useAuthStore from '../store/auth-store';
import { UserData } from '../types/auth-types';
import { toast } from 'react-toastify';
import { resetPassword } from '../services/auth-api';
import profilePlaceholder from '../assets/profile-placeholder.jpg';
import profileBg from '../assets/profile-bg.webp';

type MyProfileProps = {
  profilePicture: string | null;
  setProfilePicture: (picture: string) => void;
};

const MyProfile = ({ profilePicture, setProfilePicture }: MyProfileProps) => {
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);

  const { user, isAuthenticated } = useAuthStore();
  const [userData, setUserData] = useState<UserData>({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    profile_picture: profilePicture || '',
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData((prev) => ({ ...prev, ...userSnap.data() }));
        } else {
          console.log('No user data found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !user?.uid) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setUserData((prev) => ({ ...prev, profile_picture: base64String }));

      try {
        await updateDoc(doc(db, 'users', user.uid), {
          profile_picture: base64String,
        });
        setProfilePicture(base64String);
      } catch (error) {
        console.error('Error saving image:', error);
      }
    };
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), userData);
      setIsEditEnabled(false);

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().profile_picture) {
        setUserData((prev) => ({
          ...prev,
          profile_picture: userSnap.data().profile_picture,
        }));
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) {
      toast.error('No email associated with this account.');
      return;
    }

    try {
      const message = await resetPassword(user.email);
      toast.success(message);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Failed to send password reset email.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 68px)',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${profileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box
        sx={(theme) => ({
          p: 4,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '720px',
          mx: 2,
          backgroundColor: theme.palette.background.default,
          boxShadow: '0 0 6px hsla(0, 0%, 0%, 0.4)',
          zIndex: 0,

          '@media (max-width: 440px)': {
            mx: 1,
            py: 4,
            px: 2,
          },
        })}
      >
        <Box
          sx={{
            width: '101px',
            height: '101px',
            position: 'relative',
            mx: 'auto',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, rgba(255, 126, 95, 0.2), rgba(254, 180, 123, 0.8))',
              zIndex: -1,
            },

            '@media (max-width: 640px)': {
              width: '91px',
              height: '91px',
            },
          }}
        >
          <Box
            component='img'
            src={userData.profile_picture || profilePlaceholder}
            alt='Profile Picture'
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              userSelect: 'none',

              '@media (max-width: 640px)': {
                width: '90px',
                height: '90px',
              },
            }}
          />

          {isEditEnabled && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '26px',
                height: '26px',
                backgroundColor: 'hsla(0, 0%, 10%, 0.8)',
                border: '1px solid hsla(0, 0%, 100%, 0.6)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isEditEnabled ? 'pointer' : 'not-allowed',
                transition: '300ms ease',

                '&:hover': {
                  backgroundColor: 'hsla(0, 0%, 10%, 1)',
                  border: '1px solid hsla(0, 0%, 100%, 0.8)',
                },
              }}
            >
              <IconButton component='label'>
                <EditIcon sx={{ color: 'white', fontSize: 16 }} />
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handleChangeImage}
                />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 3,

            '@media (max-width: 640px)': {
              gridTemplateColumns: 'repeat(1, 1fr)',
            },
          }}
        >
          <Box>
            <CustomInput
              label='First name:'
              name='first_name'
              value={userData.first_name}
              onChange={handleChange}
              disabled={!isEditEnabled}
            />
          </Box>
          <Box>
            <CustomInput
              label='Last name:'
              name='last_name'
              value={userData.last_name}
              onChange={handleChange}
              disabled={!isEditEnabled}
            />
          </Box>
          <Box>
            <CustomSelect
              options={COUNTRY_OPTIONS}
              name='country'
              value={userData.country}
              onChange={handleChange}
              disabled={!isEditEnabled}
            />
          </Box>
          <Box>
            <CustomInput
              label='Email:'
              name='email'
              value={userData.email}
              onChange={handleChange}
              disabled
            />
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: '6px' }}>
              <Link
                sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
                onClick={handleChangePassword}
              >
                Change password
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: 1,
            mt: 2,
            '@media (max-width: 640px)': {
              mt: 1,
            },
          }}
        >
          {isEditEnabled && (
            <CustomButton
              variant='outlined'
              onClick={() => setIsEditEnabled(false)}
              sx={{ width: '80px' }}
            >
              Cancel
            </CustomButton>
          )}
          <CustomButton
            variant={isEditEnabled ? 'contained' : 'outlined'}
            onClick={isEditEnabled ? handleSave : () => setIsEditEnabled(true)}
            sx={{ width: '80px' }}
          >
            {isEditEnabled ? 'Save' : 'Edit'}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
