// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserRouter } from 'react-router-dom';
import {
  DashboardPage,
  EventEditPage,
  EventManagePage,
  LoginPage,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/event',
    element: <EventManagePage />,
  },
  {
    path: '/event/edit/:id',
    element: <EventEditPage />,
  },
]);

export default router;
