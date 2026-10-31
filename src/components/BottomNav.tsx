import React from 'react';
import { useCart, type AppTab } from '../context/CartContext';
import { Coffee, ShoppingBag, MoreHorizontal, Clock, ChefHat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: AppTab;
  label: string;
  icon: LucideIcon;
  badge?: number;
  pulse?: boolean;
}

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, totalItemsCount, activeOrder } = useCart();

  const navItems: NavItem[] = [
    { id: 'menu', label: 'Menu', icon: Coffee },
    { id: 'order', label: 'Tray', icon: ShoppingBag, badge: totalItemsCount },
    ...(activeOrder && activeOrder.status !== 'completed'
      ? [
          {
            id: 'tracking' as AppTab,
            label: 'Track',
            icon: Clock,
            pulse: true
          }
        ]
      : []),
    { id: 'kitchen' as AppTab, label: 'Kitchen', icon: ChefHat },
    { id: 'profile', label: 'More', icon: MoreHorizontal }
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F3EC]/95 backdrop-blur-md border-t border-[#E5DCD1] px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#B86B3D] font-semibold'
                  : 'text-[#756B63] hover:text-[#241E1A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-1.5'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#B86B3D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F7F3EC]">
                    {item.badge}
                  </span>
                ) : null}
                {item.pulse && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
