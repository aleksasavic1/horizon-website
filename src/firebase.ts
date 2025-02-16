import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const SENDER_ID = import.meta.env.VITE_SENDER_ID;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN || 'localhost',
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
