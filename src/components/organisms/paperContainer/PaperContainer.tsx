import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { customColors } from '../../../styles';

interface IProps {
  top: ReactNode;
  down: ReactNode;
  title: string;
}
export default function PaperContainer({ top, down, title }: IProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0px 40px 0px',
        minWidth: '90vw',
      }}
    >
      <Box sx={{ width: '95%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              fontWeight: '600',
              borderColor: `${customColors?.color_border_gray}`,
              borderBottom: 'none',
              padding: '13px 10px 5px 10px',
              borderRadius: '10px 10px 0 0',
              backgroundColor: `${customColors?.sub_pink}`,
              fontSize: '18px',
            }}
          >
            {title}
          </Box>
          {top}
        </Box>

        {down}
      </Box>
    </Box>
  );
}
