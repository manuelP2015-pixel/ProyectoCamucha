import React from 'react';

export default function About() {
  return (
    <div className="container section" style={{ paddingBottom: '60px' }}>
      <h1 className="section-title" style={{ marginBottom: '20px' }}>Nosotros</h1>
      <p style={{ lineHeight: 1.7, color: '#334155' }}>
        Somos Minimarket Camucha, tu tienda de confianza para el día a día. Nos enfocamos en precios justos,
        variedad y servicio cercano. Seleccionamos productos de abarrotes, lácteos, bebidas y limpieza con
        estándares de calidad, buscando siempre ofrecer una experiencia rápida y amigable.
      </p>
      <p style={{ lineHeight: 1.7, color: '#334155', marginTop: '14px' }}>
        Creemos en la cercanía con nuestros clientes y en la mejora continua. Si tienes sugerencias o deseas
        algún producto en específico, estaremos encantados de escucharte.
      </p>
    </div>
  );
}

