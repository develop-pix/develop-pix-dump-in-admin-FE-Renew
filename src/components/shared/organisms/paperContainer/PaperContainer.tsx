/* eslint-disable react/jsx-props-no-spreading */
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import { customColors } from '../../../../styles';

interface IProps extends BoxProps {
  topContent: ReactNode;
  bottomContent: ReactNode;
  title: string;
}

export default function PaperContainer({
  topContent,
  bottomContent,
  title,
  ...boxProps
}: IProps) {
  return (
    <Box
      {...boxProps}
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
          {topContent}
        </Box>

        {bottomContent}
      </Box>
    </Box>
  );
}
