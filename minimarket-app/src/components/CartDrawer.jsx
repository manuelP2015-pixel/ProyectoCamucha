import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <div className="cart-overlay" onClick={toggleCart}>
            <div className="cart-drawer" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="close-cart" onClick={toggleCart}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={48} />
                            <p>Tu carrito está vacío</p>
                            <button className="btn btn-primary" onClick={toggleCart}>
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">S/ {item.price.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="remove-item"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>S/ {getCartTotal().toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary btn-block" onClick={handleCheckout}>
                            Procesar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
