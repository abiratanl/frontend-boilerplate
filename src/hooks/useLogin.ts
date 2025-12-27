import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export function useLogin() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            
            // --- DEBUG: See this in the Chrome Console (F12) ---
            console.log("🔥 Resposta Bruta da API:", response.data);

            const responseBody = response.data;

            // 1. Robust Token and User Extraction
            // Try retrieving it directly from the root OR from within a 'data' property.
            const token = responseBody.token || responseBody.data?.token;
            
            let user = responseBody.user;
            if (!user && responseBody.data) {
                user = responseBody.data.user || responseBody.data;
            }

            if (!user || !token) {
                throw new Error("Formato de resposta da API inválido ou credenciais incorretas.");
            }

            console.log("✅ Usuário identificado:", user.role);

            // 2. Persistence
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 3. Update default Axios header (Important for future calls)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 4. Redirection
            switch (user.role) {
                case 'admin':
                    navigate('/users'); 
                    break;
                
                case 'proprietario':
                    navigate('/dashboard'); 
                    break;
                
                case 'atendente':
                    navigate('/rentals'); 
                    break;

                case 'cliente':
                     navigate('/client-area'); 
                     break;

                default:
                    console.warn("⚠️ Role desconhecida, redirecionando para home");
                    navigate('/Home');
            }

        } catch (err: any) {
            console.error("❌ Erro no Login:", err);
            // If it's a JS (parsing) error, it shows a generic message. If it's an API error, it shows the backend message.
            const msg = err.response?.data?.message || err.message || 'Falha ao conectar com o servidor.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading, error,
        handleSubmit
    };
}