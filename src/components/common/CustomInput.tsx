import { ReactNode } from 'react';
import { Box, InputBase, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/system';

const InputContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: '1px solid hsla(0, 0%, 100%, 0.3)',
  borderRadius: '6px',
  padding: '6px 12px',
  width: '100%',
  maxWidth: '640px',
  transition: 'all 0.3s ease',

  '&:hover': {
    borderColor: 'hsla(0, 0%, 100%, 0.4)',
  },

  '&:focus-within': {
    borderColor: 'hsla(0, 0%, 100%, 0.6)',
  },
});

const StyledInput = styled(InputBase)({
  marginLeft: '8px',
  flex: 1,
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '16px',

  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },

  '&:focus': {
    outline: 'none',
  },
});

type CustomInputProps = {
  placeholder?: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  sx?: SxProps<Theme>;
  inputStyle?: SxProps<Theme>;
};

const CustomInput = ({
  placeholder,
  label,
  name,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  startAdornment,
  endAdornment,
  sx,
  inputStyle,
}: CustomInputProps) => {
  return (
    <InputContainer sx={sx}>
      {startAdornment && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {startAdornment}
        </Box>
      )}
      {label && <label>{label}</label>}
      <StyledInput
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        sx={inputStyle}
      />
      {endAdornment && <Box>{endAdornment}</Box>}
    </InputContainer>
  );
};

export default CustomInput;
