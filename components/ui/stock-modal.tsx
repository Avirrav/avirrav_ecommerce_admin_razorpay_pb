'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import { CheckCircle, AlertTriangle, XCircle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  products?: ProductColumn[];
  loading?: boolean;
}

const StockModal: React.FC<StockModalProps> = ({
  isOpen,
  onClose,
  products = [],
  loading = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'inStock') return product.stockQuantity > 10;
    if (selectedStatus === 'lowStock') return product.stockQuantity > 0 && product.stockQuantity <= 10;
    if (selectedStatus === 'outOfStock') return product.stockQuantity === 0;
    return true;
  });

  const getStockStatus = (quantity: number) => {
    if (quantity > 10) return { label: 'In Stock', color: 'text-green-700', bgColor: 'bg-green-50', icon: CheckCircle };
    if (quantity > 0) return { label: 'Low Stock', color: 'text-yellow-700', bgColor: 'bg-yellow-50', icon: AlertTriangle };
    return { label: 'Out of Stock', color: 'text-red-700', bgColor: 'bg-red-50', icon: XCircle };
  };

  const stockCounts = {
    total: products.length,
    inStock: products.filter(p => p.stockQuantity > 10).length,
    lowStock: products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 10).length,
    outOfStock: products.filter(p => p.stockQuantity === 0).length,
  };

  return (
    <Modal
      title="Stock Management"
      description="Monitor and manage your product inventory levels"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Stock Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">{stockCounts.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">In Stock</p>
                <p className="text-2xl font-bold text-green-900">{stockCounts.inStock}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900">{stockCounts.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-900">{stockCounts.outOfStock}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="flex justify-between items-center">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Products ({stockCounts.total})</option>
            <option value="inStock">In Stock ({stockCounts.inStock})</option>
            <option value="lowStock">Low Stock ({stockCounts.lowStock})</option>
            <option value="outOfStock">Out of Stock ({stockCounts.outOfStock})</option>
          </select>
          
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product.stockQuantity);
                  const StatusIcon = status.icon;
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{product.stockQuantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", status.bgColor)}>
                          <StatusIcon className="w-4 h-4 mr-1.5" />
                          <span className={status.color}>{status.label}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No products match the selected filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-6"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StockModal;