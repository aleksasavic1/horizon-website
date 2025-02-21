import { useState } from 'react';
import { Box, Typography, FormControl, SelectChangeEvent } from '@mui/material';
import CustomSelect from '../common/CustomSelect';
import CustomButton from '../common/CustomButton';
import CustomSwitch from '../common/CustomSwitch';
import {
  PLATFORM_OPTIONS,
  GENRE_OPTIONS,
  SORT_BY_OPTIONS,
} from '../../constants/select-options';
import CustomInput from '../common/CustomInput';

type FiltersSidebarProps = {
  setFilters: (filters: Record<string, string>) => void;
};

const FiltersSidebar = ({ setFilters }: FiltersSidebarProps) => {
  const [formData, setFormData] = useState({
    search: '',
    platforms: '',
    genres: '',
    sort_by: '',
    is_multiplayer: true,
  });

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

  const handleResetFilters = () => {
    setFormData({
      search: '',
      platforms: '',
      genres: '',
      sort_by: '',
      is_multiplayer: true,
    });

    setFilters({});
  };

  return (
    <Box
      sx={{
        minWidth: '320px',
        padding: '24px 16px',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderTopRightRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: 'calc(100vh - 68px)',
        overflowY: 'auto',

        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Filters
      </Typography>

      <CustomInput
        placeholder='Search Games'
        name='search'
        value={formData.search}
        onChange={handleChange}
        sx={{ height: '52px' }}
      />

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '6px' }}>Platforms:</Typography>
        <CustomSelect
          name='platforms'
          value={formData.platforms}
          onChange={handleChange}
          options={PLATFORM_OPTIONS}
        />
      </FormControl>

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '6px' }}>Genres:</Typography>
        <CustomSelect
          name='genres'
          value={formData.genres}
          onChange={handleChange}
          options={GENRE_OPTIONS}
        />
      </FormControl>

      <FormControl fullWidth>
        <Typography sx={{ marginBottom: '6px' }}>Sort by:</Typography>
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
