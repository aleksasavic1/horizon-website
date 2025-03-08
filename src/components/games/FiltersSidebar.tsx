import { FC, ChangeEvent } from 'react';
import {
  Box,
  Drawer,
  Typography,
  FormControl,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomSelect from '../common/CustomSelect';
import CustomSwitch from '../common/CustomSwitch';
import {
  PLATFORM_OPTIONS,
  GENRE_OPTIONS,
  SORT_BY_OPTIONS,
} from '../../constants/select-options';

interface FiltersSidebarProps {
  open: boolean;
  onClose: () => void;
  formData: {
    search: string;
    platforms: string;
    genres: string;
    sort_by: string;
    is_multiplayer: boolean;
  };
  handleChange: (
    event: SelectChangeEvent | ChangeEvent<HTMLInputElement>
  ) => void;
}

const FiltersSidebar: FC<FiltersSidebarProps> = ({
  open,
  onClose,
  formData,
  handleChange,
}) => {
  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          padding: 3,
          backgroundColor: '#121212',
          color: '#fff',
          height: '100%',
          position: 'relative',

          '@media (max-width: 1024px)': {
            width: '50vw',
          },
          '@media (max-width: 768px)': {
            width: '100vw',
          },
        }}
      >
        <Typography variant='h6' sx={{ mb: 2, mt: 3, textAlign: 'center' }}>
          Filters
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant='body2' sx={{ mb: 0.8 }}>
            Platforms:
          </Typography>
          <CustomSelect
            name='platforms'
            value={formData.platforms}
            onChange={handleChange}
            options={PLATFORM_OPTIONS}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant='body2' sx={{ mb: 0.8 }}>
            Genres:
          </Typography>
          <CustomSelect
            name='genres'
            value={formData.genres}
            onChange={handleChange}
            options={GENRE_OPTIONS}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant='body2' sx={{ mb: 0.8 }}>
            Sort by:
          </Typography>
          <CustomSelect
            name='sort_by'
            value={formData.sort_by}
            onChange={handleChange}
            options={SORT_BY_OPTIONS}
          />
        </FormControl>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
            justifyContent: 'center',
          }}
        >
          <CustomSwitch
            leftLabel='Singleplayer'
            rightLabel='Multiplayer'
            name='is_multiplayer'
            checked={formData.is_multiplayer}
            onChange={handleChange}
          />
        </Box>

        <IconButton
          sx={{ position: 'absolute', top: 10, right: 10 }}
          onClick={onClose}
        >
          <CloseIcon sx={{ color: 'white', fontSize: '22px' }} />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default FiltersSidebar;
