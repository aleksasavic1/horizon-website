import { GameTypes } from '../types/game-types';

export const filterGamesBySearch = (
  games: GameTypes[],
  searchQuery: string
) => {
  if (!searchQuery) return games;

  return games.filter((game) =>
    game.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M+';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'K+';
  }
  return num.toString();
};

export const parseRequirements = (raw: string): string[] => {
  const cleaned = raw.replace(/^Minimum:|^Recommended:/, '').trim();
  return cleaned
    .split(/(?=[A-Z][a-z]+:)/)
    .map((line) => line.trim())
    .filter((line) => line.includes(':'));
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-GB');
};

export const openLink = (url: string) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
