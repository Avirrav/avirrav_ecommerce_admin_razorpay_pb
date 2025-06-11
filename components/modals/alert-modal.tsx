'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

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
      <div className='pt-6 space-x-3 flex items-center justify-end w-full'>
        <Button 
          disabled={loading} 
          variant='secondary' 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          disabled={loading} 
          variant='destructive' 
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};