import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const Category = lazy(() => import('src/pages/dashboard/Category/Category_List'));
const Classifications = lazy(() => import('src/pages/dashboard/Classifications'));
const Type = lazy(() => import('src/pages/dashboard/Types/Types_List'));
const Locations = lazy(() => import('src/pages/dashboard/Locations'));
const Employee = lazy(() => import('src/pages/dashboard/Employees'));
const AsssetRequest = lazy(() => import('src/pages/dashboard/Requests'));
// const Locations = lazy(() => import('src/pages/dashboard/

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'Category', element: <Category /> },
      { path: 'Types', element: <Type /> },
      { path: 'Classifications', element: <Classifications /> },
      { path: 'Locations', element: <Locations /> },
      { path: 'Employees', element: <Employee /> },
      { path: 'Employees', element: <Employee /> },
      { path: 'AssetRequest', element: <AsssetRequest /> },
    ],
  },
];
