import React from 'react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { tableNumber, setActiveTab } = useCart();

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
            THE KAFA
          </span>
        </button>

        {/* Table / Order Context Badge */}
        <div className="flex items-center gap-2">
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
