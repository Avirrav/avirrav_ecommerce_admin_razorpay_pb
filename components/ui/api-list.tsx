'use client';

import { useOrigin } from '@/hooks/user-origin';
import { useParams } from 'next/navigation';
import { ApiAlert } from './api-alert';
import { Code } from 'lucide-react';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg bg-surface-subdued border border-border polaris-shadow">
      <div className="flex items-center space-x-2 pb-2 border-b border-border">
        <Code className="h-4 w-4 text-primary" />
        <h3 className="font-medium text-heading">API Routes</h3>
      </div>
      
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};