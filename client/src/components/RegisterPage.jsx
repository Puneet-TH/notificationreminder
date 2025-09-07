import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
  const res = await authService.signup({ email, password, fullName: name });
      setSuccess('Registration successful! Redirecting to login...');
      setEmail('');
      setPassword('');
      setName('');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-lg px-8 py-10 max-w-md w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-lime-900 text-center">Register</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="first and last name"
          className="px-4 py-3 rounded-lg border-2 border-lime-400 focus:outline-none focus:border-lime-700 text-lg"
          required
        />
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
        {success && <div className="text-green-600 text-center">{success}</div>}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-lime-700 text-white font-semibold rounded-full shadow-lg hover:bg-lime-800 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
