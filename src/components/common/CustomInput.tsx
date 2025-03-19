import { ReactNode } from 'react';
import { Box, InputBase, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/system';

const InputContainer = styled(Box)<{ disabled?: boolean }>(({ disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: '1px solid hsla(0, 0%, 100%, 0.3)',
  borderRadius: '6px',
  padding: '6px 12px',
  width: '100%',
  maxWidth: '640px',
  transition: 'all 0.3s ease',

  opacity: disabled ? 0.5 : 1,

  '&:hover': {
    borderColor: disabled ? 'hsla(0, 0%, 100%, 0.2)' : 'hsla(0, 0%, 100%, 0.4)',
  },

  '&:focus-within': {
    borderColor: disabled ? 'hsla(0, 0%, 100%, 0.4)' : 'hsla(0, 0%, 100%, 0.6)',
  },
}));

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

  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

type CustomInputProps = {
  placeholder?: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  ref?: React.Ref<HTMLInputElement>;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  sx?: SxProps<Theme>;
  inputStyle?: SxProps<Theme>;
  disabled?: boolean;
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
  ref,
  startAdornment,
  endAdornment,
  sx,
  inputStyle,
  disabled = false,
}: CustomInputProps) => {
  return (
    <InputContainer sx={sx} disabled={disabled}>
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
        inputRef={ref}
        disabled={disabled}
        sx={inputStyle}
      />
      {endAdornment && <Box>{endAdornment}</Box>}
    </InputContainer>
  );
};

export default CustomInput;
