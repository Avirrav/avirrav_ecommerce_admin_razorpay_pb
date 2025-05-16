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
    <div className="flex flex-col space-y-5 p-4 rounded-lg bg-muted/30 border-2 border-black neo-shadow">
      <div className="flex items-center space-x-2 pb-2 border-b-2 border-primary/20">
        <Code className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg">API Routes</h3>
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
