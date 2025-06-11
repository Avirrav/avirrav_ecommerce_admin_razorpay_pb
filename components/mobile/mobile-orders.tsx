'use client';

import { format } from 'date-fns';
import { ShoppingCart, Clock, CheckCircle, XCircle, Package, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  paymentStatus: string;
  orderStatus: string;
}

interface MobileOrdersProps {
  orders: Order[];
}

export const MobileOrders = ({ orders }: MobileOrdersProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'shipped':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'confirmed':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'confirmed':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header - Polaris Style */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
              <p className="text-sm text-gray-600">Manage your customer orders</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-xs text-gray-500">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Orders List - Polaris Design */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="p-4 bg-gray-50 rounded-xl mx-auto mb-4 w-fit">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-sm text-gray-600">Orders will appear here when customers make purchases.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {order.products}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    <span className="flex items-center">
                      📞 {order.phone}
                    </span>
                    <span>•</span>
                    <span>{order.createdAt}</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-lg font-bold text-gray-900">{order.totalPrice}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border mt-1 ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    <span className="ml-1 capitalize">{order.orderStatus}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
                    order.isPaid 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {order.isPaid ? '✓ Paid' : '⏳ Unpaid'}
                  </span>
                  <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate max-w-[120px] bg-gray-50 px-2 py-1 rounded-lg">
                  📍 {order.address}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};