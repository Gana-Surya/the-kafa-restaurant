import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import type { CartItem } from '../context/CartContext';

export type OrderFulfillmentType = 'dine-in' | 'takeaway' | 'delivery';
export type PaymentMethod = 'counter' | 'cash-on-delivery';
export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface CustomerDetails {
  name: string;
  phone: string;
  address?: string;
  landmark?: string;
  locationUrl?: string; // Google Maps URL
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string; // ISO string
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  fulfillmentType: OrderFulfillmentType;
  tableNumber?: string;
  customer: CustomerDetails;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  statusUpdatedAt: string;
}

export function generateOrderId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KF-${code}`;
}

export function formatOrderToWhatsAppText(order: PlacedOrder): string {
  const dateStr = new Date(order.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const fulfillmentTitle =
    order.fulfillmentType === 'dine-in'
      ? `🍽️ DINE-IN (Table: ${order.tableNumber || 'N/A'})`
      : order.fulfillmentType === 'takeaway'
      ? `🛍️ TAKEAWAY / PICKUP`
      : `🛵 HOME DELIVERY`;

  const itemsList = order.items
    .map((ci, index) => {
      const customizations = Object.entries(ci.selectedCustomizations || {})
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');

      const customLine = customizations ? `\n   └ _${customizations}_` : '';
      return `${index + 1}. *${ci.item.name}* x ${ci.quantity} = ₹${ci.unitPrice * ci.quantity}${customLine}`;
    })
    .join('\n');

  const customerBlock = [
    order.customer.name ? `👤 *Name:* ${order.customer.name}` : null,
    order.customer.phone ? `📞 *Phone:* ${order.customer.phone}` : null,
    order.fulfillmentType === 'delivery' && order.customer.address
      ? `📍 *Address:* ${order.customer.address}${order.customer.landmark ? ` (Near: ${order.customer.landmark})` : ''}`
      : null,
    order.fulfillmentType === 'delivery' && order.customer.locationUrl
      ? `🗺️ *Live Location:* ${order.customer.locationUrl}`
      : null,
    order.specialInstructions ? `📝 *Notes:* _${order.specialInstructions}_` : null
  ]
    .filter(Boolean)
    .join('\n');

  const paymentText =
    order.fulfillmentType === 'delivery'
      ? '💵 Cash on Delivery'
      : '💳 Pay at Counter';

  const message = `
☕ *ORDER #${order.orderId} — ${RESTAURANT_CONFIG.name}*
${fulfillmentTitle}
🕒 *Time:* ${dateStr}
----------------------------------
${customerBlock ? `${customerBlock}\n----------------------------------\n` : ''}🛒 *ITEMS ORDERED:*
${itemsList}
----------------------------------
*Items Subtotal:* ₹${order.subtotal}
${order.deliveryFee > 0 ? `*Delivery Fee:* ₹${order.deliveryFee}\n` : ''}*Grand Total:* *₹${order.total}*
*Payment Mode:* ${paymentText}
----------------------------------
_Please confirm preparation & acceptance._
`.trim();

  return message;
}

export function buildWhatsAppUrl(order: PlacedOrder, targetPhone?: string): string {
  const phone = (targetPhone || RESTAURANT_CONFIG.whatsappNumber).replace(/\D/g, '');
  const text = formatOrderToWhatsAppText(order);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildDirectCallUrl(phone?: string): string {
  const target = phone || RESTAURANT_CONFIG.telNumber;
  return target.startsWith('tel:') ? target : `tel:${target.replace(/\s+/g, '')}`;
}

export function formatOrderSpeechText(order: PlacedOrder): string {
  const count = order.items.reduce((acc, i) => acc + i.quantity, 0);
  return `Order ${order.orderId} for ${order.fulfillmentType === 'dine-in' ? `Table ${order.tableNumber}` : order.customer.name || 'guest'}. Total ${count} items amounting to ${order.total} rupees.`;
}
