export const ordersMock = [
  {
    id: 501,
    customer: 'Carlos Gómez',
    clientEmail: 'carlos@example.com',
    date: '2025-06-01',
    total: 120.5,
    status: 'pending',
    items: [
      { id: 1, name: 'Arroz Premium 5kg', quantity: 2, price: 24.9 },
      { id: 2, name: 'Aceite de Girasol 1L', quantity: 1, price: 12.5 }
    ]
  },
  {
    id: 502,
    customer: 'María Pérez',
    clientEmail: 'maria@example.com',
    date: '2025-06-02',
    total: 89.9,
    status: 'completed',
    items: [{ id: 3, name: 'Leche Entera 1L', quantity: 10, price: 4.5 }]
  },
  {
    id: 503,
    customer: 'Luis Fernández',
    clientEmail: 'luis@example.com',
    date: '2025-06-03',
    total: 45.2,
    status: 'pending',
    items: [{ id: 4, name: 'Café Molido 250g', quantity: 2, price: 18.9 }]
  },
  {
    id: 504,
    customer: 'Ana Torres',
    clientEmail: 'ana@example.com',
    date: '2025-06-04',
    total: 210.75,
    status: 'completed',
    items: [
      { id: 5, name: 'Detergente Líquido 2L', quantity: 5, price: 16.9 },
      { id: 2, name: 'Aceite de Girasol 1L', quantity: 3, price: 12.5 }
    ]
  }
];

