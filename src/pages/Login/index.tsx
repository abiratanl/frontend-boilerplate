import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await signIn(email, password);

      if (result.success) {
        // 1. Login normal -> Dashboard
        navigate('/dashboard');
      } else if (result.mustChangePassword) {
        // 2. Precisa trocar senha -> Tela de Troca
        // Passamos o token temporário via 'state' do router para não expor na URL
        navigate('/auth/change-password', { 
          state: { tempToken: result.tempToken } 
        });
      }

    } catch (error: any) {
      // 3. Erro comum (senha errada)
      console.log(error);
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Erro ao conectar ao servidor.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Acessar Sistema</h2>
      
      {errorMsg && (
        <div style={{ color: 'red', marginBottom: '10px', background: '#ffe6e6', padding: '10px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}