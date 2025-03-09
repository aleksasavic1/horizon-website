/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CustomInput from '../components/common/CustomInput';
import GameCard from '../components/GameCard';
import FiltersSidebar from '../components/games/FiltersSidebar';
import { useGames } from '../hooks/games-hook';
import spidermanBg from '../assets/spiderman-bg.jpg';

const Games = () => {
  const [formData, setFormData] = useState({
    search: '',
    platforms: '',
    genres: '',
    sort_by: '',
    is_multiplayer: true,
  });
  const [filters, setFilters] = useState<Record<string, string>>({
    page_size: '20',
  });
  const [page, setPage] = useState(1);
  const [allGames, setAllGames] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: games,
    isPending,
    error,
    isFetching: isQueryFetching,
  } = useGames({ ...filters, page: page.toString() });

  const handleChange = (
    event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFormData(updatedData);

    const queryParams: Record<string, string> = {};
    if (updatedData.search) queryParams.search = updatedData.search;
    if (updatedData.sort_by) queryParams.ordering = updatedData.sort_by;
    if (updatedData.platforms) queryParams.platforms = updatedData.platforms;
    if (updatedData.genres) queryParams.genres = updatedData.genres;
    if (updatedData.is_multiplayer) queryParams.tags = 'multiplayer';

    setFilters(queryParams);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    setAllGames([]);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (games) {
      setAllGames((prevGames) => {
        const uniqueGames = new Map(prevGames.map((game) => [game.id, game]));
        games.forEach((game: any) => uniqueGames.set(game.id, game));
        return Array.from(uniqueGames.values());
      });
      setIsFetching(false);
    }
  }, [games]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching &&
        !isQueryFetching
      ) {
        setIsFetching(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, isQueryFetching]);

  return (
    <Box
      sx={{
        color: '#fff',
        p: 3,

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${spidermanBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 68px)',

        '@media (max-width: 768px)': {
          p: 2,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '16px auto 8px',
          padding: '0 10px',
          lineHeight: 1.4,

          '@media (max-width: 768px)': {
            fontSize: '2rem',
          },
        }}
      >
        Discover the Best Games of All Time
      </Typography>

      <Typography
        sx={{
          fontSize: '1.1rem',
          textAlign: 'center',
          color: 'hsla(0, 0%, 100%, 0.6)',
          maxWidth: '860px',
          margin: '0 auto 32px',

          '@media (max-width: 768px)': {
            fontSize: '1rem',
          },
        }}
      >
        Browse through an extensive collection of legendary games across all
        platforms and genres. Whether you're looking for timeless classics or
        modern masterpieces, find your next adventure here.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <IconButton onClick={toggleFilterMenu} sx={{ color: '#fff' }}>
          <TuneIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <CustomInput
          placeholder='Search Games'
          name='search'
          value={formData.search}
          onChange={handleChange}
          sx={{
            width: '340px',
            height: '48px',
            '@media (max-width: 768px)': {
              width: '280px',
            },
            '@media (max-width: 640px)': {
              width: '200px',
            },
          }}
          startAdornment={
            <SearchRoundedIcon sx={{ color: 'gray', fontSize: '24px' }} />
          }
        />
      </Box>

      <FiltersSidebar
        open={isFilterOpen}
        onClose={toggleFilterMenu}
        formData={formData}
        handleChange={handleChange}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        {isPending && !allGames.length ? (
          <CircularProgress color='secondary' />
        ) : error ? (
          <Typography sx={{ textAlign: 'center', color: 'red', mt: 5 }}>
            Failed to load games. Please try again.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '40px',

              '@media (min-width: 2559px)': {
                gridTemplateColumns: 'repeat(6, 1fr)',
              },
              '@media (max-width: 1919px)': {
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
              '@media (max-width: 1439px)': {
                gridTemplateColumns: 'repeat(3, 1fr)',
              },
              '@media (max-width: 1079px)': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },
              '@media (max-width: 767px)': {
                gridTemplateColumns: 'repeat(1, 1fr)',
              },
            }}
          >
            {allGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Box>
        )}
      </Box>

      {isFetching && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress color='secondary' />
        </Box>
      )}
    </Box>
  );
};

export default Games;
