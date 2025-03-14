import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { onAuthStateChanged, User, getIdToken, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthState {
  user: User | null;
  profilePicture: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isUserSaved: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setProfilePicture: (picture: string | null) => void;
  setToken: (token: string | null) => void;
  setIsUserSaved: (isSaved: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profilePicture: null,
      token: null,
      isAuthenticated: false,
      isUserSaved: false,
      isLoading: true,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setProfilePicture: (picture) => set({ profilePicture: picture }),
      setToken: (token) => set({ token }),
      setIsUserSaved: (isSaved) => set({ isUserSaved: isSaved }),
      logout: async () => {
        await signOut(auth);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isUserSaved: false,
        });
      },
    }),
    {
      name: 'horizon-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await getIdToken(user);
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      useAuthStore.getState().setIsUserSaved(true);
    } else {
      useAuthStore.getState().setIsUserSaved(false);
    }
  } else {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setIsUserSaved(false);
  }

  useAuthStore.setState({ isLoading: false });
});

export default useAuthStore;
