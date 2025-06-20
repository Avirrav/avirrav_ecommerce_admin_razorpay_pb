'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { SubscriptionUpgrade } from './subscription-upgrade';
import { Loader } from '@/components/ui/loader';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredFeature?: 'store' | 'product';
  currentCount?: number;
}

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

export const SubscriptionGuard = ({ 
  children, 
  requiredFeature,
  currentCount = 0 
}: SubscriptionGuardProps) => {
  const { user, isLoaded } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata as UserMetadata;
      const subscribed = metadata?.isSubscribed || false;
      const details = metadata?.planDetails || null;
      
      setIsSubscribed(subscribed);
      setPlanDetails(details);
      setIsLoading(false);

      // Check if subscription is expired
      if (subscribed && details?.subscriptionEndDate) {
        const endDate = new Date(details.subscriptionEndDate);
        const now = new Date();
        if (now > endDate) {
          setIsSubscribed(false);
        }
      }
    }
  }, [isLoaded, user]);

  if (!isLoaded || isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader size="large" />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // If not subscribed, show upgrade screen
  if (!isSubscribed) {
    return <SubscriptionUpgrade />;
  }

  // Check feature limits
  if (requiredFeature && planDetails) {
    const { storesAllowed, productsAllowed } = planDetails;
    
    if (requiredFeature === 'store' && storesAllowed !== undefined && storesAllowed !== -1 && currentCount >= storesAllowed) {
      return <SubscriptionUpgrade message="You've reached your store limit. Upgrade to create more stores." />;
    }
    
    if (requiredFeature === 'product' && productsAllowed !== undefined && productsAllowed !== -1 && currentCount >= productsAllowed) {
      return <SubscriptionUpgrade message="You've reached your product limit. Upgrade to add more products." />;
    }
  }

  return <>{children}</>;
};