import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitleUpdater from './components/navigation/TitleUpdater';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import MyLibrary from './pages/MyLibrary';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <TitleUpdater />
      <Layout>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/library' element={<MyLibrary />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
