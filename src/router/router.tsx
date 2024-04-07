// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage, LoginPage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

export default router;
