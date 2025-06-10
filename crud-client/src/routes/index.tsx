import { Navigate, useRoutes } from 'react-router-dom';
import {
  Page403,
  Page404,
  Page500,
  UsersPage,
  MaintenancePage
} from './elements';

export default function Router() {
  return useRoutes([
    // Maintenance
    {
      path: 'maintenance',
      children: [
        { index: true, element: <MaintenancePage /> },
        { path: 'user', element: <UsersPage /> },
      ]
    },
    // Error pages
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}