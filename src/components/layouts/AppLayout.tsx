import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <header style={{ padding: '1rem', background: '#eee' }}>Header (Privado)</header>
      <main style={{ padding: '1rem' }}>
        {/* O Outlet é onde as rotas filhas (Dashboard, etc) são renderizadas */}
        <Outlet /> 
      </main>
    </div>
  );
};