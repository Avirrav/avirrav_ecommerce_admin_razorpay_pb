'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, AlertTriangle } from 'lucide-react';

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

export const PlanBadge = () => {
  const { user, isLoaded } = useUser();
  const [planName, setPlanName] = useState<string>('Free');

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata as UserMetadata;
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
      case 'Expired':
        return <AlertTriangle className="h-3 w-3" />;
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
        return 'outline';
    }
  };

  const getPlanStyles = () => {
    switch (planName) {
      case 'Trial':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case 'Basic':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  if (!isLoaded) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${getPlanStyles()}`}>
      {getPlanIcon()}
      <span className="font-semibold">{planName}</span>
    </div>
  );
};