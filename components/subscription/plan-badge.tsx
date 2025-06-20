'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap } from 'lucide-react';

export const PlanBadge = () => {
  const { user, isLoaded } = useUser();
  const [planName, setPlanName] = useState<string>('Free');

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata;
      const isSubscribed = metadata?.isSubscribed || false;
      const planDetails = metadata?.planDetails;
      
      if (isSubscribed && planDetails) {
        // Check if subscription is expired
        if (planDetails.subscriptionEndDate) {
          const endDate = new Date(planDetails.subscriptionEndDate);
          const now = new Date();
          if (now > endDate) {
            setPlanName('Expired');
            return;
          }
        }
        setPlanName(planDetails.planName || 'Free');
      } else {
        setPlanName('Free');
      }
    }
  }, [isLoaded, user]);

  const getPlanIcon = () => {
    switch (planName) {
      case 'Trial':
        return <Zap className="h-3 w-3" />;
      case 'Basic':
        return <Star className="h-3 w-3" />;
      case 'Advanced':
        return <Crown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getPlanVariant = () => {
    switch (planName) {
      case 'Trial':
        return 'info';
      case 'Basic':
        return 'success';
      case 'Advanced':
        return 'warning';
      case 'Expired':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (!isLoaded) return null;

  return (
    <Badge variant={getPlanVariant() as any} className="flex items-center gap-1 text-xs">
      {getPlanIcon()}
      {planName}
    </Badge>
  );
};