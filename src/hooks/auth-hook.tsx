import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} from '../services/auth-api';
import useAuthStore from '../store/auth-store';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
    onSuccess: (user) => {
      return user;
    },
    onError: (error: FirebaseError) => {
      toast.error(error.message);
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
    onError: (error: FirebaseError) => {
      toast.error(error.message);
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
    onError: (error: FirebaseError) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => resetPassword(email),
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error: FirebaseError) => {
      toast.error(error.message);
    },
  });
};
