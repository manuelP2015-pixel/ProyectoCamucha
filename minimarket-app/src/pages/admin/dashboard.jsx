import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, ShoppingCart, PackageOpen } from 'lucide-react';

const kpis = [
  { label: 'Ventas totales', value: 'S/ 48,200', icon: TrendingUp },
  { label: 'Pedidos pendientes', value: '12', icon: ShoppingCart },
  { label: 'Producto más vendido', value: 'Arroz Premium 5kg', icon: PackageOpen }
];

const salesData = [
  { month: 'Ene', value: 4200 },
  { month: 'Feb', value: 5100 },
  { month: 'Mar', value: 6100 },
  { month: 'Abr', value: 5800 },
  { month: 'May', value: 6900 },
  { month: 'Jun', value: 7200 }
];

const ordersData = [
  { month: 'Ene', completed: 120, pending: 18 },
  { month: 'Feb', completed: 140, pending: 12 },
  { month: 'Mar', completed: 160, pending: 15 },
  { month: 'Abr', completed: 150, pending: 10 },
  { month: 'May', completed: 180, pending: 9 },
  { month: 'Jun', completed: 200, pending: 7 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-3">
            <span className="rounded-full bg-indigo-50 p-3 text-indigo-600">
              <kpi.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">{kpi.label}</p>
              <p className="text-xl font-semibold text-slate-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Ventas mensuales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Pedidos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Completados" />
                <Bar dataKey="pending" fill="#f97316" radius={[4, 4, 0, 0]} name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

