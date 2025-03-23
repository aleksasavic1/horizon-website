import ReactDOM from 'react-dom';
import { Box, Modal } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  customStyle?: SxProps<Theme>;
  hideCloseButton?: boolean;
};

const modalRoot = document.getElementById('modal') as HTMLElement;

const CustomModal = ({
  open,
  onClose,
  children,
  customStyle,
  hideCloseButton = false,
}: ModalProps) => {
  if (!modalRoot) return null;

  const defaultStyles: SxProps<Theme> = {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    minWidth: '50%',
    height: '75%',
    overflowY: 'auto',
    bgcolor: 'rgb(28, 28, 28)',
    boxShadow: 24,
    padding: '12px',
    borderRadius: '30px',
    outline: 'none',

    '@media (max-width: 1024px)': {
      minWidth: '80%',
    },

    '@media (max-width: 768px)': {
      borderRadius: '30px 30px 0 0',
      minWidth: '100%',
      bottom: 0,
      transform: 'translate(-50%, 0%)',
      height: '90%',
    },
  };

  return ReactDOM.createPortal(
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      disableEscapeKeyDown={false}
    >
      <Box
        sx={{ ...defaultStyles, ...customStyle }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {onClose && !hideCloseButton && (
          <CustomButton
            className='cursor-hover'
            variant='outlined'
            onClick={onClose}
            disableRipple
            sx={{
              mt: 2,
              display: 'block',
              ml: 'auto',
              position: 'absolute',
              top: 0,
              right: 0,
              border: 'none',

              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </CustomButton>
        )}
      </Box>
    </Modal>,
    modalRoot
  );
};

export default CustomModal;
