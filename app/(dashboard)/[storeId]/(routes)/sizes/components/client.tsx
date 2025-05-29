'use client';

import { AlertCircle, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

import { SizeColumn, columns } from './columns';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient = ({ data }: SizesClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes(${data.length})`}
          description='Manage Sizes of your Products'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please add a default key in the configuration with the value 0 to ensure consistent fallback behavior.
        </AlertDescription>
      </Alert >
      <Separator />
      <DataTable
        searchKey='name'
        columns={columns}
        data={data}
        entityName="sizes"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title='API' description='API calls for sizes' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizesId' />
    </>
  );
};