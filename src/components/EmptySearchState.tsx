import React from 'react';
import { useCart } from '../context/CartContext';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptySearchState: React.FC = () => {
  const { searchQuery, setSearchQuery, setActiveCategory } = useCart();

  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="py-16 text-center max-w-md mx-auto px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-[#E7D8C7]/50 text-[#756B63] flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8 stroke-1.5" />
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241E1A]">
        No matches found for "{searchQuery}"
      </h3>
      <p className="mt-2 text-sm text-[#756B63] font-light leading-relaxed">
        Try searching for another coffee, signature drink, tea or food item.
      </p>
      <button
        onClick={handleReset}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#B86B3D] text-white hover:bg-[#A05A30] transition-colors cursor-pointer shadow-xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear Search & Show All Items</span>
      </button>
    </div>
  );
};
