import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameDetails } from '../../hooks/games-hook';

const TitleUpdater = () => {
  const location = useLocation();

  const match = location.pathname.match(/^\/games\/(\d+)$/);
  const gameId = match ? match[1] : null;

  const { data: game } = useGameDetails(gameId || '');

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

    if (gameId && game?.name) {
      document.title = game.name;
    } else {
      document.title = titles[location.pathname] || 'Horizon';
    }
  }, [location.pathname, game, gameId]);

  return null;
};

export default TitleUpdater;
