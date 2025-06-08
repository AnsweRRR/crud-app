import { Navigate, useRoutes } from 'react-router-dom';
import {
  Page403,
  Page404,
  Page500,
  UsersPage
} from './elements';

export default function Router() {
  return useRoutes([

    // Maintenance
    {
      path: 'maintenance',
      element: (
        <>
          
        </>
      ),
      children: [
        { path: 'user', element: <UsersPage /> },
      ]
    },
    {
      element: <></>,
      children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
        { path: '500', element: <Page500 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};