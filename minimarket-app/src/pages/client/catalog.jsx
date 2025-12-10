import React from 'react';
import { productsMock } from '../../data/products-mock';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Catalog() {
  const { addToCart } = useCart();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Catálogo</h1>
          <p className="text-slate-500 text-sm">Explora los productos del minimarket.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsMock.map((product) => (
          <div key={product.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              Img
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{product.category}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-semibold text-indigo-600">S/ {product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                >
                  <ShoppingCart size={16} />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

