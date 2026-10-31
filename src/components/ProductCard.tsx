import React, { useState } from 'react';
import type { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Plus, Minus, SlidersHorizontal, Heart, MoreVertical } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { openProductDetail, getItemQuantity, incrementItem, decrementItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const quantity = getItemQuantity(item.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementItem(item);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementItem(item);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    decrementItem(item.id);
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
    <div className="group bg-white rounded-2xl border border-[#E5DCD1] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#B86B3D]/40 hover:shadow-md cursor-pointer shadow-2xs sm:shadow-xs">
      
      {/* MOBILE CARD VIEW */}
      <div className="block sm:hidden" onClick={() => openProductDetail(item)}>
        {/* Food Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0E6D8]">
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

          {/* Image Bottom-Right Overlay Controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
            <button
              onClick={handleFavoriteClick}
              className="p-0.5 text-white/90 hover:text-white focus:outline-none transition-transform active:scale-125"
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-base font-bold text-[#241E1A] line-clamp-1 flex-1">
              {item.name}
            </h3>
            <span className="text-base font-bold text-[#241E1A] shrink-0 font-sans">
              ₹{item.price}
            </span>
          </div>

          <p className="mt-1 text-xs text-[#756B63] line-clamp-2 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Bottom Action Area: + ADD vs [- 1 +] */}
          <div className="mt-3.5 flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#756B63] font-medium font-sans">
              ₹{item.price}
            </span>

            {quantity > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center bg-[#241E1A] text-white rounded-xl overflow-hidden shadow-xs border border-[#B86B3D]/30"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-2.5 py-1.5 text-[#E7D8C7] hover:text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  title="Decrease count"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center select-none font-mono">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-2.5 py-1.5 text-[#E7D8C7] hover:text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  title="Increase count"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#B86B3D] text-white hover:bg-[#A05A30] active:scale-95 transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP CARD VIEW */}
      <div className="hidden sm:flex flex-col justify-between h-full" onClick={() => openProductDetail(item)}>
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F0E6D8]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-104"
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
              <span className="text-lg font-semibold text-[#241E1A] font-sans">
                ₹{item.price}
              </span>
            </div>

            {/* Stepper pill [- 1 +] or [+ Add] */}
            {quantity > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center bg-[#241E1A] text-white rounded-xl overflow-hidden shadow-xs border border-[#B86B3D]/30"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-3 py-2 text-[#E7D8C7] hover:text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  title="Decrease count"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                <span className="px-2.5 text-sm font-bold text-white min-w-[24px] text-center select-none font-mono">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-3 py-2 text-[#E7D8C7] hover:text-white hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  title="Increase count"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-[#B86B3D] text-white hover:bg-[#A05A30] active:scale-95 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
