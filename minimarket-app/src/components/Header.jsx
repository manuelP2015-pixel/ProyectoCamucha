import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, UserRound } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../app/settings-provider';
import { useAuth } from '../app/auth-provider';
import './Header.css';

const Header = () => {
    const { getCartCount, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { settings } = useSettings();
    const { user } = useAuth();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo-container">
                    <img src={settings.logoUrl || '/logo.png'} alt={settings.storeName} className="logo-img" />
                    <span className="logo-text">{settings.storeName}</span>
                </Link>

                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <Search size={20} />
                    </button>
                </form>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                    <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Catálogo</Link>
                    <Link to="/offers" onClick={() => setIsMenuOpen(false)}>Ofertas</Link>
                    <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </nav>

                <div className="header-actions">
                    {user ? (
                        <Link
                            to={user.role === 'admin' ? '/admin' : '/my-orders'}
                            className="user-btn"
                            title="Ver perfil/pedidos"
                        >
                            <UserRound size={22} />
                            <span className="user-label">{user.name || 'Perfil'}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="user-btn" title="Iniciar sesión / Registrarse">
                            <UserRound size={22} />
                            <span className="user-label">Ingresar</span>
                        </Link>
                    )}
                    <button className="cart-btn" onClick={toggleCart}>
                        <ShoppingCart size={24} />
                        <span className="cart-count">{getCartCount()}</span>
                    </button>
                    <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
