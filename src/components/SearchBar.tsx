import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Search, X, ChevronDown, ChevronUp, Check, SlidersHorizontal } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, dietaryFilter, setDietaryFilter, setActiveCategory } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact mode when scrolled past ~80px
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions: Array<{ id: 'all' | 'veg' | 'non-veg' | 'egg'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Veg' },
    { id: 'non-veg', label: 'Non-Veg' },
    { id: 'egg', label: 'Egg' }
  ];

  return (
    <div
      ref={dropdownRef}
      className={`relative z-20 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'py-2 bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-[#E5DCD1]/80 mb-2 sm:mb-4'
          : 'pt-1 pb-3 sm:py-2 bg-transparent mb-2 sm:mb-4'
      }`}
    >
      <div
        className={`w-full mx-auto px-4 transition-all duration-300 ease-in-out ${
          isScrolled ? 'max-w-lg sm:max-w-xl' : 'max-w-xl'
        }`}
      >
        {/* MOBILE SEARCH & FILTER BAR (Clean 100% original design with smooth compact transition) */}
        <div className="block sm:hidden relative w-full space-y-2">
          <div className="flex items-center gap-2">
            {/* Direct Mobile Search Input Bar */}
            <div
              className={`relative flex-1 flex items-center bg-white/90 backdrop-blur-sm border border-[#E5DCD1] rounded-xl px-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#B86B3D]/30 focus-within:border-[#B86B3D] transition-all duration-300 ease-in-out ${
                isScrolled ? 'h-9' : 'h-10'
              }`}
            >
              <Search className="w-4 h-4 text-[#756B63] mr-2 shrink-0 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full bg-transparent border-none focus:outline-none text-xs text-[#241E1A] placeholder-[#756B63]/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#756B63] hover:text-[#241E1A]"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button on Side */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ease-in-out cursor-pointer shrink-0 border ${
                isScrolled ? 'h-9' : 'h-10'
              } ${
                dietaryFilter !== 'all' || isOpen
                  ? 'bg-[#B86B3D] text-white border-[#B86B3D] shadow-2xs'
                  : 'bg-white text-[#241E1A] border-[#E5DCD1] shadow-2xs'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {dietaryFilter === 'all'
                  ? 'Filter'
                  : dietaryFilter === 'veg' ? 'Veg' : dietaryFilter === 'non-veg' ? 'Non-Veg' : 'Egg'}
              </span>
            </button>

            {/* Clear / Reset Filter Button if active */}
            {dietaryFilter !== 'all' && (
              <button
                onClick={() => {
                  setDietaryFilter('all');
                  setActiveCategory('All');
                }}
                className={`px-2.5 rounded-xl text-xs font-medium bg-gray-100 text-[#756B63] hover:bg-gray-200 flex items-center justify-center shrink-0 border border-[#E5DCD1] transition-all duration-300 ease-in-out cursor-pointer ${
                  isScrolled ? 'h-9' : 'h-10'
                }`}
                title="Reset Filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Dropdown Filter Options Modal */}
          {isOpen && (
            <div className="bg-white border border-[#E5DCD1] rounded-2xl p-2.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 flex flex-wrap gap-2 z-30 relative">
              {filterOptions.map((opt) => {
                const isSelected = dietaryFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setDietaryFilter(opt.id);
                      setActiveCategory('All');
                      setIsOpen(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#B86B3D] text-white shadow-xs'
                        : 'bg-[#F7F3EC] text-[#241E1A] hover:bg-[#E7D8C7]/50 border border-[#E5DCD1]'
                    }`}
                  >
                    {opt.id === 'veg' && <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>}
                    {opt.id === 'non-veg' && <span className="w-2 h-2 rounded-full bg-[#D32F2F]"></span>}
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* DESKTOP SEARCH & FILTER BAR (Clean 100% original design with smooth compact transition) */}
        <div className="hidden sm:flex items-center gap-2.5 relative w-full">
          <div
            className={`relative flex-1 min-w-0 flex items-center bg-white/90 backdrop-blur-sm border border-[#E5DCD1] rounded-xl shadow-xs focus-within:ring-2 focus-within:ring-[#B86B3D]/30 focus-within:border-[#B86B3D] transition-all duration-300 ease-in-out ${
              isScrolled ? 'h-9' : 'h-10'
            }`}
          >
            <div className="pl-3.5 pr-1.5 flex items-center justify-center shrink-0 pointer-events-none">
              <Search className="w-4.5 h-4.5 text-[#241E1A] stroke-[2.2]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, drinks, food..."
              className="w-full min-w-0 bg-transparent border-none focus:outline-none text-sm text-[#241E1A] placeholder-[#756B63]/70 pr-8 py-2"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 p-1 rounded-full text-[#756B63] hover:text-[#241E1A] hover:bg-[#E7D8C7]/50 focus:outline-none transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3.5 bg-white border border-[#E5DCD1] rounded-xl text-sm font-medium text-[#241E1A] hover:border-[#B86B3D]/50 focus:outline-none transition-all duration-300 ease-in-out flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isScrolled ? 'h-9' : 'h-10'
              } ${
                isOpen || dietaryFilter !== 'all' ? 'border-[#B86B3D] ring-2 ring-[#B86B3D]/20 text-[#B86B3D]' : ''
              }`}
            >
              <span>Filters</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-[#241E1A]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#756B63]" />
              )}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5DCD1] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="space-y-1">
                  {filterOptions.map((opt) => {
                    const isSelected = dietaryFilter === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setDietaryFilter(opt.id);
                          setActiveCategory('All');
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#F7F3EC]/80 text-[#B86B3D] font-medium'
                            : 'text-[#241E1A] hover:bg-[#F7F3EC]/50 font-normal'
                        }`}
                      >
                        <span className={isSelected ? 'text-[#B86B3D] font-medium' : 'text-[#241E1A]'}>
                          {opt.label}
                        </span>
                        <div
                          className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#B86B3D] bg-[#B86B3D] text-white'
                              : 'border-[#D8C7B5] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
