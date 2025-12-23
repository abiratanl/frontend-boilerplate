import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = () => {
  const { signed, loading } = useAuth();

  // Enquanto verifica o token no storage, mostra loading
  if (loading) {
    return <div>Carregando sessão...</div>;
  }

  // Se logado -> Outlet. Se não -> Login
  return signed ? <Outlet /> : <Navigate to="/auth/login" replace />;
};