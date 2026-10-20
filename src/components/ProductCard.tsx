import React, { useState } from 'react';
import type { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Plus, Check, SlidersHorizontal, Heart, MoreVertical } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { addToCart, openProductDetail } = useCart();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isCustomizable) {
      openProductDetail(item);
    } else {
      addToCart(item, {});
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1200);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openProductDetail(item);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E5DCD1] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#B86B3D]/40 hover:shadow-md cursor-pointer shadow-2xs sm:shadow-xs">
      
      {/* MOBILE CARD VIEW (Matches wireframe in Image 2) */}
      <div className="block sm:hidden" onClick={() => openProductDetail(item)}>
        {/* Food Image Container with proper height constraint and aspect ratio */}
        <div className="relative w-full h-44 sm:h-auto aspect-[16/10] overflow-hidden bg-[#F0E6D8]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Dietary Indicator Badge - Top Left */}
          {item.isVegetarian ? (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]"></div>
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Non-Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]"></div>
            </div>
          )}

          {/* Customisable Badge - Top Right */}
          {item.isCustomizable && (
            <div className="absolute top-3 right-3 bg-[#241E1A]/80 backdrop-blur-md text-[#F7F3EC] text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-2.5 h-2.5" />
              <span>Customisable</span>
            </div>
          )}

          {/* Image Bottom-Right Overlay Controls (♡ Heart & ⋮ 3 Dots) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
            <button
              onClick={handleFavoriteClick}
              className="p-0.5 text-white/90 hover:text-white focus:outline-none transition-transform active:scale-125"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
                }`}
              />
            </button>
            <button
              onClick={handleMoreClick}
              className="p-0.5 text-white/90 hover:text-white focus:outline-none"
              title="More options / Details"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Content Area below Image */}
        <div className="p-4 flex flex-col justify-between">
          {/* Top Row: Name on Left, Price on Right */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-base font-bold text-[#241E1A] line-clamp-1 flex-1">
              {item.name}
            </h3>
            <span className="text-base font-bold text-[#241E1A] shrink-0">
              ₹{item.price}
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 text-xs text-[#756B63] line-clamp-2 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Bottom Right Aligned [+ ADD] Button */}
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleAddClick}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 focus:outline-none cursor-pointer ${
                addedAnimation
                  ? 'bg-[#2E7D32] text-white scale-105'
                  : 'bg-[#B86B3D] text-white hover:bg-[#A05A30] active:scale-95 shadow-2xs'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP CARD VIEW (100% Preserved & Unchanged) */}
      <div className="hidden sm:flex flex-col justify-between h-full" onClick={() => openProductDetail(item)}>
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F0E6D8]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
          />

          {item.isVegetarian ? (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] border border-[#2E7D32]"></div>
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Non-Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] border border-[#D32F2F]"></div>
            </div>
          )}

          {item.isCustomizable && (
            <div className="absolute top-3 right-3 bg-[#241E1A]/80 backdrop-blur-md text-[#F7F3EC] text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-2.5 h-2.5" />
              <span>Customisable</span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#241E1A] group-hover:text-[#B86B3D] transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-[#756B63] line-clamp-2 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5DCD1]/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#756B63] font-medium uppercase tracking-wider block">Price</span>
              <span className="text-lg font-semibold text-[#241E1A]">
                ₹{item.price}
              </span>
            </div>

            <button
              onClick={handleAddClick}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 focus:outline-none cursor-pointer ${
                addedAnimation
                  ? 'bg-[#2E7D32] text-white scale-105'
                  : 'bg-[#B86B3D] text-white hover:bg-[#A05A30] active:scale-95 shadow-2xs'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

