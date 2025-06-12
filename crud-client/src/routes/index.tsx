import { Navigate, useRoutes } from 'react-router-dom';
import {
  Page403,
  Page404,
  Page500,
  UsersPage,
  MaintenancePage,
  HomePage
} from './elements';
import { Layout } from '../components/layout';

export default function Router() {
  return useRoutes([
    // Main layout routes
    {
      element: <Layout />,
      children: [
        // Home
        { path: '/', element: <HomePage /> },
        // Maintenance
        {
          path: 'maintenance',
          children: [
            { index: true, element: <MaintenancePage /> },
            { path: 'user', element: <UsersPage /> },
          ]
        },
      ]
    },
    // Error pages
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
    // Catch all route
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}