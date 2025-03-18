import { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import CustomTextArea from '../components/common/CustomTextArea';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/auth-store';
import { UserData } from '../types/auth-types';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import flagPlaceholder from '../assets/flag-placeholder.webp';
import csgoBg from '../assets/csgo-bg.jpg';

const SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_MAIL_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_MAIL_USER_ID;

const Contact = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
  });

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    from_name: '',
    from_email: '',
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData(data);
          setFormData((prevData) => ({
            ...prevData,
            from_name: `${data.first_name} ${data.last_name}`,
            from_email: data.email,
          }));
        } else {
          console.log('No user data found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  const countryCode = userData.country ? userData.country.toUpperCase() : '';

  const handleSendEmail = async () => {
    if (
      !formData.from_email ||
      !formData.message.trim() ||
      !formData.subject.trim()
    ) {
      toast.error('Please fill in all fields before sending.');
      return;
    }

    setIsSending(true);

    const serviceID = SERVICE_ID;
    const templateID = TEMPLATE_ID;
    const userID = USER_ID;

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'asavic846@gmail.com',
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      toast.success('Message sent successfully!');
      setFormData({
        subject: '',
        message: '',
        from_name: userData.first_name,
        from_email: userData.email,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '8px',
        minHeight: 'calc(100vh - 68px)',

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${csgoBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',

        '@media (max-width: 768px)': {
          p: 2,
        },
      }}
    >
      <Container maxWidth='sm' sx={{ p: 0 }}>
        <Typography
          sx={{
            fontSize: '2.3rem',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '16px auto 8px',
            padding: '0 10px',
            lineHeight: 1.4,

            '@media (max-width: 768px)': {
              fontSize: '2rem',
            },
          }}
        >
          Contact Us
        </Typography>

        <Typography
          sx={{
            fontSize: '1.1rem',
            textAlign: 'center',
            color: 'hsla(0, 0%, 100%, 0.6)',
            maxWidth: '720px',
            margin: '0 auto 32px',

            '@media (max-width: 768px)': {
              fontSize: '1rem',
            },
          }}
        >
          If you enjoyed this project, feel free to reach out. I'm open to
          collaboration and discussions!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CustomInput
            label='First name:'
            value={userData.first_name}
            disabled={!!userData.first_name}
            sx={{ minWidth: '100%' }}
          />
          <CustomInput
            label='Last name:'
            value={userData.last_name}
            disabled={!!userData.last_name}
            sx={{ minWidth: '100%' }}
          />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography>Country: </Typography>
            {countryCode === '' ? (
              <img src={flagPlaceholder} alt='flag placeholder' height='22' />
            ) : (
              <img
                src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
                alt='flag'
                height='22'
              />
            )}
          </Box>

          <CustomInput
            label='Email:'
            value={userData.email}
            disabled={!!userData.email}
            sx={{ minWidth: '100%' }}
          />
          <CustomInput
            label='Subject:'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            sx={{ minWidth: '100%' }}
          />

          <CustomTextArea
            placeholder='Enter your message here...'
            name='message'
            value={formData.message}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'end', my: 2 }}>
          <CustomButton
            variant='outlined'
            onClick={handleSendEmail}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </CustomButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
