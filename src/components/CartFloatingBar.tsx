import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const CartFloatingBar: React.FC = () => {
  const { totalItemsCount, subtotal, setIsCartOpen, activeTab } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isSlidingDown, setIsSlidingDown] = useState(false);
  const prevCountRef = useRef(totalItemsCount);

  useEffect(() => {
    // Whenever totalItemsCount increases (item added)
    if (totalItemsCount > 0 && totalItemsCount > prevCountRef.current) {
      setIsVisible(true);
      setIsSlidingDown(false);

      // Display for 2 seconds, then trigger 500ms slide-down exit animation
      const hideTimer = setTimeout(() => {
        setIsSlidingDown(true);
        setTimeout(() => {
          setIsVisible(false);
          setIsSlidingDown(false);
        }, 500);
      }, 2000);

      prevCountRef.current = totalItemsCount;
      return () => clearTimeout(hideTimer);
    }
    prevCountRef.current = totalItemsCount;
  }, [totalItemsCount]);

  if (!isVisible || totalItemsCount === 0 || activeTab === 'order') return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-0 right-0 z-30 px-4 pointer-events-none transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isSlidingDown
          ? 'translate-y-16 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-[#241E1A] text-[#F7F3EC] px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between hover:bg-[#1A1512] transition-all transform active:scale-[0.99] border border-white/10 group cursor-pointer"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <ShoppingBag className="w-4.5 h-4.5 text-[#B86B3D]" />
            <span>View Order</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-bold text-[#F7F3EC]">
            <span>{totalItemsCount}</span>
            <span>•</span>
            <span className="text-[#B86B3D]">₹{subtotal}</span>
            <ChevronRight className="w-4 h-4 text-[#B86B3D] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
