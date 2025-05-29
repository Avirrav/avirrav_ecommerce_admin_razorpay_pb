'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { BillboardColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards(${data.length})`}
          description='Manage billboards of your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You can&apos;t delete billboard while it&apos;s still in use. Remove it from all assigned locations first.
        </AlertDescription>
      </Alert>
      <Separator />
      <DataTable 
        searchKey='label' 
        columns={columns} 
        data={data} 
        entityName="billboards"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title='API' description='API calls for Billboards' />
      <Separator />
      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  );
};