import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout Imports
import { AppLayout } from '../components/layouts/AppLayout';
import { AuthLayout } from '../components/layouts/AuthLayout';

// Security Guard Import
import { PrivateRoute } from '../components/PrivateRoute';

// Lazy Loading Pages (Code Splitting)
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const ChangePassword = lazy(() => import('../pages/ChangePassword')); // New addition
const NotFound = lazy(() => import('../pages/NotFound'));

// Simple Loading Component
const Loading = () => <div style={{ padding: 20 }}>Loading...</div>;

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTE (ROOT)
  // Landing Page showing the company info
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    )
  },

  // 2. AUTHENTICATION ROUTES
  // Uses AuthLayout (Clean centered layout)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangePassword />
          </Suspense>
        )
      }
    ]
  },

  // 3. PRIVATE SYSTEM ROUTES
  // These routes require the user to be logged in.
  {
    // The Guard checks if the user has a valid session
    element: <PrivateRoute />, 
    children: [
      {
        // If passed the Guard, render the Main App Layout (Sidebar/Header)
        element: <AppLayout />, 
        children: [
          {
            path: "/dashboard", 
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            )
          }
          // Future protected routes go here (e.g., /products, /rentals)
        ]
      }
    ]
  },

  // 4. 404 CATCH-ALL
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    )
  }
]);