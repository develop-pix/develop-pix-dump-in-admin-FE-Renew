/* eslint-disable import/no-extraneous-dependencies */
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { router } from './router';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, Roboto, sans-serif',
  },
});

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
