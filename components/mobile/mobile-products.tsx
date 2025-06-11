'use client';

import { Package, Star, Archive, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  stockQuantity: number;
}

interface MobileProductsProps {
  products: Product[];
}

export const MobileProducts = ({ products }: MobileProductsProps) => {
  const getStockStatus = (quantity: number) => {
    if (quantity > 10) return { 
      label: 'In Stock', 
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle className="h-3 w-3" />
    };
    if (quantity > 0) return { 
      label: 'Low Stock', 
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: <AlertTriangle className="h-3 w-3" />
    };
    return { 
      label: 'Out of Stock', 
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: <XCircle className="h-3 w-3" />
    };
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header - Polaris Style */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-50 rounded-lg mr-3">
              <Package className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Products</h2>
              <p className="text-sm text-gray-600">Manage your product catalog</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            <p className="text-xs text-gray-500">Total Products</p>
          </div>
        </div>
      </div>

      {/* Products List - Polaris Design */}
      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="p-4 bg-gray-50 rounded-xl mx-auto mb-4 w-fit">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
            <p className="text-sm text-gray-600">Add products to start selling in your store.</p>
          </div>
        ) : (
          products.map((product) => {
            const stockStatus = getStockStatus(product.stockQuantity);
            
            return (
              <div key={product.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      {product.isFeatured && (
                        <div className="p-1 bg-yellow-50 rounded-lg">
                          <Star className="h-3 w-3 text-yellow-600 fill-current" />
                        </div>
                      )}
                      {product.isArchived && (
                        <div className="p-1 bg-gray-50 rounded-lg">
                          <Archive className="h-3 w-3 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                      <span>•</span>
                      <span>{product.size}</span>
                      <span>•</span>
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-bold text-gray-900">{product.price}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border mt-1 ${stockStatus.color}`}>
                      {stockStatus.icon}
                      <span className="ml-1">{stockStatus.label}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: product.color }}
                        title={`Color: ${product.color}`}
                      />
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        Stock: {product.stockQuantity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {product.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        ⭐ Featured
                      </span>
                    )}
                    {product.isArchived && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                        📦 Archived
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};