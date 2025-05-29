'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { CategoryColumn, columns } from './columns';

interface CategoryClientProps {
  data: CategoryColumn[];
  billboardsCount: number;
}

export const CategoryClient = ({ data, billboardsCount }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories(${data.length})`}
          description='Manage categories of your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      
      {billboardsCount === 0 && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You need to create at least one billboard before you can create categories.
          </AlertDescription>
        </Alert>
      )}

      <Separator />
      <DataTable 
        searchKey='name' 
        columns={columns} 
        data={data} 
        entityName="categories"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title='API' description='API calls for Categories' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};