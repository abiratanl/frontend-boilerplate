import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Importação dos Layouts
import { AppLayout } from '../components/layouts/AppLayout';
import { AuthLayout } from '../components/layouts/AuthLayout';

// Lazy Loading das Páginas (Code Splitting)
// Note que agora importamos a Home também
const Home = lazy(() => import('../pages/Home')); 
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Componente de Loading simples
const Loading = () => <div style={{ padding: 20 }}>Carregando...</div>;

export const router = createBrowserRouter([
  // 1. ROTA PÚBLICA (RAIZ)
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    )
  },

  // 2. ROTAS DE AUTENTICAÇÃO (Login, Recuperar Senha, etc)
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
      }
    ]
  },

  // 3. ROTAS PRIVADAS DO SISTEMA (Dashboard, Clientes, etc)
  {
    // Não definimos "path" aqui, apenas o elemento Layout.
    // Isso cria um "Layout Wrapper" para as rotas filhas.
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard", // O caminho final será apenas /dashboard
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        )
      }
      // Outras rotas do sistema virão aqui
    ]
  },

  // 4. ROTA 404 (Catch-all)
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    )
  }
]);