import React from 'react';

export default function Privacy() {
  return (
    <div className="container section" style={{ paddingBottom: '60px' }}>
      <h1 className="section-title" style={{ marginBottom: '20px' }}>Política de Privacidad</h1>
      <p style={{ lineHeight: 1.7, color: '#334155' }}>
        Protegemos tu información personal. Solo usamos tus datos para procesar pedidos,
        contactar sobre tu compra y enviarte comunicaciones relevantes si lo autorizas.
        No vendemos ni compartimos tu información con terceros ajenos al servicio.
      </p>
      <p style={{ lineHeight: 1.7, color: '#334155', marginTop: '14px' }}>
        Puedes solicitar la corrección o eliminación de tus datos escribiendo a contacto@camucha.com.
      </p>
    </div>
  );
}

