
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { login } from '../store/auth';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login(email, password);
      if (res.data && res.data.data && res.data.data.accessToken) {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        dispatch(login({ jsonData: res.data.data.user }));
        navigate('/');
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-lg px-8 py-10 max-w-md w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-lime-900 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-3 rounded-lg border-2 border-lime-400 focus:outline-none focus:border-lime-700 text-lg"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-3 rounded-lg border-2 border-lime-400 focus:outline-none focus:border-lime-700 text-lg"
          required
        />
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-lime-700 text-white font-semibold rounded-full shadow-lg hover:bg-lime-800 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
