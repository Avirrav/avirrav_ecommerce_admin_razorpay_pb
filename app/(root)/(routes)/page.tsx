'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user && !isOpen) {
      // Check if user is subscribed
      const isSubscribed = user.publicMetadata?.isSubscribed || false;
      const planDetails = user.publicMetadata?.planDetails;
      
      if (isSubscribed && planDetails) {
        // Check if subscription is expired
        if (planDetails.subscriptionEndDate) {
          const endDate = new Date(planDetails.subscriptionEndDate);
          const now = new Date();
          if (now <= endDate) {
            onOpen();
            return;
          }
        }
      }
      
      // If not subscribed or expired, the SubscriptionGuard will handle it
      onOpen();
    }
  }, [isLoaded, user, isOpen, onOpen]);

  return null;
}