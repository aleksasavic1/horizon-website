import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/system';

const TextAreaContainer = styled(Box)<{ disabled?: boolean }>(
  ({ disabled }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    border: '1px solid hsla(0, 0%, 100%, 0.3)',
    borderRadius: '6px',
    padding: '8px 12px',
    width: '100%',
    maxWidth: '640px',
    transition: 'all 0.3s ease',

    opacity: disabled ? 0.5 : 1,

    '&:hover': {
      borderColor: disabled
        ? 'hsla(0, 0%, 100%, 0.2)'
        : 'hsla(0, 0%, 100%, 0.4)',
    },

    '&:focus-within': {
      borderColor: disabled
        ? 'hsla(0, 0%, 100%, 0.4)'
        : 'hsla(0, 0%, 100%, 0.6)',
    },
  })
);

const StyledTextArea = styled('textarea')({
  flex: 1,
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '16px',
  background: 'transparent',
  border: 'none',
  resize: 'none',
  outline: 'none',
  width: '100%',
  minHeight: '120px',
  padding: '4px 0',
  fontFamily: 'inherit',

  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },

  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

type CustomTextAreaProps = {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  sx?: SxProps<Theme>;
  textareaStyle?: SxProps<Theme>;
  disabled?: boolean;
  rows?: number;
};

const CustomTextArea = ({
  placeholder,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  startAdornment,
  endAdornment,
  sx,
  textareaStyle,
  disabled = false,
  rows = 4,
}: CustomTextAreaProps) => {
  return (
    <TextAreaContainer sx={sx} disabled={disabled}>
      {startAdornment && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
          {startAdornment}
        </Box>
      )}
      <StyledTextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        style={textareaStyle as React.CSSProperties}
        rows={rows}
      />
      {endAdornment && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          {endAdornment}
        </Box>
      )}
    </TextAreaContainer>
  );
};

export default CustomTextArea;
