import { Tooltip, TooltipProps } from '@mui/material';

interface CustomTooltipProps extends TooltipProps {
  title: string;
  children: React.ReactElement;
}

const CustomTooltip = ({ title, children, ...props }: CustomTooltipProps) => {
  return (
    <Tooltip
      title={title}
      arrow
      placement='top'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'window',
              },
            },
          ],
        },
        tooltip: {
          sx: {
            backgroundColor: 'hsl(0, 0%, 0%)',
            color: 'hsl(0, 0%, 100%)',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
          },
        },
        arrow: {
          sx: {
            color: 'hsl(0, 0%, 0%)',
          },
        },
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
