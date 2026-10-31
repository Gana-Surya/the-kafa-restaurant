import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Coffee, ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
  isDrawer?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ isDrawer = false }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActiveTab
  } = useCart();

  if (isDrawer && !isCartOpen) return null;

  const handleBackToMenu = () => {
    if (isDrawer) setIsCartOpen(false);
    setActiveTab('menu');
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const containerClasses = isDrawer
    ? 'fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in'
    : 'max-w-3xl mx-auto px-4 py-6 sm:py-10';

  const contentClasses = isDrawer
    ? 'w-full max-w-md bg-[#F7F3EC] h-full shadow-2xl flex flex-col animate-slide-up border-l border-[#E5DCD1] p-5 sm:p-6'
    : 'bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DCD1] shadow-md';

  return (
    <div className={isDrawer ? containerClasses : ''} onClick={() => isDrawer && setIsCartOpen(false)}>
      <div className={contentClasses} onClick={(e) => isDrawer && e.stopPropagation()}>
        {/* Top Header */}
        <div className="relative flex items-center justify-center pb-4 border-b border-[#E5DCD1]">
          {isDrawer && (
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute right-0 p-1 rounded-full text-[#756B63] hover:text-[#241E1A] cursor-pointer hover:bg-[#E5DCD1]/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#241E1A] text-center">
            Your Order Tray
          </h2>
        </div>

        {/* Order Items List */}
        <div className={`py-3 space-y-3.5 ${isDrawer ? 'flex-1 overflow-y-auto pr-1 my-1' : ''}`}>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#E7D8C7]/40 text-[#756B63] flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#241E1A]">
                Your tray is currently empty
              </h3>
              <p className="mt-1 text-xs text-[#756B63] max-w-xs mx-auto">
                Explore our espresso, cold brew, and bakery offerings to start your order.
              </p>
              <button
                onClick={handleBackToMenu}
                className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full text-xs font-bold bg-[#B86B3D] text-white hover:bg-[#A05A30] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((cartItem) => {
              const customSummary = Object.entries(cartItem.selectedCustomizations)
                .map(([, val]) => val)
                .filter(Boolean)
                .join(', ');

              return (
                <div
                  key={cartItem.cartItemId}
                  className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5DCD1] flex items-center gap-3.5 shadow-2xs"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#F0E6D8]"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#241E1A] truncate">
                      {cartItem.item.name}
                    </h4>
                    {customSummary && (
                      <p className="text-xs text-[#756B63] truncate mt-0.5 font-light">
                        {customSummary}
                      </p>
                    )}
                    <span className="text-xs font-semibold text-[#B86B3D] block mt-1">
                      ₹{cartItem.unitPrice * cartItem.quantity}
                    </span>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#F7F3EC] border border-[#E5DCD1] rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                        className="p-0.5 text-[#756B63] hover:text-[#241E1A] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#241E1A] w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                        className="p-0.5 text-[#756B63] hover:text-[#241E1A] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(cartItem.cartItemId)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Total & Checkout CTA */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#E5DCD1] space-y-4">
            <div className="space-y-2 text-sm text-[#756B63]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#241E1A]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Taxes & Service</span>
                <span className="text-[#2E7D32] font-medium">Included</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#241E1A] pt-2 border-t border-[#E5DCD1]/60">
                <span>Total Amount</span>
                <span className="text-[#B86B3D]">₹{subtotal}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#B86B3D] hover:bg-[#A05A30] text-white rounded-2xl font-bold text-sm active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Delivery & WhatsApp Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
