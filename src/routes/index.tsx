import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout Imports
import { AppLayout } from '../components/layouts/AppLayout';
import { AuthLayout } from '../components/layouts/AuthLayout';

// Security Guard Import
import { PrivateRoute } from '../components/PrivateRoute';

// Lazy Loading Pages (Code Splitting)
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Clients = lazy(() => import('../pages/Clients'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Rentals = lazy(() => import('../pages/Rentals'));
const Users = lazy(() => import('../pages/Users')); 



// Simple Loading Component
const Loading = () => <div style={{ padding: 20 }}>Loading...</div>;

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTE (ROOT)
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    )
  },

  // 2. AUTHENTICATION ROUTES
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
  {
    element: <PrivateRoute />, 
    children: [
      {
        element: <AppLayout />, 
        children: [
          {
            path: "/dashboard", 
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            )
          },          
          {
            path: "/users", 
            element: (
              <Suspense fallback={<Loading />}>
                <Users />
              </Suspense>
            )
          },
          // Attendant Rental Page (NEW)
          {
            path: "/rentals", 
            element: (
              <Suspense fallback={<Loading />}>
                <Rentals />
              </Suspense>
            )
          },
          // Client (NEW)
          {
            path: "/client-area", 
            element: (
              <Suspense fallback={<Loading />}>
                <Clients/>
              </Suspense>
            )
          }                  
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