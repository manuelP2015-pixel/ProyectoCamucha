import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Store, Menu, LogIn } from 'lucide-react';
import { useAuth } from '../app/auth-provider';

export default function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
    }`;

  const isLogged = Boolean(user);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/catalog" className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Store className="text-indigo-600" />
                Minimarket
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/catalog" className={navLinkClass}>
                Catálogo
              </NavLink>
              <NavLink to="/my-orders" className={navLinkClass}>
                Mis Pedidos
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                <ShoppingBag size={20} />
                <span>Carrito</span>
              </NavLink>
              <div className="h-6 w-px bg-slate-200 mx-2" />
              {isLogged ? (
                <div className="flex items-center gap-3 pl-2">
                  <span className="text-sm font-medium text-slate-700">Hola, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-2">
                  <Link to="/login" className="text-sm text-indigo-600 font-semibold flex items-center gap-1">
                    <LogIn size={16} />
                    Iniciar sesión
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-2">
            <NavLink to="/catalog" className="block py-2 text-slate-600">
              Catálogo
            </NavLink>
            <NavLink to="/cart" className="block py-2 text-slate-600">
              Carrito
            </NavLink>
            <NavLink to="/my-orders" className="block py-2 text-slate-600">
              Mis Pedidos
            </NavLink>
            {isLogged ? (
              <button onClick={handleLogout} className="w-full text-left py-2 text-red-600">
                Cerrar Sesión
              </button>
            ) : (
              <Link to="/login" className="block py-2 text-indigo-600 font-semibold">
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

