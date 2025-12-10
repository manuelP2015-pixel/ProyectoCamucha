import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, Package, ClipboardList, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../app/auth-provider';

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
  }`;

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
        <div className="px-2 py-3">
          <p className="text-xs uppercase text-slate-400 mb-1">Admin</p>
          <p className="text-lg font-semibold text-indigo-600">Minimarket</p>
          <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
        </div>
        <nav className="mt-6 space-y-1">
          <NavLink to="/admin" end className={linkClasses}>
            <LayoutGrid size={18} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClasses}>
            <Package size={18} />
            Productos
          </NavLink>
          <NavLink to="/admin/orders" className={linkClasses}>
            <ClipboardList size={18} />
            Pedidos
          </NavLink>
          <NavLink to="/admin/settings" className={linkClasses}>
            <Settings size={18} />
            Configuración
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between md:hidden">
          <span className="font-semibold text-slate-900">Panel Admin</span>
          <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
            <LogOut size={18} />
          </button>
        </div>
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

