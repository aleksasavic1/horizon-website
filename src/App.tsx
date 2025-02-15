import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleUpdater from './components/navigation/TitleUpdater';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import MyLibrary from './pages/MyLibrary';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <TitleUpdater />
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route index path='/' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/games/:id' element={<GameDetails />} />
          <Route path='/library' element={<MyLibrary />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
