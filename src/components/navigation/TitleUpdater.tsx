import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/login': 'Login',
      '/register': 'Register',
      '/': 'Home',
      '/games': 'Games',
      '/library': 'My Library',
      '/faq': 'FAQ',
      '/contact': 'Contact Us',
    };

    document.title = titles[location.pathname] || 'Horizon';
  }, [location.pathname]);

  return null;
};

export default TitleUpdater;
