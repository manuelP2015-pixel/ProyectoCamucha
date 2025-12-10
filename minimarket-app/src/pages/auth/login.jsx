import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/auth-provider';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@demo.com', password: 'admin123' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(form);
    navigate(user.role === 'admin' ? '/admin' : '/catalog', { replace: true });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Iniciar sesión</h1>
      <p className="text-sm text-slate-500 mb-6">Accede al panel o a la tienda según tu rol.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="correo@demo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Contraseña</label>
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
        </div>
        {error && (
          <>
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-sm text-slate-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-indigo-600 font-semibold">Regístrate aquí</Link>
            </p>
          </>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-indigo-600 font-semibold">
          Regístrate
        </Link>
      </p>
    </div>
  );
}

