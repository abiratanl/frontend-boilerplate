import axios from 'axios';

// Cria a instância do Axios com a URL base definida no .env ou docker-compose
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` // Se a URL vier sem /api, adicionamos
    : 'http://localhost:3000/api',          // Fallback local
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor de Requisição ---
// Antes de enviar qualquer pedido, verificamos se tem token salvo e anexamos
api.interceptors.request.use(
  (config) => {
    // Atenção: Verifique se no seu Login você salvou como 'token' ou 'auth_token'
    // Baseado no seu código anterior, o padrão costuma ser 'token'
    const token = localStorage.getItem('token'); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Interceptor de Resposta (Opcional, mas recomendado) ---
// Se o backend devolver erro 401 (Token Inválido/Expirado), deslogamos o usuário
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Evita loop infinito se o erro for na própria rota de login
      if (!window.location.pathname.includes('/auth/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redireciona forçado para login
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;