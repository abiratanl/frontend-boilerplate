import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout Imports
import { AppLayout } from '../components/layouts/AppLayout';
import { AuthLayout } from '../components/layouts/AuthLayout';

// Security Guard Import
import { PrivateRoute } from '../components/PrivateRoute';

// Lazy Loading Pages
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
// Ajuste o nome do import se sua pasta for 'Client' no singular ou 'Clients' no plural
const ClientPage = lazy(() => import('../pages/Clients')); 
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Home = lazy(() => import('../pages/Home')); // Landing Page Pública
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Rentals = lazy(() => import('../pages/Rentals'));
const Users = lazy(() => import('../pages/Users')); 

// Simple Loading Component
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="animate-pulse text-blue-600 font-semibold">Carregando...</div>
  </div>
);

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTE (LANDING PAGE)
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
    // GUARDA DE NÍVEL 1: Verifica apenas se está logado
    element: <PrivateRoute />, 
    children: [
      {
        // LAYOUT: Menu Lateral e Topbar aparecem aqui
        element: <AppLayout />, 
        children: [
          
          // --- ÁREA DE GESTÃO (Admin e Proprietário) ---
          {
            element: <PrivateRoute allowedRoles={['admin', 'proprietario']} />,
            children: [
              {
                path: "/dashboard", 
                element: (
                  <Suspense fallback={<Loading />}>
                    <Dashboard />
                  </Suspense>
                )
              }
            ]
          },

          // --- ÁREA ADMINISTRATIVA (Só Admin) ---
          {
            element: <PrivateRoute allowedRoles={['admin']} />,
            children: [
              {
                path: "/users", 
                element: (
                  <Suspense fallback={<Loading />}>
                    <Users />
                  </Suspense>
                )
              }
            ]
          },

          // --- ÁREA OPERACIONAL (Admin, Proprietário e Atendente) ---
          {
            element: <PrivateRoute allowedRoles={['admin', 'proprietario', 'atendente']} />,
            children: [
              {
                path: "/rentals", 
                element: (
                  <Suspense fallback={<Loading />}>
                    <Rentals />
                  </Suspense>
                )
              }
            ]
          },

          // --- ÁREA DO CLIENTE (Só Cliente) ---
          {
            element: <PrivateRoute allowedRoles={['cliente']} />,
            children: [
              {
                path: "/client-area", 
                element: (
                  <Suspense fallback={<Loading />}>
                    <ClientPage />
                  </Suspense>
                )
              }
            ]
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