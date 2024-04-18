/* eslint-disable import/no-cycle */
import { createBrowserRouter } from 'react-router-dom';
import {
  DashboardPage,
  EventEditPage,
  EventManagePage,
  LoginPage,
  UsersPage,
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
  {
    path: '/users',
    element: <UsersPage />,
  },
]);

export default router;
