import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { onAuthStateChanged, User, getIdToken, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) => set({ token }),

      logout: async () => {
        await signOut(auth);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await getIdToken(user);
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
  } else {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setToken(null);
  }

  useAuthStore.setState({ isLoading: false });
});

export default useAuthStore;
