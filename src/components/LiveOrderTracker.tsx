import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { buildDirectCallUrl, type OrderStatus } from '../utils/whatsapp';
import {
  Clock,
  Coffee,
  CheckCircle2,
  ChefHat,
  Bike,
  Phone,
  MessageCircle,
  Receipt,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

export const LiveOrderTracker: React.FC = () => {
  const {
    activeOrder,
    setActiveTab,
    setReceiptModalOrder,
    updateOrderStatus
  } = useCart();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!activeOrder) return;
    const interval = setInterval(() => {
      const createdTime = new Date(activeOrder.createdAt).getTime();
      const now = new Date().getTime();
      const diffSec = Math.max(0, Math.floor((now - createdTime) / 1000));
      setElapsedSeconds(diffSec);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeOrder]);

  if (!activeOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#E7D8C7]/50 text-[#B86B3D] flex items-center justify-center mx-auto">
          <Coffee className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#241E1A]">
          No Active Orders
        </h2>
        <p className="text-sm text-[#756B63] max-w-sm mx-auto">
          You don't have any ongoing orders right now. Explore our freshly brewed menu to place an order.
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="mt-4 px-6 py-3 bg-[#B86B3D] text-white rounded-full font-bold text-xs hover:bg-[#A05A30] transition-colors cursor-pointer"
        >
          Explore Café Menu
        </button>
      </div>
    );
  }

  const order = activeOrder;

  const steps: Array<{
    id: OrderStatus;
    label: string;
    description: string;
    icon: React.ElementType;
  }> = [
    {
      id: 'placed',
      label: 'Order Placed',
      description: 'Dispatched to barista via WhatsApp',
      icon: Clock
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      description: 'Acknowledged by café desk',
      icon: CheckCircle2
    },
    {
      id: 'preparing',
      label: 'Brewing & Crafting',
      description: 'Your drinks & food are being prepared',
      icon: ChefHat
    },
    {
      id: 'ready',
      label: order.fulfillmentType === 'delivery' ? 'Out for Delivery' : 'Ready to Serve',
      description:
        order.fulfillmentType === 'delivery'
          ? 'On the way to your doorstep'
          : order.fulfillmentType === 'takeaway'
          ? 'Ready at the pickup counter'
          : `Serving to Table ${order.tableNumber}`,
      icon: order.fulfillmentType === 'delivery' ? Bike : Coffee
    }
  ];

  const getStepIndex = (status: OrderStatus): number => {
    if (status === 'placed') return 0;
    if (status === 'confirmed') return 1;
    if (status === 'preparing') return 2;
    if (status === 'ready' || status === 'completed') return 3;
    return 0;
  };

  const currentStepIdx = getStepIndex(order.status);

  // Time calculations
  const totalEstimatedMins = 18;
  const remainingMinutes = Math.max(0, totalEstimatedMins - Math.floor(elapsedSeconds / 60));

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_CONFIG.name}! Inquiring about the live status of my Order #${order.orderId} (${order.fulfillmentType}).`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleAdvanceDemoStatus = () => {
    const sequence: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'ready', 'completed'];
    const nextIdx = (sequence.indexOf(order.status) + 1) % sequence.length;
    updateOrderStatus(order.orderId, sequence[nextIdx]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DCD1] shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5DCD1] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B86B3D]">
              Live Order Tracker
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#241E1A] mt-0.5">
              Order #{order.orderId}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#756B63] block">Fulfillment</span>
            <span className="text-xs font-bold text-[#241E1A] uppercase bg-[#F7F3EC] px-2.5 py-1 rounded-full border border-[#E5DCD1]">
              {order.fulfillmentType === 'dine-in'
                ? `Table ${order.tableNumber}`
                : order.fulfillmentType}
            </span>
          </div>
        </div>

        {/* Dynamic Estimated Time Countdown */}
        <div className="bg-gradient-to-br from-[#F7F3EC] to-[#EFE9DF] rounded-2xl p-5 border border-[#E5DCD1] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white text-[#B86B3D] flex items-center justify-center shadow-2xs">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs text-[#756B63] block">Estimated Wait</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#241E1A]">
                {order.status === 'ready'
                  ? 'Ready Now!'
                  : order.status === 'completed'
                  ? 'Completed'
                  : `~${remainingMinutes} mins`}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#756B63] block">Order Amount</span>
            <span className="font-sans text-lg font-bold text-[#B86B3D]">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Stepper Progression */}
        <div className="space-y-6 pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-10 w-0.5 h-10 transition-colors ${
                      idx < currentStepIdx ? 'bg-[#2E7D32]' : 'bg-[#E5DCD1]'
                    }`}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    isCompleted
                      ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-white border-[#B86B3D] text-[#B86B3D] ring-4 ring-[#B86B3D]/20 animate-pulse'
                      : 'bg-white border-[#D8C7B5] text-[#756B63]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Step Text */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-[#B86B3D]'
                          : isCompleted
                          ? 'text-[#241E1A]'
                          : 'text-[#756B63]'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#B86B3D]/10 text-[#B86B3D] rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#756B63] font-light mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact & Action Buttons */}
        <div className="pt-4 border-t border-[#E5DCD1] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>WhatsApp Café Desk</span>
            </button>

            <a
              href={buildDirectCallUrl(RESTAURANT_CONFIG.telNumber)}
              className="w-full py-3 px-4 rounded-xl bg-[#241E1A] hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#B86B3D]" />
              <span>Call Café ({RESTAURANT_CONFIG.displayPhoneNumber})</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setReceiptModalOrder(order)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-[#E5DCD1] bg-white hover:bg-[#F7F3EC] text-xs font-semibold text-[#241E1A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-[#B86B3D]" />
              <span>View Bill / Receipt</span>
            </button>

            <button
              onClick={handleAdvanceDemoStatus}
              className="py-2.5 px-3 rounded-xl border border-[#D8C7B5] bg-[#F7F3EC] hover:bg-[#E7D8C7] text-xs font-semibold text-[#756B63] hover:text-[#241E1A] transition-colors flex items-center gap-1 cursor-pointer"
              title="Test status changes without waiting for kitchen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Simulate Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Return to Menu Button */}
      <button
        onClick={() => setActiveTab('menu')}
        className="w-full py-3.5 rounded-2xl bg-white border border-[#E5DCD1] text-xs font-bold text-[#241E1A] hover:bg-[#F7F3EC] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <span>Add More Items / Explore Menu</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
