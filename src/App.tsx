import React, { useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroIntro } from './components/HeroIntro';
import { SearchBar } from './components/SearchBar';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartFloatingBar } from './components/CartFloatingBar';
import { OrderSummary } from './components/OrderSummary';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { KitchenDisplayView } from './components/KitchenDisplayView';
import { DigitalReceiptModal } from './components/DigitalReceiptModal';
import { BottomNav } from './components/BottomNav';
import { ProfileView } from './components/ProfileView';
import { EmptySearchState } from './components/EmptySearchState';
import { VideoIntroLoader } from './components/VideoIntroLoader';
import { ScrollToTop } from './components/ScrollToTop';
import { MENU_ITEMS } from './data/menuData';
import type { MenuItem, Category } from './data/menuData';
import { RESTAURANT_CONFIG } from './config/restaurantConfig';

const MainMenuContent: React.FC = () => {
  const { activeCategory, searchQuery, dietaryFilter } = useCart();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      let matchesDietary = true;
      if (dietaryFilter !== 'all') {
        const text = `${item.name} ${item.description}`;
        const eggRegex = /\b(egg|eggs|omlette|omelette|scramble|scrambled|poached|benedict|frittata|fritata)\b/i;
        const isEgg = eggRegex.test(text);

        if (dietaryFilter === 'veg') {
          matchesDietary = item.isVegetarian;
        } else if (dietaryFilter === 'egg') {
          matchesDietary = isEgg;
        } else if (dietaryFilter === 'non-veg') {
          matchesDietary = !item.isVegetarian;
        }
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  const groupedCategories = useMemo(() => {
    const map: Map<Category, MenuItem[]> = new Map();

    filteredItems.forEach((item) => {
      const cat = item.category as Category;
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(item);
    });

    return map;
  }, [filteredItems]);

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 sm:pb-20 flex-1 overflow-x-hidden">
      <HeroIntro />
      <SearchBar />
      <CategoryNav />

      {filteredItems.length === 0 ? (
        <EmptySearchState />
      ) : (
        <div className="space-y-12">
          {Array.from(groupedCategories.entries()).map(([catName, items]) => (
            <section key={catName} className="scroll-mt-24" id={`category-${catName.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#241E1A]">
                  {catName}
                </h2>
                <div className="flex-1 h-[1px] bg-[#E5DCD1]"></div>
                <span className="text-xs text-[#756B63] font-medium font-sans">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

const AppViewSwitcher: React.FC = () => {
  const { activeTab } = useCart();

  return (
    <div className="flex-1 flex flex-col">
      {activeTab === 'home' || activeTab === 'menu' ? (
        <MainMenuContent />
      ) : activeTab === 'order' ? (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <OrderSummary isDrawer={false} />
        </main>
      ) : activeTab === 'tracking' ? (
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <LiveOrderTracker />
        </main>
      ) : activeTab === 'kitchen' ? (
        <main className="flex-1 w-full">
          <KitchenDisplayView />
        </main>
      ) : (
        <main className="flex-1">
          <ProfileView />
        </main>
      )}
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <VideoIntroLoader />
      <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#241E1A] font-sans antialiased selection:bg-[#B86B3D] selection:text-white w-full max-w-full overflow-x-hidden">
        <Header />
        <AppViewSwitcher />

        <ProductDetailModal />
        <CartFloatingBar />
        <OrderSummary isDrawer={true} />
        <CheckoutModal />
        <DigitalReceiptModal />
        <ScrollToTop />

        <BottomNav />

        <footer className="border-t border-[#E5DCD1] bg-[#FAF6F0] py-8 text-center text-xs text-[#756B63] mb-14 sm:mb-0 print:hidden">
          <div className="max-w-6xl mx-auto px-4">
            <span className="font-serif font-bold text-sm tracking-wider uppercase text-[#241E1A] block mb-1">
              {RESTAURANT_CONFIG.name}
            </span>
            <p className="font-light">
              Crafted with care • WhatsApp: {RESTAURANT_CONFIG.displayPhoneNumber} • Good moments.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
