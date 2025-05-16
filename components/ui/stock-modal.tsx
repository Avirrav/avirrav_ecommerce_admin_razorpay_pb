'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
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

  return (
    <Modal
      title="Stock Levels"
      description="View and manage product stock levels"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 md:space-y-6 h-[60vh] md:h-[70vh] overflow-y-auto">
        <div className="mb-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={cn(
              "w-full md:w-48 p-2 rounded-lg border-2 border-black",
              "neo-shadow focus:outline-none focus:ring-2 focus:ring-primary",
              "text-sm font-medium bg-background"
            )}
          >
            <option value="all">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-lg border-2 border-black neo-shadow max-h-[80vh] md:max-h-[70vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-primary/20">
            <thead className="bg-accent/10 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-bold text-primary uppercase tracking-wider border-b-2 border-primary/20"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-bold text-primary uppercase tracking-wider border-b-2 border-primary/20"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-bold text-primary uppercase tracking-wider border-b-2 border-primary/20"
                >
                  Status
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-background divide-y divide-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-accent/5"
                >
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm font-medium text-foreground">
                    {product.name}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-foreground">
                    {product.stockQuantity}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm">
                    {product.stockQuantity > 10 ? (
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                        <span className="text-green-700 font-semibold">In Stock</span>
                      </div>
                    ) : product.stockQuantity > 0 ? (
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <ExclamationCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                        <span className="text-yellow-700 font-semibold">Low Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <XCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                        <span className="text-red-700 font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        <div className="pt-4 md:pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={onClose}
            className="rounded-lg border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200 text-sm md:text-base w-full md:w-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StockModal;