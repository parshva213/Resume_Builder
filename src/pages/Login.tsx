import React, { useState } from 'react';
import { authAPI } from '../utils/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        // Redirect to home page
        window.location.href = '/';
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md card-3d p-6">
        <h1 className="text-2xl font-bold mb-1 text-gradient">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to continue</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="input-3d w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="input-3d w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit"
            className="w-full button-3d gradient-primary text-white py-2 rounded-lg font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          New here? <a className="underline" href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


