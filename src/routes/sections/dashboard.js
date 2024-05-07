import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import IndexPage from 'src/pages/dashboard/one';
import Category from 'src/pages/dashboard/Category/Category_List';
import Classifications from 'src/pages/dashboard/Classifications';
import Type from 'src/pages/dashboard/Types/Types_List';
import Locations from 'src/pages/dashboard/Locations';
import Employee from 'src/pages/dashboard/Employees';
import AsssetRequest from 'src/pages/dashboard/Requests';
import AdhocAssetRequests from 'src/pages/dashboard/Adhoc';

// ----------------------------------------------------------------------

// const IndexPage = import('src/pages/dashboard/one');
// const Category = import('src/pages/dashboard/Category/Category_List');
// const Classifications = import('src/pages/dashboard/Classifications');
// const Type = import('src/pages/dashboard/Types/Types_List');
// const Locations = import('src/pages/dashboard/Locations');
// const Employee = import('src/pages/dashboard/Employees');
// const AsssetRequest = import('src/pages/dashboard/Requests');
// const AdhocAssetRequests = import('src/pages/dashboard/Adhoc');
// const Locations = lazy(() => import('src/pages/dashboard/

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          {/* <Suspense fallback={<LoadingScreen />}> */}
          <Outlet />
          {/* </Suspense> */}
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
      { path: 'Adhoc_Asset_Request', element: <AdhocAssetRequests /> },
    ],
  },
];
