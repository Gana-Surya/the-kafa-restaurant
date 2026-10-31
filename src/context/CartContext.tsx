import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { MenuItem, Category } from '../data/menuData';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import {
  generateOrderId,
  type PlacedOrder,
  type OrderFulfillmentType,
  type PaymentMethod,
  type OrderStatus,
  type CustomerDetails
} from '../utils/whatsapp';
import { soundManager } from '../utils/audio';

export interface SelectedCustomization {
  [key: string]: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedCustomizations: SelectedCustomization;
  quantity: number;
  unitPrice: number;
}

export type AppTab = 'home' | 'menu' | 'order' | 'profile' | 'tracking' | 'kitchen';

interface CartContextType {
  // Dine-in Table
  tableNumber: string;
  setTableNumber: (table: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, selectedCustomizations: SelectedCustomization, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  incrementItem: (item: MenuItem) => void;
  decrementItem: (itemId: string) => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;

  // Navigation & UI state
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dietaryFilter: 'all' | 'veg' | 'non-veg' | 'egg';
  setDietaryFilter: (filter: 'all' | 'veg' | 'non-veg' | 'egg') => void;

  // Product details modal
  selectedProduct: MenuItem | null;
  openProductDetail: (product: MenuItem) => void;
  closeProductDetail: () => void;

  // Cart summary modal/drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Customer & Fulfillment details
  fulfillmentType: OrderFulfillmentType;
  setFulfillmentType: (type: OrderFulfillmentType) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  specialInstructions: string;
  setSpecialInstructions: (notes: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;

  // Order Placement & Live Tracking
  orderPlaced: boolean;
  placeOrder: () => void;
  resetOrderPlaced: () => void;
  submitOrder: () => PlacedOrder;
  activeOrder: PlacedOrder | null;
  setActiveOrder: (order: PlacedOrder | null) => void;
  orderHistory: PlacedOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Receipt Modal
  receiptModalOrder: PlacedOrder | null;
  setReceiptModalOrder: (order: PlacedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const BROADCAST_CHANNEL_NAME = 'kafa_kitchen_channel';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial table from URL search params if present (?table=NSZ-5 or ?table=NSZ 5)
  const initialTable = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        return tableParam.trim();
      }
    }
    return RESTAURANT_CONFIG.tables[4] || 'NSZ 5';
  }, []);

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kafa_table_number');
      if (saved) return saved;
    }
    return initialTable;
  });

  // Cart initialized from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kafa_cart');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'kitchen' || params.get('mode') === 'kitchen') {
        return 'kitchen';
      }
    }
    return 'menu';
  });

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg'>('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Customer Checkout Details
  const [fulfillmentType, setFulfillmentType] = useState<OrderFulfillmentType>('dine-in');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kafa_customer_info');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return { name: '', phone: '', address: '', landmark: '', locationUrl: '' };
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('counter');

  // Active Order & History
  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kafa_active_order');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null;
  });

  const [orderHistory, setOrderHistory] = useState<PlacedOrder[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kafa_order_history');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [receiptModalOrder, setReceiptModalOrder] = useState<PlacedOrder | null>(null);

  // Persist cart
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kafa_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Persist table
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kafa_table_number', tableNumber);
    }
  }, [tableNumber]);

  // Persist customer details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kafa_customer_info', JSON.stringify(customerDetails));
    }
  }, [customerDetails]);

  // Persist active order
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (activeOrder) {
        localStorage.setItem('kafa_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('kafa_active_order');
      }
    }
  }, [activeOrder]);

  // Persist order history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kafa_order_history', JSON.stringify(orderHistory));
    }
  }, [orderHistory]);

  // Multi-tab real-time sync with BroadcastChannel
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'STATUS_UPDATE') {
        const { orderId, status, updatedAt } = data;
        setActiveOrder((prev) => {
          if (prev && prev.orderId === orderId) {
            soundManager.playSuccessSound();
            soundManager.triggerHaptic([60, 40, 60]);
            return { ...prev, status, statusUpdatedAt: updatedAt };
          }
          return prev;
        });

        setOrderHistory((prev) =>
          prev.map((ord) => (ord.orderId === orderId ? { ...ord, status, statusUpdatedAt: updatedAt } : ord))
        );
      } else if (data.type === 'NEW_ORDER') {
        const newOrder = data.order as PlacedOrder;
        setOrderHistory((prev) => {
          if (prev.some((o) => o.orderId === newOrder.orderId)) return prev;
          return [newOrder, ...prev];
        });
        soundManager.playKitchenAlert();
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // Helper to compute unit price considering extra option costs
  const computeUnitPrice = (item: MenuItem, customizations: SelectedCustomization): number => {
    let price = item.price;
    if (item.customizationOptions) {
      item.customizationOptions.forEach((opt) => {
        const choice = customizations[opt.name];
        if (choice && opt.extraPriceMap && opt.extraPriceMap[choice]) {
          price += opt.extraPriceMap[choice];
        }
      });
    }
    return price;
  };

  const addToCart = (item: MenuItem, customizations: SelectedCustomization, quantity = 1) => {
    const unitPrice = computeUnitPrice(item, customizations);

    const customKey = Object.entries(customizations)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const cartItemId = `${item.id}_${customKey}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          cartItemId,
          item,
          selectedCustomizations: customizations,
          quantity,
          unitPrice
        }
      ];
    });

    soundManager.triggerHaptic(35);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
    soundManager.triggerHaptic(20);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
    soundManager.triggerHaptic(25);
  };

  const clearCart = () => setCart([]);

  // Instant O(1) quantity map
  const itemQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const ci of cart) {
      map.set(ci.item.id, (map.get(ci.item.id) || 0) + ci.quantity);
    }
    return map;
  }, [cart]);

  const getItemQuantity = (itemId: string): number => {
    return itemQuantityMap.get(itemId) || 0;
  };

  const incrementItem = (item: MenuItem) => {
    if (item.isCustomizable && (!itemQuantityMap.has(item.id) || itemQuantityMap.get(item.id) === 0)) {
      openProductDetail(item);
      return;
    }

    const existing = cart.find((ci) => ci.item.id === item.id);
    if (existing) {
      updateQuantity(existing.cartItemId, 1);
    } else {
      addToCart(item, {}, 1);
    }
  };

  const decrementItem = (itemId: string) => {
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].item.id === itemId) {
        updateQuantity(cart[i].cartItemId, -1);
        break;
      }
    }
  };

  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, ci) => acc + ci.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    return fulfillmentType === 'delivery' && subtotal > 0 ? RESTAURANT_CONFIG.deliveryFee : 0;
  }, [fulfillmentType, subtotal]);

  const grandTotal = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  const openProductDetail = (product: MenuItem) => setSelectedProduct(product);
  const closeProductDetail = () => setSelectedProduct(null);

  // Submit complete order with receipt creation and broadcast
  const submitOrder = (): PlacedOrder => {
    const newOrderId = generateOrderId();
    const now = new Date().toISOString();

    const newOrder: PlacedOrder = {
      orderId: newOrderId,
      createdAt: now,
      items: [...cart],
      subtotal,
      deliveryFee,
      total: grandTotal,
      fulfillmentType,
      tableNumber: fulfillmentType === 'dine-in' ? tableNumber : undefined,
      customer: { ...customerDetails },
      specialInstructions: specialInstructions.trim() || undefined,
      paymentMethod,
      status: 'placed',
      statusUpdatedAt: now
    };

    setActiveOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);
    setCart([]);
    setOrderPlaced(true);

    soundManager.playOrderPlacedChime();
    soundManager.triggerHaptic([60, 30, 80]);

    // Broadcast new order to any open kitchen tabs/screens
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({ type: 'NEW_ORDER', order: newOrder });
        channel.close();
      } catch {}
    }

    return newOrder;
  };

  // Backwards-compatible mock placeOrder
  const placeOrder = () => {
    if (cart.length === 0) return;
    submitOrder();
  };

  const resetOrderPlaced = () => setOrderPlaced(false);

  // Update status (used by Kitchen Display or Simulation)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const now = new Date().toISOString();
    setActiveOrder((prev) => {
      if (prev && prev.orderId === orderId) {
        return { ...prev, status, statusUpdatedAt: now };
      }
      return prev;
    });

    setOrderHistory((prev) =>
      prev.map((ord) => (ord.orderId === orderId ? { ...ord, status, statusUpdatedAt: now } : ord))
    );

    // Broadcast status update
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({ type: 'STATUS_UPDATE', orderId, status, updatedAt: now });
        channel.close();
      } catch {}
    }
  };

  return (
    <CartContext.Provider
      value={{
        tableNumber,
        setTableNumber,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        incrementItem,
        decrementItem,
        totalItemsCount,
        subtotal,
        deliveryFee,
        grandTotal,
        activeTab,
        setActiveTab,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        dietaryFilter,
        setDietaryFilter,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        fulfillmentType,
        setFulfillmentType,
        customerDetails,
        setCustomerDetails,
        specialInstructions,
        setSpecialInstructions,
        paymentMethod,
        setPaymentMethod,
        orderPlaced,
        placeOrder,
        resetOrderPlaced,
        submitOrder,
        activeOrder,
        setActiveOrder,
        orderHistory,
        updateOrderStatus,
        receiptModalOrder,
        setReceiptModalOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
