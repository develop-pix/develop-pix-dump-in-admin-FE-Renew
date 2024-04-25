import { Box, Paper, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { customColors } from '../../../../styles';

interface IProps extends PropsWithChildren {
  title: string;
}

export default function ChartContainer({ children, title }: IProps) {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        width: '35vw',
        margin: '40px 0px 40px 40px',
        border: `2px solid ${customColors.sub_pink}`,
      }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">{title}</Typography>
      </Box>

      {children}
    </Paper>
  );
}
