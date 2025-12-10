import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/auth-provider';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register({ ...form, role: 'client' });
    navigate('/catalog', { replace: true });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Crear cuenta</h1>
      <p className="text-sm text-slate-500 mb-6">Únete a Minimarket Camucha.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tu nombre"
          />
        </div>
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
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? 'Creando...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="text-sm text-slate-500 mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-indigo-600 font-semibold">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

