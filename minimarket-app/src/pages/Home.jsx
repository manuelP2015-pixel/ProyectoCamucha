import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './Home.css';
import { listProducts } from '../services/products-service';
import { useSettings } from '../app/settings-provider';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const { settings } = useSettings();
    const banners = [
        '/banners/banner1.png',
        '/banners/banner2.jpg',
        '/banners/banner3.png'
    ];

    useEffect(() => {
        listProducts().then(setProducts);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="home-page">
            {/* Hero Carousel */}
            <section className="hero-carousel">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className="carousel-slide"
                            style={{ backgroundImage: `url(${banner})` }}
                        >
                            <div className="carousel-overlay">
                                <div className="container hero-content">
                                    <h1 className="animate-fade-in">Ofertas Frescas Todos los Días</h1>
                                    <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                        {settings.tagline || 'Encuentra todo lo que necesitas para tu hogar en Minimarket Camucha.'}
                                    </p>
                                    <Link to="/catalog" className="btn btn-primary animate-fade-in" style={{ animationDelay: '0.4s' }}>
                                        Comprar Ahora <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carousel-dots">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container section">
                <h2 className="section-title">Productos Destacados</h2>
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: '40px' }}>
                    <Link to="/catalog" className="btn btn-outline">
                        Ver Todo el Catálogo
                    </Link>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="bg-light section">
                <div className="container">
                    <h2 className="section-title">Nuestras Categorías</h2>
                    <div className="categories-grid">
                        <Link to="/catalog?category=Abarrotes" className="category-card">
                            <img src="https://www.paginasamarillas.com.pe/_next/image?url=https%3A%2F%2Fwww.paginasamarillas.com.pe%2Fimagenes%2Fpe%2Fimages%2Fad_id_6061%2Fimage_id_81414.jpeg&w=3840&q=75" alt="Abarrotes" />
                            <h3>Abarrotes</h3>
                        </Link>
                        <Link to="/catalog?category=Bebidas" className="category-card">
                            <img src="https://balbuena.app/wp-content/uploads/2023/05/Refrescos.png" alt="Bebidas" />
                            <h3>Bebidas</h3>
                        </Link>
                        <Link to="/catalog?category=Limpieza" className="category-card">
                            <img src="https://imagenagropecuaria.com/wp-content/uploads/2020/04/desinfectantes.jpg" alt="Limpieza" />
                            <h3>Limpieza</h3>
                        </Link>
                        <Link to="/catalog?category=Snacks" className="category-card">
                            <img src="https://www.2foodtrippers.com/wp-content/uploads/2023/02/American-Snacks.jpg" alt="Snacks" />
                            <h3>Snacks</h3>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
