import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import type { SelectedCustomization } from '../context/CartContext';
import { X, Plus, Minus, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, closeProductDetail, addToCart } = useCart();
  const [customizations, setCustomizations] = useState<SelectedCustomization>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct && selectedProduct.customizationOptions) {
      const defaults: SelectedCustomization = {};
      selectedProduct.customizationOptions.forEach(opt => {
        if (opt.defaultChoice) {
          defaults[opt.name] = opt.defaultChoice;
        } else if (opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0];
        }
      });
      setCustomizations(defaults);
    } else {
      setCustomizations({});
    }
    setQuantity(1);
    setAdded(false);
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductDetail]);

  if (!selectedProduct) return null;

  let unitPrice = selectedProduct.price;
  if (selectedProduct.customizationOptions) {
    selectedProduct.customizationOptions.forEach(opt => {
      const val = customizations[opt.name];
      if (val && opt.extraPriceMap && opt.extraPriceMap[val]) {
        unitPrice += opt.extraPriceMap[val];
      }
    });
  }

  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (optionName: string, choice: string) => {
    setCustomizations(prev => ({ ...prev, [optionName]: choice }));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, customizations, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeProductDetail();
    }, 400);
  };

  return (
    <div 
      onClick={closeProductDetail}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E5DCD1] max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-slide-up sm:animate-modal-in"
      >
        <div className="relative aspect-16/9 bg-[#F0E6D8] overflow-hidden shrink-0">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          {selectedProduct.isVegetarian ? (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] border border-[#2E7D32]"></div>
            </div>
          ) : (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-1.5 rounded-md border border-gray-200/80 shadow-2xs" title="Non-Vegetarian">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] border border-[#D32F2F]"></div>
            </div>
          )}
          <button
            onClick={closeProductDetail}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#241E1A]">
                {selectedProduct.name}
              </h2>
              <span className="font-sans text-xl font-bold text-[#B86B3D]">
                ₹{unitPrice}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#756B63] font-light leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {selectedProduct.customizationOptions && selectedProduct.customizationOptions.length > 0 && (
            <div className="space-y-5 pt-4 border-t border-[#E5DCD1]/60">
              {selectedProduct.customizationOptions.map((opt) => (
                <div key={opt.name}>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#756B63] mb-2.5">
                    {opt.name}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {opt.choices.map((choice) => {
                      const isSelected = customizations[opt.name] === choice;
                      const extraCost = opt.extraPriceMap?.[choice];
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => handleOptionSelect(opt.name, choice)}
                          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#B86B3D] bg-[#B86B3D]/10 text-[#B86B3D]'
                              : 'border-[#E5DCD1] bg-[#F7F3EC]/50 text-[#241E1A] hover:bg-[#E7D8C7]/30'
                          }`}
                        >
                          <span className="truncate">{choice}</span>
                          {extraCost ? (
                            <span className="text-xs opacity-80">+₹{extraCost}</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 bg-[#F7F3EC]/70 border-t border-[#E5DCD1] flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 bg-white border border-[#E5DCD1] rounded-xl px-3 py-1.5 shadow-2xs">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-1 text-[#756B63] hover:text-[#241E1A] disabled:opacity-30 cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-sm w-4 text-center text-[#241E1A]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="p-1 text-[#756B63] hover:text-[#241E1A] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
              added ? 'bg-[#2E7D32]' : 'bg-[#B86B3D] hover:bg-[#A05A30] active:scale-[0.98]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Order</span>
              </>
            ) : (
              <span>Add to order — ₹{totalPrice}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
