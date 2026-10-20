import React, { createContext, useContext, useState, useMemo } from 'react';
import type { MenuItem, Category } from '../data/menuData';

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

interface CartContextType {
  tableNumber: string;
  setTableNumber: (table: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, selectedCustomizations: SelectedCustomization, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  
  // Navigation & UI state
  activeTab: 'home' | 'menu' | 'order' | 'profile';
  setActiveTab: (tab: 'home' | 'menu' | 'order' | 'profile') => void;
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

  // Order confirmation state
  orderPlaced: boolean;
  placeOrder: () => void;
  resetOrderPlaced: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tableNumber, setTableNumber] = useState('NSZ 5');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'order' | 'profile'>('menu');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg'>('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Helper to compute unit price considering extra option costs
  const computeUnitPrice = (item: MenuItem, customizations: SelectedCustomization): number => {
    let price = item.price;
    if (item.customizationOptions) {
      item.customizationOptions.forEach(opt => {
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
    
    // Create unique key for item + customization combo
    const customKey = Object.entries(customizations)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const cartItemId = `${item.id}_${customKey}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(ci => ci.cartItemId === cartItemId);
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
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(ci => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(ci => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, ci) => acc + ci.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);
  }, [cart]);

  const openProductDetail = (product: MenuItem) => setSelectedProduct(product);
  const closeProductDetail = () => setSelectedProduct(null);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setCart([]);
  };

  const resetOrderPlaced = () => setOrderPlaced(false);

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
        totalItemsCount,
        subtotal,
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
        orderPlaced,
        placeOrder,
        resetOrderPlaced
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
