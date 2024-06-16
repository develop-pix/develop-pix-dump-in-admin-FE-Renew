/* eslint-disable import/no-cycle */
import { createBrowserRouter } from 'react-router-dom';
import {
  AlarmPage,
  DashboardPage,
  EventEditPage,
  EventManagePage,
  LoginPage,
  UserManagePage,
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
    path: '/user',
    element: <UserManagePage />,
  },
  {
    path: '/alarm',
    element: <AlarmPage />,
  },
]);

export default router;
