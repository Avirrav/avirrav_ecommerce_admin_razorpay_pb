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
      <div className="h-full w-full flex items-center justify-center min-h-[400px] bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Loading Dashboard</h3>
            <p className="text-sm text-muted-foreground animate-pulse">Verifying your subscription...</p>
          </div>
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