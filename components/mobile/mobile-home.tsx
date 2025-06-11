'use client';

import { DollarSign, ShoppingCart, Package, Store, TrendingUp, BarChart3 } from 'lucide-react';
import { MobileStatsCard } from './mobile-stats-card';
import { MobileStoreSwitcher } from './mobile-store-switcher';

interface MobileHomeProps {
  totalRevenue: string;
  salesCount: number;
  stockCount: number;
  stores: any[];
  onQuickAction: (action: string) => void;
}

export const MobileHome = ({ 
  totalRevenue, 
  salesCount, 
  stockCount, 
  stores,
  onQuickAction 
}: MobileHomeProps) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header with Store Switcher - Polaris Style */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-600">Overview of your business</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Store</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Active</span>
          </div>
          <MobileStoreSwitcher items={stores} />
        </div>
      </div>

      {/* Stats Cards - Polaris Design */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900 px-1">Key Metrics</h3>
        <div className="grid grid-cols-1 gap-4">
          <MobileStatsCard
            title="Total Revenue"
            value={totalRevenue}
            icon={DollarSign}
            color="green"
          />
          <MobileStatsCard
            title="Total Orders"
            value={salesCount.toString()}
            icon={ShoppingCart}
            color="blue"
          />
          <MobileStatsCard
            title="Stock Items"
            value={stockCount.toString()}
            icon={Package}
            color="purple"
          />
        </div>
      </div>

      {/* Quick Actions - Improved Polaris Style */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onQuickAction('orders')}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left hover:bg-blue-100 transition-all duration-200 active:scale-95"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-700">View Orders</p>
                <p className="text-xs text-blue-600 mt-1">{salesCount} orders</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onQuickAction('products')}
            className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-left hover:bg-indigo-100 transition-all duration-200 active:scale-95"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-700">View Products</p>
                <p className="text-xs text-indigo-600 mt-1">{stockCount} in stock</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Notice - Polaris Style */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Store className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-indigo-900 mb-1">Mobile Dashboard</h3>
            <p className="text-xs text-indigo-700 leading-relaxed">
              You&apos;re using the mobile-optimized dashboard. For full admin features and editing capabilities, please use the desktop version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};