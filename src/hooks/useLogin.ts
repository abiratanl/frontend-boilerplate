import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export function useLogin() {
    const navigate = useNavigate();
    
    // State management for form inputs and UI status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Send login request to the API
            const response = await api.post('/auth/login', { email, password });
            
            // 2. Extract Token and User data from response
            // Adjust 'response.data.data.user' vs 'response.data.user' based on your exact API return
            const { token, data } = response.data; 
            const user = data?.user || data; 

            // 3. Persist session data in LocalStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 4. Smart Redirection based on User Role 🔀
            switch (user.role) {
                case 'admin':
                    // System Admin -> Control Panel (User Management / Settings)
                    console.log("Admin logged in. Redirecting to User Management.");
                    navigate('/users'); 
                    break;
                
                case 'proprietario':
                    // Business Owner -> Managerial Dashboard (Charts/Stats)
                    console.log("Owner logged in. Redirecting to Dashboard.");
                    navigate('/dashboard'); 
                    break;
                
                case 'atendente':
                    // Sales Attendant -> POS / Rental Page (Operational focus)
                    console.log("Attendant logged in. Redirecting to Rentals.");
                    navigate('/rentals'); 
                    break;

                default:
                    // Fallback for unknown roles
                    navigate('/dashboard');
            }

        } catch (err: any) {
            console.error("Login Error:", err);
            const msg = err.response?.data?.message || 'Failed to connect to the server.';
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