import React from 'react';

export default function Terms() {
  return (
    <div className="container section" style={{ paddingBottom: '60px' }}>
      <h1 className="section-title" style={{ marginBottom: '20px' }}>Términos y Condiciones</h1>
      <ul style={{ lineHeight: 1.7, color: '#334155', paddingLeft: '18px', listStyle: 'disc' }}>
        <li>Los precios y promociones pueden variar sin previo aviso.</li>
        <li>Los pedidos están sujetos a disponibilidad de stock.</li>
        <li>Datos personales se usan solo para procesar pedidos y comunicaciones.</li>
        <li>Para cambios o devoluciones, contáctanos dentro de las 24 horas.</li>
      </ul>
      <p style={{ lineHeight: 1.7, color: '#334155', marginTop: '14px' }}>
        Si tienes consultas adicionales, escríbenos a contacto@camucha.com.
      </p>
    </div>
  );
}

