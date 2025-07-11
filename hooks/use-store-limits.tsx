'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface PlanDetails {
  planName?: string;
  subscriptionEndDate?: string;
  storesAllowed?: number;
  productsAllowed?: number;
}

interface UserMetadata {
  isSubscribed?: boolean;
  planDetails?: PlanDetails;
}

interface StoreLimits {
  isSubscribed: boolean;
  storesAllowed: number;
  canCreateStore: boolean;
  isLoading: boolean;
  isExpired: boolean;
  planDetails: PlanDetails | null;
}

export const useStoreLimits = (currentStoreCount: number = 0): StoreLimits => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata as UserMetadata;
      const subscribed = metadata?.isSubscribed || false;
      const details = metadata?.planDetails || null;
      
      setIsSubscribed(subscribed);
      setPlanDetails(details);

      // Check if subscription is expired
      let expired = false;
      if (subscribed && details?.subscriptionEndDate) {
        const endDate = new Date(details.subscriptionEndDate);
        const now = new Date();
        expired = now > endDate;
      }
      
      setIsExpired(expired);
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  const storesAllowed = planDetails?.storesAllowed || 0;
  const canCreateStore = isSubscribed && 
                        !isExpired && 
                        (storesAllowed === -1 || currentStoreCount < storesAllowed);

  return {
    isSubscribed: isSubscribed && !isExpired,
    storesAllowed,
    canCreateStore,
    isLoading,
    isExpired,
    planDetails,
  };
};