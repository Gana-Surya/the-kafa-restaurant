import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { Phone, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const { tableNumber, setActiveTab, activeOrder } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EC]/90 backdrop-blur-md border-b border-[#E5DCD1] transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo / Display Serif Title */}
        <button
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="THE KAFA Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#241E1A] uppercase">
            {RESTAURANT_CONFIG.name}
          </span>
        </button>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Order Tracker Pill */}
          {activeOrder && activeOrder.status !== 'completed' && (
            <button
              onClick={() => setActiveTab('tracking')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B86B3D] text-white text-xs font-bold shadow-xs hover:bg-[#A05A30] transition-colors cursor-pointer animate-pulse"
              title="Track live order"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>#{activeOrder.orderId}</span>
            </button>
          )}

          {/* Quick Direct Call Button */}
          <a
            href={RESTAURANT_CONFIG.telNumber}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DCD1] text-[#241E1A] text-xs font-semibold hover:bg-[#E7D8C7]/50 transition-colors shadow-2xs"
            title={`Direct Phone Line: ${RESTAURANT_CONFIG.displayPhoneNumber}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#B86B3D]" />
            <span>{RESTAURANT_CONFIG.displayPhoneNumber}</span>
          </a>

          {/* Table / Order Context Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#E7D8C7]/60 border border-[#D8C7B5] text-[#241E1A] text-xs sm:text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
            <span className="text-[#756B63]">Table</span>
            <span className="font-semibold text-[#241E1A]">{tableNumber}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
