'use client';

import { Plus, Package } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';
import StockModal  from '@/components/ui/stock-modal';

import { ProductColumn, columns } from './columns';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient = ({ data }: ProductsClientProps) => {
  const router = useRouter();
  const params = useParams();
  const [showStockModal, setShowStockModal] = useState(false);
console.log('data', data);
  return (
    <>
      <StockModal
        isOpen={showStockModal}
        onClose={() => setShowStockModal(false)}
        products={data}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products(${data.length})`}
          description='Manage products of your store'
        />
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowStockModal(true)}
            variant="outline"
            size="icon"
          >
            <Package className="h-4 w-4" />
          </Button>
          <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
            <Plus className='mr-2 h-4 w-4' />
            Add new
          </Button>
        </div>
      </div>

      <Separator />
      <DataTable
        searchKey='name'
        columns={columns}
        data={data}
        entityName="products"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title='API' description='API calls for Products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};