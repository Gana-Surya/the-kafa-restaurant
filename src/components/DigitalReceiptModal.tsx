import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { X, Printer, Share2 } from 'lucide-react';

export const DigitalReceiptModal: React.FC = () => {
  const { receiptModalOrder, setReceiptModalOrder } = useCart();

  if (!receiptModalOrder) return null;

  const order = receiptModalOrder;
  const dateStr = new Date(order.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${RESTAURANT_CONFIG.name} Order #${order.orderId}`,
        text: `Order receipt for ${order.orderId} at ${RESTAURANT_CONFIG.name}. Grand Total: ₹${order.total}`,
        url: window.location.href
      }).catch(() => {});
    }
  };

  return (
    <div
      onClick={() => setReceiptModalOrder(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-[#E5DCD1] overflow-hidden flex flex-col animate-modal-in"
      >
        {/* Receipt Action Header */}
        <div className="p-4 bg-[#F7F3EC] border-b border-[#E5DCD1] flex items-center justify-between print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-[#756B63]">
            Digital Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg hover:bg-white text-[#756B63] hover:text-[#241E1A] transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-white text-[#756B63] hover:text-[#241E1A] transition-colors cursor-pointer"
              title="Share Receipt"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setReceiptModalOrder(null)}
              className="p-1.5 rounded-lg hover:bg-white text-[#756B63] hover:text-[#241E1A] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vintage Thermal Roll Receipt Style */}
        <div className="p-6 font-mono text-xs text-[#241E1A] space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-[#241E1A]">
              {RESTAURANT_CONFIG.name}
            </h3>
            <p className="text-[10px] text-[#756B63] font-sans">
              {RESTAURANT_CONFIG.tagline}
            </p>
            <p className="text-[10px] text-[#756B63]">
              {RESTAURANT_CONFIG.address}
            </p>
            <p className="text-[10px] text-[#756B63]">
              WhatsApp: {RESTAURANT_CONFIG.displayPhoneNumber}
            </p>
          </div>

          <div className="border-t border-dashed border-[#D8C7B5] my-2"></div>

          {/* Metadata */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#756B63]">Receipt #:</span>
              <span className="font-bold">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#756B63]">Date & Time:</span>
              <span>{dateStr}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#756B63]">Fulfillment:</span>
              <span className="uppercase font-semibold">{order.fulfillmentType}</span>
            </div>
            {order.tableNumber && (
              <div className="flex justify-between">
                <span className="text-[#756B63]">Table:</span>
                <span className="font-bold">{order.tableNumber}</span>
              </div>
            )}
            {order.customer.name && (
              <div className="flex justify-between">
                <span className="text-[#756B63]">Customer:</span>
                <span>{order.customer.name}</span>
              </div>
            )}
            {order.customer.phone && (
              <div className="flex justify-between">
                <span className="text-[#756B63]">Contact:</span>
                <span>{order.customer.phone}</span>
              </div>
            )}
          </div>

          <div className="border-t border-dashed border-[#D8C7B5] my-2"></div>

          {/* Items */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-[10px] uppercase text-[#756B63]">
              <span>Item / Qty</span>
              <span>Price</span>
            </div>
            {order.items.map((ci) => {
              const customStr = Object.values(ci.selectedCustomizations || {})
                .filter(Boolean)
                .join(', ');
              return (
                <div key={ci.cartItemId} className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="font-semibold">{ci.item.name} x {ci.quantity}</span>
                    <span>₹{ci.unitPrice * ci.quantity}</span>
                  </div>
                  {customStr && (
                    <div className="text-[10px] text-[#756B63] pl-2">
                      ↳ {customStr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-dashed border-[#D8C7B5] my-2"></div>

          {/* Calculations */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#756B63]">Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span className="text-[#756B63]">Delivery Fee:</span>
                <span>₹{order.deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-[#241E1A]">
              <span>Total Paid/Payable:</span>
              <span>₹{order.total}</span>
            </div>
            <div className="flex justify-between text-[10px] text-[#756B63] pt-0.5">
              <span>Payment Mode:</span>
              <span className="uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#D8C7B5] my-3"></div>

          {/* Footer note */}
          <div className="text-center text-[10px] text-[#756B63] space-y-1">
            <p className="font-serif italic">Thank you for visiting THE KAFA!</p>
            <p>Crafted with love • Good coffee. Good moments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
