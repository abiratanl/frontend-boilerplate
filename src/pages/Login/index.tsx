// src/pages/Login/index.tsx
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  // Extracting only necessary values and functions from the custom hook
  const { 
    email, setEmail, 
    password, setPassword, 
    loading, error, 
    handleSubmit 
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          Acesso ao Sistema
        </h2>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            {/* 'htmlFor' must match the input 'id' for accessibility and testing */}
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email" 
              type="email"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white font-bold transition-colors
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  );
}