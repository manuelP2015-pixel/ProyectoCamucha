import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../app/auth-provider';
import { listOrders } from '../../services/orders-service';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const STATUS_FLOW = ['verificacion', 'confirmado', 'recojo', 'completed'];
const statusLabel = {
  verificacion: 'En verificación',
  confirmado: 'Confirmado',
  recojo: 'Listo para recojo',
  completed: 'Completado',
  pending: 'Pendiente'
};

function Timeline({ status }) {
  const current = STATUS_FLOW.indexOf(status);
  return (
    <div className="flex items-center gap-3">
      {STATUS_FLOW.map((st, idx) => {
        const active = idx <= current;
        return (
          <div key={st} className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-300'}`}
            />
            <span className={`text-xs ${active ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
              {statusLabel[st]}
            </span>
            {idx < STATUS_FLOW.length - 1 && <span className="w-6 h-px bg-slate-300" />}
          </div>
        );
      })}
    </div>
  );
}

export default function OrdersClient() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    listOrders().then((data) => setOrders(data.filter((o) => o.clientEmail === user?.email)));
  }, [user]);

  const filtered = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const handleExit = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="orders-page container section space-y-4">
      <div className="orders-header">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Mis pedidos</h1>
          <p className="text-sm text-slate-500">Revisa el estado y la línea de tiempo de tus compras.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos</option>
            <option value="verificacion">En verificación</option>
            <option value="confirmado">Confirmado</option>
            <option value="recojo">Listo para recojo</option>
            <option value="completed">Completado</option>
          </select>
          <button type="button" className="btn btn-outline text-sm px-3" onClick={handleExit}>Salir</button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm p-4">Aún no tienes pedidos.</p>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100 compact-cards">
          {filtered.map((order) => (
            <div key={order.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">Pedido #{order.id}</p>
                  <p className="text-sm text-slate-500">{order.date}</p>
                  <p className="text-xs text-slate-500">Pago: {order.paymentMethod || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">{statusLabel[order.status] || order.status}</p>
                  <p className="font-semibold text-slate-900">S/ {order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="timeline-row">
                <Timeline status={order.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

