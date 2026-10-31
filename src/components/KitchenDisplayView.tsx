import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { soundManager } from '../utils/audio';
import type { OrderStatus, PlacedOrder } from '../utils/whatsapp';
import {
  ChefHat,
  Phone,
  MessageCircle,
  CheckCircle2,
  Bell,
  Coffee,
  ArrowRight
} from 'lucide-react';

export const KitchenDisplayView: React.FC = () => {
  const { orderHistory, updateOrderStatus, setActiveTab, setReceiptModalOrder } = useCart();
  const [filter, setFilter] = useState<'all' | 'active' | 'ready'>('active');

  const filteredOrders = orderHistory.filter((order) => {
    if (filter === 'active') {
      return order.status === 'placed' || order.status === 'confirmed' || order.status === 'preparing';
    }
    if (filter === 'ready') {
      return order.status === 'ready';
    }
    return true;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'preparing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleNextStatus = (order: PlacedOrder) => {
    if (order.status === 'placed') updateOrderStatus(order.orderId, 'confirmed');
    else if (order.status === 'confirmed') updateOrderStatus(order.orderId, 'preparing');
    else if (order.status === 'preparing') updateOrderStatus(order.orderId, 'ready');
    else if (order.status === 'ready') updateOrderStatus(order.orderId, 'completed');
  };

  const getNextActionLabel = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'Accept Order';
      case 'confirmed':
        return 'Start Brewing / Kitchen';
      case 'preparing':
        return 'Mark Ready to Serve';
      case 'ready':
        return 'Mark Completed';
      default:
        return 'Completed';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* KDS Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#241E1A] text-white flex items-center justify-center shadow-sm">
            <ChefHat className="w-6 h-6 text-[#B86B3D]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-[#241E1A]">
                Barista & Kitchen Display
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20">
                LIVE SYNC
              </span>
            </div>
            <p className="text-xs text-[#756B63] font-light mt-0.5">
              Incoming customer orders dispatched via WhatsApp or Web. Real-time audio alerts enabled.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => soundManager.playKitchenAlert()}
            className="px-3.5 py-2 rounded-xl bg-[#F7F3EC] border border-[#E5DCD1] text-xs font-semibold text-[#756B63] hover:text-[#241E1A] flex items-center gap-1.5 cursor-pointer"
            title="Test Kitchen Alert Sound"
          >
            <Bell className="w-3.5 h-3.5 text-[#B86B3D]" />
            <span>Test Bell</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className="px-4 py-2 rounded-xl bg-[#B86B3D] text-white text-xs font-bold hover:bg-[#A05A30] transition-colors cursor-pointer"
          >
            Back to Menu
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'active'
              ? 'bg-[#241E1A] text-white shadow-xs'
              : 'bg-white text-[#756B63] border border-[#E5DCD1] hover:bg-[#F7F3EC]'
          }`}
        >
          Active Orders ({orderHistory.filter((o) => o.status !== 'completed' && o.status !== 'ready').length})
        </button>

        <button
          onClick={() => setFilter('ready')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'ready'
              ? 'bg-[#241E1A] text-white shadow-xs'
              : 'bg-white text-[#756B63] border border-[#E5DCD1] hover:bg-[#F7F3EC]'
          }`}
        >
          Ready to Serve ({orderHistory.filter((o) => o.status === 'ready').length})
        </button>

        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#241E1A] text-white shadow-xs'
              : 'bg-white text-[#756B63] border border-[#E5DCD1] hover:bg-[#F7F3EC]'
          }`}
        >
          All Orders ({orderHistory.length})
        </button>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DCD1] space-y-3">
          <Coffee className="w-12 h-12 text-[#D8C7B5] mx-auto stroke-1" />
          <h3 className="font-serif text-lg font-bold text-[#241E1A]">
            No orders in this view
          </h3>
          <p className="text-xs text-[#756B63]">
            Incoming customer orders from WhatsApp or web checkout will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.map((order) => {
            const timeAgo = new Date(order.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl border border-[#E5DCD1] shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Top Bar */}
                <div className="p-4 bg-[#F7F3EC]/70 border-b border-[#E5DCD1] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#241E1A]">
                        #{order.orderId}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#756B63] block mt-0.5">
                      {timeAgo} • {order.fulfillmentType.toUpperCase()}
                      {order.tableNumber ? ` (Table ${order.tableNumber})` : ''}
                    </span>
                  </div>

                  <span className="font-bold text-sm text-[#B86B3D]">
                    ₹{order.total}
                  </span>
                </div>

                {/* Customer Info (if available) */}
                {(order.customer.name || order.customer.phone || order.specialInstructions) && (
                  <div className="px-4 py-2.5 bg-white border-b border-[#E5DCD1]/60 text-xs text-[#756B63] space-y-1">
                    {order.customer.name && (
                      <div className="flex items-center justify-between text-[#241E1A] font-semibold">
                        <span>{order.customer.name}</span>
                        {order.customer.phone && (
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${order.customer.phone}`}
                              className="text-[#B86B3D] hover:underline flex items-center gap-1"
                              title="Call Customer"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{order.customer.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${order.customer.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-green-600 hover:text-green-700"
                              title="WhatsApp Customer"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current stroke-none" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                    {order.specialInstructions && (
                      <div className="text-[11px] italic bg-[#F7F3EC] p-1.5 rounded-lg text-[#241E1A]">
                        Note: "{order.specialInstructions}"
                      </div>
                    )}
                  </div>
                )}

                {/* Items List */}
                <div className="p-4 space-y-2.5 flex-1 overflow-y-auto max-h-48">
                  {order.items.map((ci) => {
                    const customStr = Object.values(ci.selectedCustomizations || {})
                      .filter(Boolean)
                      .join(', ');
                    return (
                      <div key={ci.cartItemId} className="text-xs">
                        <div className="flex justify-between font-semibold text-[#241E1A]">
                          <span>
                            {ci.item.name} <span className="text-[#B86B3D]">× {ci.quantity}</span>
                          </span>
                          <span>₹{ci.unitPrice * ci.quantity}</span>
                        </div>
                        {customStr && (
                          <span className="text-[10px] text-[#756B63] block pl-2 font-light">
                            ↳ {customStr}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Actions */}
                <div className="p-3 bg-[#F7F3EC]/50 border-t border-[#E5DCD1] flex items-center gap-2">
                  <button
                    onClick={() => setReceiptModalOrder(order)}
                    className="p-2 rounded-xl bg-white border border-[#E5DCD1] text-[#756B63] hover:text-[#241E1A] text-xs font-semibold"
                    title="View Receipt"
                  >
                    Bill
                  </button>

                  {order.status !== 'completed' ? (
                    <button
                      onClick={() => handleNextStatus(order)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#241E1A] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{getNextActionLabel(order.status)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B86B3D]" />
                    </button>
                  ) : (
                    <div className="flex-1 text-center py-2 text-xs font-bold text-[#2E7D32] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
