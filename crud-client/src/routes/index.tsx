import { useRoutes } from 'react-router-dom';
import {
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
    }
  ]);
};