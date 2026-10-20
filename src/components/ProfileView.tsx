import React from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Clock, Award, ChevronRight, Table } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { tableNumber, setTableNumber, setActiveTab } = useCart();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DCD1] shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#E7D8C7]/60 text-[#B86B3D] flex items-center justify-center font-serif text-2xl font-bold shrink-0">
          K
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#241E1A]">
            Café Guest
          </h2>
          <p className="text-xs text-[#756B63] mt-0.5">
            Dine-in Order • <span className="font-semibold text-[#241E1A]">Table {tableNumber}</span>
          </p>
        </div>
      </div>

      {/* Table Context & Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#241E1A] flex items-center gap-2">
          <Table className="w-5 h-5 text-[#B86B3D]" />
          <span>Dine-In Table Settings</span>
        </h3>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-[#756B63] uppercase tracking-wider block font-semibold">Active Table Code</span>
            <span className="text-sm font-bold text-[#241E1A]">Table {tableNumber}</span>
          </div>
          <select
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="px-3 py-2 bg-[#F7F3EC] border border-[#E5DCD1] rounded-xl text-xs font-semibold text-[#241E1A] focus:outline-none focus:ring-2 focus:ring-[#B86B3D]/30"
          >
            <option value="NSZ 5">NSZ 5 (Current)</option>
            <option value="NSZ 1">NSZ 1</option>
            <option value="NSZ 2">NSZ 2</option>
            <option value="NSZ 8">NSZ 8</option>
          </select>
        </div>
      </div>

      {/* KAFA Club Loyalty */}
      <div className="bg-gradient-to-br from-[#241E1A] to-[#3B302B] rounded-3xl p-6 text-[#F7F3EC] shadow-md relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white font-serif text-9xl pointer-events-none select-none">
          K
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#E7D8C7]">
            <Award className="w-5 h-5 text-[#B86B3D]" />
            <span className="text-xs uppercase tracking-widest font-semibold">KAFA Club Member</span>
          </div>
          <span className="text-xs bg-[#B86B3D] px-2.5 py-1 rounded-full font-bold">120 pts</span>
        </div>
        <h4 className="font-serif text-xl font-bold">
          Your next espresso is on us after 150 points
        </h4>
        <p className="mt-1 text-xs text-[#E7D8C7]/80 font-light">
          Earn 10 points for every beverage ordered.
        </p>
      </div>

      {/* Café Info */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5DCD1] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#241E1A]">
          About THE KAFA Store
        </h3>
        
        <div className="flex items-start gap-3 text-sm text-[#756B63]">
          <MapPin className="w-5 h-5 text-[#B86B3D] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#241E1A] block">Location</span>
            12 Specialty Coffee Boulevard, Artisan District
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-[#756B63] pt-3 border-t border-[#E5DCD1]/50">
          <Clock className="w-5 h-5 text-[#B86B3D] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#241E1A] block">Brewing Hours</span>
            Mon – Sun: 07:30 AM – 10:00 PM
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <button
        onClick={() => setActiveTab('menu')}
        className="w-full py-3.5 rounded-2xl bg-[#E7D8C7]/50 text-[#241E1A] font-bold text-sm hover:bg-[#E7D8C7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Return to Café Menu</span>
        <ChevronRight className="w-4 h-4" />
      </button>

    </div>
  );
};
