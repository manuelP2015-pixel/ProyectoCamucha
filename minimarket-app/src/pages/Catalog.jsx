import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Catalog.css';
import { listProducts, getCategories } from '../services/products-service';

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [priceRange, setPriceRange] = useState(100);

    const searchTerm = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category');

    useEffect(() => {
        listProducts().then((items) => {
            setProducts(items);
            setFilteredProducts(items);
        });
    }, []);

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        let result = products;

        if (activeCategory !== 'Todos') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);
    }, [activeCategory, searchTerm, priceRange, products]);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setSearchParams(prev => {
            if (cat === 'Todos') {
                prev.delete('category');
            } else {
                prev.set('category', cat);
            }
            return prev;
        });
    };

    return (
        <div className="catalog-page container section">
            <div className="catalog-layout">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Categorías</h3>
                        <ul className="category-list">
                            {getCategories().map(cat => (
                                <li
                                    key={cat}
                                    className={activeCategory === cat ? 'active' : ''}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h3>Precio Máximo: S/ {priceRange}</h3>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="price-range"
                        />
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="catalog-content">
                    <div className="catalog-header">
                        <h2>
                            {searchTerm ? `Resultados para "${searchTerm}"` : activeCategory}
                        </h2>
                        <p>{filteredProducts.length} productos encontrados</p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No se encontraron productos con estos filtros.</p>
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setActiveCategory('Todos');
                                    setPriceRange(100);
                                    setSearchParams({});
                                }}
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
