import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <header style={{ padding: '1rem', background: '#eee' }}>Header (Privado)</header>
      <main style={{ padding: '1rem' }}>
        {/* The Outlet is where the child routes (Dashboard, etc.) are rendered. */}
        <Outlet /> 
      </main>
    </div>
  );
};