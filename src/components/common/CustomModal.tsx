// TODO: use this modal somewhere

import ReactDOM from 'react-dom';
import { Box, Modal } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  customStyle?: SxProps<Theme>;
  hideCloseButton?: boolean;
}

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
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '100%',
    height: '94%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '12px',
    borderRadius: '30px 30px 0 0',
    outline: 'none',
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
            variant='outlined'
            onClick={onClose}
            sx={{
              mt: 2,
              display: 'block',
              ml: 'auto',
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
          >
            <CloseIcon />
          </CustomButton>
        )}
      </Box>
    </Modal>,
    modalRoot
  );
};

export default CustomModal;
