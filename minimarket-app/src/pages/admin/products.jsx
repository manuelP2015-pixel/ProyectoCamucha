import React, { useEffect, useState } from 'react';
import { listProducts, createProduct, deleteProduct, getCategories } from '../../services/products-service';

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '', description: '' });

  useEffect(() => {
    listProducts().then(setItems).finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const newItem = await createProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category || 'Otros',
      image: form.image || 'https://via.placeholder.com/300',
      description: form.description || 'Producto del minimarket',
      stock: 50
    });
    setItems((prev) => [newItem, ...prev]);
    setForm({ name: '', price: '', category: '', image: '', description: '' });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Productos</h1>
          <p className="text-sm text-slate-500">Crea y gestiona el catálogo que verán los clientes.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="grid gap-3 md:grid-cols-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nombre"
          className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-2"
        />
        <input
          required
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Precio"
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Categoría"
          className="rounded-lg border border-slate-200 px-3 py-2"
          list="categories"
        />
        <datalist id="categories">
          {getCategories().map((c) => (
            <option value={c} key={c} />
          ))}
        </datalist>
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="URL de imagen"
          className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-2"
        />
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descripción"
          className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-3"
        />
        <button type="submit" className="btn btn-primary md:col-span-5 justify-center">
          Guardar producto
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">Cargando productos...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <div key={product.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Stock: {product.stock ?? 0}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-indigo-600">S/ {product.price.toFixed(2)}</span>
                <span className="text-slate-500">Cat: {product.category}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <button className="flex-1 border border-red-200 text-red-600 rounded-lg py-1 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

