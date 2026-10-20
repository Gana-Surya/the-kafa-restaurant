import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/menuData';
import type { Category } from '../data/menuData';
import { ChevronRight } from 'lucide-react';

const getCategoryIcon = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('coffee') || cat.includes('espresso')) return '☕';
  if (cat.includes('mousse') || cat.includes('dessert') || cat.includes('cake') || cat.includes('waffle')) return '🍮';
  if (cat.includes('snack') || cat.includes('bite') || cat.includes('starter') || cat.includes('appetizer')) return '🥪';
  if (cat.includes('pizza')) return '🍕';
  if (cat.includes('salad')) return '🥗';
  if (cat.includes('burger') || cat.includes('sandwich') || cat.includes('wrap')) return '🍔';
  if (cat.includes('pasta')) return '🍝';
  if (cat.includes('tea')) return '🍵';
  if (cat.includes('mocktail') || cat.includes('drink') || cat.includes('mojito') || cat.includes('shake')) return '🍹';
  if (cat.includes('breakfast')) return '🍳';
  if (cat.includes('sushi')) return '🍣';
  if (cat.includes('soup')) return '🥣';
  return '🍽️';
};

export const CategoryNav: React.FC = () => {
  const { activeCategory, setActiveCategory, searchQuery } = useCart();

  return (
    <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-8">
      {/* MOBILE CATEGORY NAV VIEW (Icon on top of text + right arrow indicator) */}
      <div className="flex sm:hidden items-center justify-between bg-white/60 backdrop-blur-sm border border-[#E5DCD1]/80 rounded-2xl p-2.5 shadow-2xs">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 px-1 flex-1 snap-x">
          {CATEGORIES.map((cat: Category) => {
            const isActive = activeCategory === cat && !searchQuery;
            const icon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#B86B3D] text-white shadow-xs scale-[1.03]'
                    : 'hover:bg-[#E7D8C7]/50 text-[#756B63] hover:text-[#241E1A]'
                }`}
              >
                <span className="text-xl mb-1">{icon}</span>
                <span className="text-[11px] font-medium whitespace-nowrap tracking-tight">
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
        <div className="pl-2 pr-1 text-[#756B63] border-l border-[#E5DCD1]/60 shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* DESKTOP CATEGORY NAV VIEW (100% Preserved) */}
      <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 -mx-1 snap-x">
        {CATEGORIES.map((cat: Category) => {
          const isActive = activeCategory === cat && !searchQuery;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
              }}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#B86B3D] text-white shadow-sm scale-[1.02]'
                  : 'bg-white/70 hover:bg-[#E7D8C7]/60 text-[#756B63] hover:text-[#241E1A] border border-[#E5DCD1]/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

