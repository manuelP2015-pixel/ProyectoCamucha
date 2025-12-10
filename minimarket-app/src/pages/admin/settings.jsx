import React, { useState } from 'react';
import { useSettings } from '../../app/settings-provider';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  // Mantener el formulario sincronizado si ya había datos guardados
  React.useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">Configuración de tienda</h1>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <p className="text-slate-600">Actualiza logo, textos y datos de contacto que se muestran en la tienda y footer.</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre comercial</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Logo (URL)</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Tagline</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Pagos</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Yape - Número</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.yape?.number || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, yape: { ...form.payments.yape, number: e.target.value } }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Yape - URL QR</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.yape?.qr || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, yape: { ...form.payments.yape, qr: e.target.value } }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Plin - Número</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.plin?.number || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, plin: { ...form.payments.plin, number: e.target.value } }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Plin - URL QR</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.plin?.qr || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, plin: { ...form.payments.plin, qr: e.target.value } }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Tarjeta / Transferencia - Cuenta</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.tarjeta?.account || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, tarjeta: { ...form.payments.tarjeta, account: e.target.value } }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Tarjeta / Transferencia - CCI</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.tarjeta?.cci || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, tarjeta: { ...form.payments.tarjeta, cci: e.target.value } }
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Contra entrega - Nota</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.payments?.contraentrega?.note || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    payments: { ...form.payments, contraentrega: { ...form.payments.contraentrega, note: e.target.value } }
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Dirección</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.contact.address}
              onChange={(e) => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Teléfono</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.contact.phone}
              onChange={(e) => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">WhatsApp</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.contact.whatsapp}
              onChange={(e) => setForm({ ...form, contact: { ...form.contact, whatsapp: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Correo</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.contact.email}
              onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Horario (Lun-Sab)</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.schedule.weekday}
              onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, weekday: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Horario (Domingo)</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.schedule.sunday}
              onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, sunday: e.target.value } })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Guardar cambios
        </button>
        {saved && <p className="text-sm text-green-600">Configuración guardada.</p>}
      </form>
    </div>
  );
}

