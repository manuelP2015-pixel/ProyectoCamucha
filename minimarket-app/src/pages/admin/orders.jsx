import React from 'react';
import { useLoaderData, useFetcher } from 'react-router-dom';
import { getOrders } from '../../services/orders-service';
import { CheckCircle, Clock, Eye } from 'lucide-react';

export async function loader() {
  return await getOrders();
}

const badge = (status) => {
  const map = {
    pending: 'bg-amber-100 text-amber-700',
    verificacion: 'bg-amber-100 text-amber-700',
    confirmado: 'bg-emerald-100 text-emerald-700',
    recojo: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700'
  };
  return map[status] || 'bg-slate-100 text-slate-600';
};

export default function OrdersAdmin() {
  const orders = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Gestión de Pedidos</h1>

      <div className="grid gap-4">
        {orders.length === 0 && <p className="text-slate-500">No hay pedidos registrados.</p>}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{order.id}</span>
                <span className="text-sm text-slate-500">{order.date}</span>
                <span className="text-sm font-medium text-slate-900">• {order.clientEmail || order.customer}</span>
              </div>
              <div className="text-sm text-slate-600">
                {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
              </div>
              <div className="font-bold text-indigo-600 mt-1">Total: S/ {order.total}</div>
              {order.paymentMethod && <div className="text-xs text-slate-500 mt-1">Pago: {order.paymentMethod}</div>}
              {order.paymentRef && <div className="text-xs text-slate-500">Ref: {order.paymentRef}</div>}
              {order.paymentProof && (
                <div className="mt-1 space-y-1">
                  <a
                    href={order.paymentProof}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 inline-flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Ver comprobante
                  </a>
                  {order.paymentProof.startsWith('data:image') && (
                    <img
                      src={order.paymentProof}
                      alt="Comprobante"
                      className="w-40 rounded border border-slate-200"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  order.status === 'confirmado' || order.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'recojo'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-orange-100 text-orange-700'
                }`}
              >
                {order.status === 'confirmado' || order.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                {order.status}
              </span>

              <fetcher.Form method="post" className="flex gap-2">
                <input type="hidden" name="orderId" value={order.id} />
                <select
                  name="status"
                  defaultValue={order.status}
                  className="border border-slate-200 rounded-lg px-2 py-1 text-sm"
                >
                  <option value="verificacion">Verificación</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="recojo">Recojo</option>
                  <option value="completed">Completado</option>
                </select>
                <button
                  type="submit"
                  className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                >
                  Actualizar
                </button>
              </fetcher.Form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
