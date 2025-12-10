import { delay } from './delay';
import { productsMock } from '../data/products-mock';

const PRODUCTS_KEY = 'minimarket_products';

function loadProductsStore() {
  if (typeof localStorage === 'undefined') return [...productsMock];
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? JSON.parse(raw) : [...productsMock];
}

function persistProducts(data) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
}

let productsState = loadProductsStore();

export async function listProducts() {
  await delay();
  return productsState;
}

export function getCategories() {
  const cats = new Set(productsState.map((p) => p.category || 'Otros'));
  cats.delete('Todos');
  return ['Todos', ...Array.from(cats)];
}

export async function getProduct(id) {
  await delay();
  return productsState.find((p) => p.id === Number(id));
}

export async function createProduct(product) {
  await delay(300);
  const newProduct = { ...product, id: Date.now() };
  productsState = [newProduct, ...productsState];
  persistProducts(productsState);
  return newProduct;
}

export async function updateProduct(id, updates) {
  await delay(300);
  const idx = productsState.findIndex((p) => p.id === Number(id));
  if (idx === -1) return null;
  productsState[idx] = { ...productsState[idx], ...updates };
  persistProducts(productsState);
  return productsState[idx];
}

export async function deleteProduct(id) {
  await delay(300);
  const idx = productsState.findIndex((p) => p.id === Number(id));
  if (idx === -1) return false;
  productsState.splice(idx, 1);
  persistProducts(productsState);
  return true;
}

