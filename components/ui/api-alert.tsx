'use client';

import { toast } from 'react-hot-toast';
import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'public',
  admin: 'admin',
};
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('API route copied to clipboard');
  };
  return (
    <Alert>
      <Server className='h-5 w-5' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex items-center justify-between gap-x-4'>
        <div className='w-full'>
          <code className='relative block border-2 border-black rounded-md bg-muted px-3 py-2 font-mono text-sm font-bold'>
            {description}
          </code>
        </div>
        <Button variant='outline' size='icon' onClick={onCopy} className="flex-shrink-0">
          <Copy className='h-5 w-5' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
