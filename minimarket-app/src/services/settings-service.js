const SETTINGS_KEY = 'minimarket_settings';

const defaultSettings = {
  storeName: 'Minimarket Camucha',
  logoUrl: '/logo.png',
  tagline: 'Tu tienda de confianza con los mejores productos y precios',
  contact: {
    address: 'Av. Principal 123, Lima',
    phone: '(01) 123-4567',
    whatsapp: '999 888 777',
    email: 'contacto@camucha.com'
  },
  schedule: {
    weekday: 'Lun - Sab: 7:00 AM - 10:00 PM',
    sunday: 'Dom: 8:00 AM - 8:00 PM'
  },
  payments: {
    yape: {
      number: '930238631',
      qr: ''
    },
    plin: {
      number: '930238631',
      qr: ''
    },
    tarjeta: {
      account: 'Cuenta: 123-4567890-00',
      cci: 'CCI: 123-456-789-000'
    },
    contraentrega: {
      note: 'Pago contra entrega en tienda o al repartidor.'
    }
  },
  footerLinks: [
    { label: 'Nosotros', href: '#' },
    { label: 'Términos y Condiciones', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Libro de Reclamaciones', href: '#' }
  ]
};

export function getSettings() {
  if (typeof localStorage === 'undefined') return defaultSettings;
  const raw = localStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : defaultSettings;
}

export function updateSettings(patch) {
  const current = getSettings();
  const merged = { ...current, ...patch, contact: { ...current.contact, ...patch.contact }, schedule: { ...current.schedule, ...patch.schedule } };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
  }
  return merged;
}

