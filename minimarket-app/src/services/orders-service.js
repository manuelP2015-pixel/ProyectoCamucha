import { delay } from './delay';
import { ordersMock } from '../data/orders-mock';

export async function listOrders() {
  await delay();
  return ordersMock;
}

export async function getOrders() {
  return listOrders();
}

export async function createOrder({ items, total, clientEmail, clientName, paymentMethod = 'N/A', paymentProof = null, paymentRef = '' }) {
  await delay(400);
  const newOrder = {
    id: Date.now(),
    customer: clientName || 'Cliente Web',
    clientEmail: clientEmail || 'cliente@demo.com',
    date: new Date().toISOString().slice(0, 10),
    total,
    status: 'verificacion',
    items,
    paymentMethod,
    paymentProof,
    paymentRef
  };
  ordersMock.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(id, status) {
  await delay(300);
  const order = ordersMock.find((o) => o.id === Number(id));
  if (order) order.status = status;
  return order;
}

