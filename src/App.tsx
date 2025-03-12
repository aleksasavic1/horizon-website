import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import TitleUpdater from './components/navigation/TitleUpdater';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layouts/Layout';
import ProtectedLayout from './layouts/ProtectedLayout';
import useAuthStore from './store/auth-store';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import MyLibrary from './pages/MyLibrary';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isUserSaved = useAuthStore((state) => state.isUserSaved);

  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <TitleUpdater />
      <Layout>
        <Routes>
          <Route
            index
            path='/login'
            element={isAuthenticated ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/register'
            element={
              isAuthenticated && isUserSaved ? (
                <Navigate to='/' />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path='/forgot-password'
            element={isAuthenticated ? <Navigate to='/' /> : <ForgotPassword />}
          />

          <Route element={<ProtectedLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/games/:id' element={<GameDetails />} />
            <Route path='/library' element={<MyLibrary />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<MyProfile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
