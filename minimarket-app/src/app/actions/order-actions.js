import { createOrder, updateOrderStatus } from '../../services/orders-service';
import { getCurrentUser } from '../../services/auth-service';

// Cliente: crear pedido desde checkout
export async function checkoutAction({ request }) {
  const formData = await request.formData();
  const cartItems = JSON.parse(formData.get('items') || '[]');
  const total = parseFloat(formData.get('total') || '0');
  const user = getCurrentUser();

  if (!cartItems.length) return { error: 'El carrito está vacío' };
  if (!user) return { error: 'Debes iniciar sesión para confirmar tu pedido' };

  await createOrder({
    items: cartItems,
    total,
    clientEmail: user.email,
    clientName: user.name || 'Cliente Web'
  });

  return { success: true };
}

// Admin: actualizar estado del pedido
export async function adminOrderAction({ request }) {
  const formData = await request.formData();
  const id = formData.get('orderId');
  const newStatus = formData.get('status');

  await updateOrderStatus(id, newStatus);
  return { success: true, message: 'Estado actualizado' };
}

