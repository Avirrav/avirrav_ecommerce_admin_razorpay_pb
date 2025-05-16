'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ALertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: ALertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-6 space-x-4 flex items-center justify-end w-full'>
        <Button 
          disabled={loading} 
          variant='outline' 
          onClick={onClose}
          className="rounded-lg border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200"
        >
          Cancel
        </Button>
        <Button 
          disabled={loading} 
          variant='destructive' 
          onClick={onConfirm}
          className={cn(
            "rounded-lg border-2 border-red-500/80",
            "neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200",
            "bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold"
          )}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
