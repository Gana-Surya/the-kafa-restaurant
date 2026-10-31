import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { buildWhatsAppUrl, buildDirectCallUrl, type PlacedOrder } from '../utils/whatsapp';
import {
  X,
  Phone,
  MessageCircle,
  Coffee,
  ShoppingBag,
  Bike,
  AlertCircle,
  Navigation
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    grandTotal,
    fulfillmentType,
    setFulfillmentType,
    tableNumber,
    setTableNumber,
    customerDetails,
    setCustomerDetails,
    specialInstructions,
    setSpecialInstructions,
    submitOrder,
    setActiveTab,
    setIsCartOpen
  } = useCart();

  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setCustomerDetails((prev) => ({
          ...prev,
          locationUrl: mapsLink
        }));
      },
      () => {
        setIsLocating(false);
        setErrorMessage('Unable to retrieve location. Please type your address manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const validateOrder = (): boolean => {
    if (fulfillmentType === 'delivery') {
      if (!customerDetails.name.trim()) {
        setErrorMessage('Please enter your name for delivery.');
        return false;
      }
      if (!customerDetails.phone.trim() || customerDetails.phone.trim().length < 8) {
        setErrorMessage('Please enter a valid phone number so we can reach you.');
        return false;
      }
      if (!customerDetails.address?.trim()) {
        setErrorMessage('Please provide a delivery address.');
        return false;
      }
      if (grandTotal < RESTAURANT_CONFIG.minOrderForDelivery) {
        setErrorMessage(`Minimum order for delivery is ₹${RESTAURANT_CONFIG.minOrderForDelivery}.`);
        return false;
      }
    } else if (fulfillmentType === 'takeaway') {
      if (!customerDetails.name.trim()) {
        setErrorMessage('Please enter your name for pickup order.');
        return false;
      }
      if (!customerDetails.phone.trim() || customerDetails.phone.trim().length < 8) {
        setErrorMessage('Please enter your phone number.');
        return false;
      }
    }

    setErrorMessage(null);
    return true;
  };

  // Dispatch through WhatsApp
  const handleOrderViaWhatsApp = () => {
    if (!validateOrder()) return;

    const order: PlacedOrder = submitOrder();
    const whatsappUrl = buildWhatsAppUrl(order, RESTAURANT_CONFIG.whatsappNumber);

    // Open WhatsApp in new tab / application
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('tracking');
  };

  // Dispatch through Direct Phone Call
  const handleOrderViaCall = () => {
    if (!validateOrder()) return;

    submitOrder();
    const callUrl = buildDirectCallUrl(RESTAURANT_CONFIG.telNumber);

    // Trigger phone dialer
    window.location.href = callUrl;

    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('tracking');
  };

  return (
    <div
      onClick={() => setIsCheckoutOpen(false)}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F3EC] w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E5DCD1] max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden animate-slide-up sm:animate-modal-in"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E5DCD1] flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#B86B3D]">
              Fast Checkout & Dispatch
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#241E1A]">
              Delivery Details
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-[#756B63] hover:text-[#241E1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#241E1A]">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Fulfillment Mode Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#756B63] mb-2.5">
              Select Order Type
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFulfillmentType('dine-in')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  fulfillmentType === 'dine-in'
                    ? 'border-[#B86B3D] bg-white text-[#B86B3D] shadow-sm ring-2 ring-[#B86B3D]/20 font-bold'
                    : 'border-[#E5DCD1] bg-white/70 text-[#756B63] hover:bg-white'
                }`}
              >
                <Coffee className="w-5 h-5" />
                <span className="text-xs">Dine-In</span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('takeaway')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  fulfillmentType === 'takeaway'
                    ? 'border-[#B86B3D] bg-white text-[#B86B3D] shadow-sm ring-2 ring-[#B86B3D]/20 font-bold'
                    : 'border-[#E5DCD1] bg-white/70 text-[#756B63] hover:bg-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs">Takeaway</span>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  fulfillmentType === 'delivery'
                    ? 'border-[#B86B3D] bg-white text-[#B86B3D] shadow-sm ring-2 ring-[#B86B3D]/20 font-bold'
                    : 'border-[#E5DCD1] bg-white/70 text-[#756B63] hover:bg-white'
                }`}
              >
                <Bike className="w-5 h-5" />
                <span className="text-xs">Delivery</span>
              </button>
            </div>
          </div>

          {/* Conditional Fields based on fulfillment */}
          {fulfillmentType === 'dine-in' ? (
            <div className="bg-white p-4 rounded-2xl border border-[#E5DCD1] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#756B63] uppercase tracking-wider block font-semibold">
                    Current Table
                  </span>
                  <span className="text-sm font-bold text-[#241E1A]">
                    Table {tableNumber}
                  </span>
                </div>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="px-3 py-2 bg-[#F7F3EC] border border-[#E5DCD1] rounded-xl text-xs font-bold text-[#241E1A] focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
                >
                  {RESTAURANT_CONFIG.tables.map((tbl) => (
                    <option key={tbl} value={tbl}>
                      {tbl}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-[#756B63] font-light">
                Our barista will bring your freshly crafted orders right to this table.
              </p>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-[#E5DCD1] space-y-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#756B63] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerDetails.name}
                    onChange={(e) =>
                      setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EC]/50 border border-[#E5DCD1] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#756B63] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={customerDetails.phone}
                    onChange={(e) =>
                      setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EC]/50 border border-[#E5DCD1] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
                  />
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="space-y-3 pt-2 border-t border-[#E5DCD1]/60">
                  <div>
                    <label className="block text-xs font-semibold text-[#756B63] mb-1">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Building, Flat No., Street, Area..."
                      value={customerDetails.address || ''}
                      onChange={(e) =>
                        setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="w-full px-3.5 py-2 bg-[#F7F3EC]/50 border border-[#E5DCD1] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      value={customerDetails.landmark || ''}
                      onChange={(e) =>
                        setCustomerDetails((prev) => ({ ...prev, landmark: e.target.value }))
                      }
                      className="flex-1 px-3.5 py-2 bg-[#F7F3EC]/50 border border-[#E5DCD1] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
                    />

                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border shrink-0 ${
                        customerDetails.locationUrl
                          ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32]'
                          : 'bg-white border-[#E5DCD1] text-[#756B63] hover:text-[#241E1A]'
                      }`}
                      title="Attach GPS Location via Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>
                        {isLocating
                          ? 'Locating...'
                          : customerDetails.locationUrl
                          ? 'GPS Attached'
                          : 'GPS Pin'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Special Cooking & Delivery Instructions */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#756B63] mb-1.5">
              Special Instructions / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Less sugar, extra hot, leave at security..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5DCD1] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
            />
          </div>

          {/* Payment Method Info (UPI removed as requested) */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5DCD1] space-y-1.5 shadow-2xs">
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#756B63]">
              Payment Mode
            </label>
            <div className="text-xs font-semibold text-[#241E1A] bg-[#F7F3EC] p-3 rounded-xl border border-[#E5DCD1]">
              {fulfillmentType === 'delivery'
                ? '💵 Cash on Delivery (Pay when order arrives)'
                : '💳 Pay at Counter (Card / Cash / UPI directly at café desk)'}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 bg-white rounded-2xl border border-[#E5DCD1] space-y-2 text-xs">
            <div className="flex justify-between text-[#756B63]">
              <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span className="font-semibold text-[#241E1A]">₹{subtotal}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-[#756B63]">
                <span>Delivery Service Charge</span>
                <span className="font-semibold text-[#241E1A]">₹{deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#241E1A] pt-2 border-t border-[#E5DCD1]">
              <span>Final Payable</span>
              <span className="text-[#B86B3D]">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer CTAs (WhatsApp & Phone Call Actions) */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E5DCD1] space-y-2.5 shrink-0">
          {/* Primary WhatsApp Dispatch Button */}
          <button
            type="button"
            onClick={handleOrderViaWhatsApp}
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            <span>Send Order via WhatsApp — ₹{grandTotal}</span>
          </button>

          {/* Secondary Direct Phone Call Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOrderViaCall}
              className="flex-1 py-3 px-3 bg-[#241E1A] hover:bg-black text-white rounded-2xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#B86B3D]" />
              <span>Call Café Directly ({RESTAURANT_CONFIG.displayPhoneNumber})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
