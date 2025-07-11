'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useStoreLimits } from '@/hooks/use-store-limits';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const { user, isLoaded } = useUser();
  const storeLimits = useStoreLimits(0); // 0 stores since this is the setup page

  useEffect(() => {
    if (isLoaded && user && !isOpen && !storeLimits.isLoading) {
      // Only open modal if user can create stores
      if (storeLimits.canCreateStore) {
        onOpen();
      }
      // If user can't create stores, the SubscriptionGuard will handle showing upgrade screen
    }
  }, [isLoaded, user, isOpen, onOpen, storeLimits.canCreateStore, storeLimits.isLoading]);

  return null;
}