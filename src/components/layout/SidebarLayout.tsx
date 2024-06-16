import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </Box>
  );
}
