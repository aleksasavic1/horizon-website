import countries from 'world-countries';

export const PLATFORM_OPTIONS = [
  { value: '', label: 'All Platforms' },
  { value: '4', label: 'PC' },
  { value: '18', label: 'PlayStation 4' },
  { value: '187', label: 'PlayStation 5' },
  { value: '1', label: 'Xbox One' },
  { value: '7', label: 'Nintendo Switch' },
];

export const GENRE_OPTIONS = [
  { value: '', label: 'All Genres' },
  { value: '4', label: 'Action' },
  { value: '3', label: 'Adventure' },
  { value: '5', label: 'RPG' },
  { value: '2', label: 'Shooter' },
  { value: '10', label: 'Strategy' },
  { value: '11', label: 'Arcade' },
  { value: '83', label: 'Platformer' },
  { value: '14', label: 'Simulation' },
  { value: '7', label: 'Puzzle' },
  { value: '1', label: 'Racing' },
  { value: '15', label: 'Sports' },
  { value: '19', label: 'Family' },
  { value: '28', label: 'Board Games' },
  { value: '34', label: 'Educational' },
  { value: '17', label: 'Card & Casino' },
];

export const SORT_BY_OPTIONS = [
  { value: '', label: 'Default' },
  { value: '-released', label: 'Newest' },
  { value: '-rating', label: 'Top Rated' },
  { value: '-added', label: 'Most Popular' },
];

export const COUNTRY_OPTIONS = countries.map((country) => ({
  value: country.cca2.toLowerCase(),
  label: country.name.common,
}));
