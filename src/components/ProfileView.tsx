import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import {
  MapPin,
  Clock,
  ChevronRight,
  Table,
  Phone,
  MessageCircle,
  ChefHat,
  Receipt
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    tableNumber,
    setTableNumber,
    setActiveTab,
    orderHistory,
    setReceiptModalOrder
  } = useCart();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DCD1] shadow-sm flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#E7D8C7]/60 text-[#B86B3D] flex items-center justify-center font-serif text-2xl font-bold shrink-0">
            K
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#241E1A]">
              Café Guest
            </h2>
            <p className="text-xs text-[#756B63] mt-0.5">
              Active Table: <span className="font-semibold text-[#241E1A]">{tableNumber}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('kitchen')}
          className="px-3.5 py-2 rounded-xl bg-[#241E1A] text-white hover:bg-black text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChefHat className="w-4 h-4 text-[#B86B3D]" />
          <span className="hidden sm:inline">Kitchen Mode</span>
        </button>
      </div>

      {/* Table Context & Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#241E1A] flex items-center gap-2">
          <Table className="w-5 h-5 text-[#B86B3D]" />
          <span>Dine-In Table Settings</span>
        </h3>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-[#756B63] uppercase tracking-wider block font-semibold">
              Selected Table
            </span>
            <span className="text-sm font-bold text-[#241E1A]">
              {tableNumber}
            </span>
          </div>
          <select
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="px-3 py-2 bg-[#F7F3EC] border border-[#E5DCD1] rounded-xl text-xs font-semibold text-[#241E1A] focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
          >
            {RESTAURANT_CONFIG.tables.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Direct Contact & WhatsApp Help */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#241E1A]">
          Direct Café Assistance
        </h3>
        <p className="text-xs text-[#756B63]">
          Need help, custom orders, or party bookings? Contact our barista desk directly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello THE KAFA! I am inquiring from the website.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] flex items-center gap-3 hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-5 h-5 fill-current stroke-none text-[#25D366]" />
            <div>
              <span className="text-xs font-bold block text-[#241E1A]">WhatsApp Us</span>
              <span className="text-[11px] font-mono text-[#756B63]">{RESTAURANT_CONFIG.displayPhoneNumber}</span>
            </div>
          </a>

          <a
            href={RESTAURANT_CONFIG.telNumber}
            className="p-3.5 rounded-2xl bg-[#B86B3D]/10 border border-[#B86B3D]/30 text-[#B86B3D] flex items-center gap-3 hover:bg-[#B86B3D]/20 transition-colors"
          >
            <Phone className="w-5 h-5 text-[#B86B3D]" />
            <div>
              <span className="text-xs font-bold block text-[#241E1A]">Call Café Desk</span>
              <span className="text-[11px] font-mono text-[#756B63]">{RESTAURANT_CONFIG.displayPhoneNumber}</span>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Orders History */}
      {orderHistory.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#241E1A] flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#B86B3D]" />
              <span>Order History on Device</span>
            </h3>
            <span className="text-xs text-[#756B63]">
              {orderHistory.length} orders
            </span>
          </div>

          <div className="space-y-3">
            {orderHistory.slice(0, 5).map((ord) => (
              <div
                key={ord.orderId}
                className="p-3.5 rounded-2xl bg-[#F7F3EC]/50 border border-[#E5DCD1] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#241E1A]">#{ord.orderId}</span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#E5DCD1] font-semibold text-[#756B63]">
                      {ord.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#756B63] block mt-0.5">
                    {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items • ₹{ord.total}
                  </span>
                </div>

                <button
                  onClick={() => setReceiptModalOrder(ord)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E5DCD1] hover:bg-[#E7D8C7]/40 font-semibold text-[#241E1A] transition-colors cursor-pointer"
                >
                  View Bill
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Café Info */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#241E1A]">
          About {RESTAURANT_CONFIG.name} Store
        </h3>

        <div className="flex items-start gap-3 text-sm text-[#756B63]">
          <MapPin className="w-5 h-5 text-[#B86B3D] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#241E1A] block">Location</span>
            {RESTAURANT_CONFIG.address}
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-[#756B63] pt-3 border-t border-[#E5DCD1]/50">
          <Clock className="w-5 h-5 text-[#B86B3D] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#241E1A] block">Brewing Hours</span>
            Mon – Sun: 07:30 AM – 10:00 PM
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <button
        onClick={() => setActiveTab('menu')}
        className="w-full py-3.5 rounded-2xl bg-[#E7D8C7]/50 text-[#241E1A] font-bold text-sm hover:bg-[#E7D8C7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Return to Café Menu</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
