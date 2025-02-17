import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser, logoutUser } from '../services/auth-api';
import useAuthStore from '../store/auth-store';
import { toast } from 'react-toastify';

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error.slice(10));
    },
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (user) => {
      setUser(user);
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.slice(10));
    },
  });
};

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
    },
    onError: (error: any) => {
      toast.error(error.slice(10));
    },
  });
};
