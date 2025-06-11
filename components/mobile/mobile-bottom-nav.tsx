'use client';

import { useState } from 'react';
import { Home, ShoppingCart, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileBottomNav = ({ activeTab, onTabChange }: MobileBottomNavProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-lg">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200 relative",
                "min-h-[44px] touch-manipulation",
                isActive 
                  ? "text-indigo-600 bg-indigo-50" 
                  : "text-gray-500 hover:text-gray-700 active:bg-gray-50"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-full" />
              )}
              
              <Icon className={cn(
                "h-5 w-5 transition-colors duration-200",
                isActive ? "text-indigo-600" : "text-gray-500"
              )} />
              <span className={cn(
                "text-xs font-medium transition-colors duration-200",
                isActive ? "text-indigo-600" : "text-gray-500"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};