'use client';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

import { OrderColumn, columns } from './columns';

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Orders (${data.length})`}
          description='Manage orders for your store'
        />
      </div>
      <Separator />
      <DataTable 
        searchKey="products" 
        columns={columns} 
        data={data} 
        entityName="orders"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title="API" description="API calls for Orders" />
      <Separator />
      <ApiList entityName="orders" entityIdName="orderId" />
    </>
  );
};