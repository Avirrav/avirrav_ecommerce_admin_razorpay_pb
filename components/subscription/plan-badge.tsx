'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Crown, Star, Zap, AlertTriangle, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isExpired, setIsExpired] = useState(false);

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
            setIsExpired(true);
            return;
          }
        }
        setPlanName(planDetails.planName || 'Free');
        setIsExpired(false);
      } else {
        setPlanName('Free');
        setIsExpired(false);
      }
    }
  }, [isLoaded, user]);

  const getPlanConfig = () => {
    switch (planName) {
      case 'Trial':
        return {
          icon: Zap,
          label: 'Trial',
          className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
          iconColor: 'text-blue-600'
        };
      case 'Basic':
        return {
          icon: Star,
          label: 'Basic',
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
          iconColor: 'text-emerald-600'
        };
      case 'Advanced':
        return {
          icon: Crown,
          label: 'Advanced',
          className: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
          iconColor: 'text-purple-600'
        };
      case 'Expired':
        return {
          icon: AlertTriangle,
          label: 'Expired',
          className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
          iconColor: 'text-red-600'
        };
      default:
        return {
          icon: Shield,
          label: 'Free',
          className: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
          iconColor: 'text-gray-600'
        };
    }
  };

  if (!isLoaded) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-50 text-gray-400 border-gray-200 animate-pulse">
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        <span>Loading...</span>
      </div>
    );
  }

  const config = getPlanConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-default",
      config.className
    )}>
      <Icon className={cn("h-3 w-3", config.iconColor)} />
      <span className="font-semibold">{config.label}</span>
      {isExpired && (
        <Clock className="h-3 w-3 text-red-500 ml-0.5" />
      )}
    </div>
  );
};