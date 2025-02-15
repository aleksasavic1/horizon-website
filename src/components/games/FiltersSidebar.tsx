import { useState } from 'react';
import { Box, Typography, FormControl, SelectChangeEvent } from '@mui/material';
import CustomSelect from '../common/CustomSelect';
import CustomButton from '../common/CustomButton';
import {
  PLATFORM_OPTIONS,
  GENRE_OPTIONS,
  SORT_BY_OPTIONS,
} from '../../constants/select-options';
import CustomSwitch from '../common/CustomSwitch';

const FiltersSidebar = () => {
  const [formData, setFormData] = useState({
    platforms: PLATFORM_OPTIONS[0].value,
    genres: GENRE_OPTIONS[0].value,
    sort_by: SORT_BY_OPTIONS[0].value,
    is_multiplayer: true,
  });

  const handleChange = (
    event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleResetFilters = () => {
    setFormData({
      platforms: PLATFORM_OPTIONS[0].value,
      genres: GENRE_OPTIONS[0].value,
      sort_by: SORT_BY_OPTIONS[0].value,
      is_multiplayer: true,
    });
  };

  return (
    <Box
      sx={{
        width: '300px',
        padding: '16px',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderTopRightRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Filters
      </Typography>

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '4px' }}>Platforms:</Typography>
        <CustomSelect
          name='platforms'
          value={formData.platforms}
          onChange={handleChange}
          options={PLATFORM_OPTIONS}
        />
      </FormControl>

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '4px' }}>Genres:</Typography>
        <CustomSelect
          name='genres'
          value={formData.genres}
          onChange={handleChange}
          options={GENRE_OPTIONS}
        />
      </FormControl>

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '4px' }}>Sort by:</Typography>
        <CustomSelect
          name='sort_by'
          value={formData.sort_by}
          onChange={handleChange}
          options={SORT_BY_OPTIONS}
        />
      </FormControl>

      <CustomSwitch
        rightLabel='Multiplayer'
        name='is_multiplayer'
        checked={formData.is_multiplayer}
        onChange={handleChange}
      />

      <CustomButton variant='outlined' onClick={handleResetFilters}>
        Reset Filters
      </CustomButton>
    </Box>
  );
};

export default FiltersSidebar;
