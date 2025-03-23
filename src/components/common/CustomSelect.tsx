import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

type CustomSelectProps = {
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  sx?: object;
  disabled?: boolean;
};

const CustomSelect = ({
  name,
  value,
  onChange,
  options,
  sx,
  disabled = false,
}: CustomSelectProps) => {
  return (
    <FormControl fullWidth sx={sx}>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        IconComponent={() => null}
        displayEmpty
        disabled={disabled}
        sx={{
          color: 'white',
          border: '1px solid hsla(0, 0%, 100%, 0.3)',
          borderRadius: '4px',
          transition: 'border 0.3s ease',
          height: '50px',

          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&:hover': {
            border: '1px solid hsla(0, 0%, 100%, 0.4)',
          },
          '&.Mui-focused': {
            border: '1px solid hsla(0, 0%, 100%, 0.6)',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: (theme) => ({
              backgroundColor: theme.palette.black.eerieBlack,
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.7)',
              maxHeight: '240px',
              overflowY: 'auto',
              width: '171px',
            }),
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={(theme) => ({
              cursor: "url('/cursor/link_select_pointer.cur') 0 0, pointer",

              '&:hover': {
                backgroundColor: theme.palette.black.darkCharcoal,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.black.charcoal,
                '&:hover': {
                  backgroundColor: theme.palette.gray.darkGray,
                },
              },
            })}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
