import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Offers.css';

const Offers = () => {
    // Simulate offers by taking some products and discounting them
    const offerProducts = products.slice(0, 4).map(p => ({
        ...p,
        price: p.price * 0.9, // 10% discount
        originalPrice: p.price
    }));

    const combos = [
        {
            id: 101,
            name: "Pack Desayuno Familiar",
            price: 45.90,
            originalPrice: 55.00,
            image: "https://tofuu.getjusto.com/orioneat-local/resized2/zNKK2nCxF5AEJkGan-1000-x.webp",
            description: "Leche + Cereal + Café + Azúcar",
            category: "Combos"
        },
        {
            id: 102,
            name: "Pack Limpieza Total",
            price: 59.90,
            originalPrice: 75.00,
            // Imagen limpia y consistente para el pack
            image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80",
            description: "Detergente + Suavizante + Lejía",
            category: "Combos"
        }
    ];

    return (
        <div className="offers-page container section">
            <h1 className="section-title">Ofertas y Promociones</h1>

            <section className="mb-5">
                <h2 className="subsection-title">Combos de la Semana</h2>
                <div className="combos-grid">
                    {combos.map(combo => (
                        <div key={combo.id} className="combo-card">
                            <div className="combo-image">
                                <img src={combo.image} alt={combo.name} />
                                <span className="discount-badge">
                                    -{Math.round((1 - combo.price / combo.originalPrice) * 100)}%
                                </span>
                            </div>
                            <div className="combo-info">
                                <h3>{combo.name}</h3>
                                <p>{combo.description}</p>
                                <div className="price-box">
                                    <span className="original-price">S/ {combo.originalPrice.toFixed(2)}</span>
                                    <span className="final-price">S/ {combo.price.toFixed(2)}</span>
                                </div>
                                <button className="btn btn-primary btn-block">Ver Detalle</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="subsection-title">Productos con Descuento</h2>
                <div className="product-grid">
                    {offerProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Offers;
