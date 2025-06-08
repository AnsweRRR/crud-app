import { Suspense, lazy, type ElementType } from 'react';
// import LoadingScreen from '../components/loading-screen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) =>
  (
    // <Suspense fallback={<LoadingScreen />}>
    <Suspense fallback={<span>Töltés...</span>}>
      <Component {...props} />
    </Suspense>
  );

// AUTH
// export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
// export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
// export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
// export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
// export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

export const UsersPage = Loadable(lazy(() => import('../pages/maintenance/UsersPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/maintenance/MaintenancePage')));

export const Page403 = Loadable(lazy(() => import('../pages/error/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/error/Page404')));
export const Page500 = Loadable(lazy(() => import('../pages/error/Page500')));