// src/pages/Home/index.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      textAlign: 'center', 
      padding: '50px 20px' 
    }}>
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Minha Loja de Roupas</h1>
        <p style={{ color: '#666' }}>O melhor estilo para você (Página Pública)</p>
      </header>

      <main>
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '30px', 
          borderRadius: '8px', 
          maxWidth: '400px', 
          margin: '0 auto' 
        }}>
          <h3>Área do Cliente</h3>
          <p>Acesse o sistema para gerenciar seus aluguéis.</p>
          
          <br />
          
          {/* Link que leva para a rota de Login definida no router */}
          <Link to="/auth/login" style={{ 
            display: 'inline-block',
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Entrar no Sistema
          </Link>
        </div>
      </main>
      
      <footer style={{ marginTop: '50px', color: '#999', fontSize: '0.8rem' }}>
        &copy; 2025 Empresa. Todos os direitos reservados.
      </footer>
    </div>
  );
}