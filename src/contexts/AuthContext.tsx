import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// A resposta do login pode ser Sucesso ou Pedir Troca de Senha
interface LoginResult {
  success: boolean;
  mustChangePassword?: boolean;
  tempToken?: string;
}

interface AuthContextType {
  signed: boolean;
  user: User | null;
  // O signIn agora retorna algo para a tela de Login saber se redireciona
  signIn: (email: string, password: string) => Promise<LoginResult>; 
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedToken = localStorage.getItem('@App:token');
      const storagedUser = localStorage.getItem('@App:user');

      if (storagedToken && storagedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string): Promise<LoginResult> {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      // CAMINHO FELIZ (HTTP 200)
      // O backend manda: { status: 'success', token, data: { user } }
      const { token } = response.data;
      const { user } = response.data.data;

      localStorage.setItem('@App:token', token);
      localStorage.setItem('@App:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      return { success: true };

    } catch (error: any) {
      // TRATAMENTO DO PEDÁGIO (Troca de Senha - HTTP 403)
      if (error.response && error.response.status === 403) {
        const { code, token } = error.response.data;

        if (code === 'PASSWORD_CHANGE_REQUIRED') {
          // Retornamos isso para o componente de Login redirecionar o usuário
          // NÃO salvamos no storage persistente ainda, pois ele não está "logado" full
          return { 
            success: false, 
            mustChangePassword: true,
            tempToken: token // Precisamos disso para autorizar a troca
          };
        }
      }

      // Outros erros (senha errada, servidor fora, etc)
      console.error("Erro ao logar:", error);
      throw error; 
    }
  }

  function signOut() {
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    api.defaults.headers.common['Authorization'] = undefined;
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}