import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.stock <= 5 && product.stock > 0 && (
                    <span className="badge badge-warning">¡Pocos en stock!</span>
                )}
                {product.stock === 0 && (
                    <span className="badge badge-danger">Agotado</span>
                )}
            </div>

            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">S/ {product.price.toFixed(2)}</p>

                <button
                    className={`btn ${isAdded ? 'btn-success' : 'btn-primary'} btn-block`}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {isAdded ? (
                        <>
                            <Check size={18} />
                            Agregado
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={18} />
                            Agregar
                        </>
                    )}
                </button>
            </div>

            {isAdded && (
                <div className="added-animation">
                    <Check size={24} />
                    <span>Producto agregado</span>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
