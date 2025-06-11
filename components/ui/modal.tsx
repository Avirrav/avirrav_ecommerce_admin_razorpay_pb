'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn("p-6 rounded-lg border border-gray-200 bg-white", className)}>
        <DialogHeader className="pb-4 mb-2 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold text-gray-900">{title}</DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};