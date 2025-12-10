import React, { useEffect } from 'react';
import { useFetcher, Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../app/auth-provider';

export default function Cart() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const actionError = fetcher.data?.error;

  useEffect(() => {
    if (fetcher.data?.success) {
      clearCart();
    }
  }, [fetcher.data, clearCart]);

  if (fetcher.data?.success) {
    return (
      <div className="text-center py-16">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-green-600">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">¡Pedido recibido!</h2>
        <p className="text-slate-500 mt-2">Tu orden se ha generado correctamente.</p>
        <Link to="/catalog" className="mt-6 inline-block text-indigo-600 font-medium hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="p-8 text-center text-slate-500">Tu carrito está vacío.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Tu Carrito</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0">
            <div>
              <h3 className="font-medium text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-500">
                Cantidad: {item.quantity} x S/ {item.price}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 bg-slate-50 flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
      </div>

      {actionError && <p className="text-sm text-red-600">{actionError}</p>}

      <fetcher.Form method="post">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <input type="hidden" name="total" value={total} />
        <input type="hidden" name="email" value={user?.email || ''} />
        <button
          type="submit"
          disabled={isSubmitting || !user}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg shadow-md disabled:opacity-50 transition-all"
        >
          {!user ? 'Inicia sesión para confirmar' : isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </fetcher.Form>

      {!user && (
        <div className="text-sm text-slate-600">
          ¿Aún no tienes cuenta? <Link to="/login" className="text-indigo-600 font-semibold">Inicia sesión o regístrate</Link>
        </div>
      )}
    </div>
  );
}

