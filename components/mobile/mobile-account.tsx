'use client';

import { User, Store, CreditCard, Settings, Globe, LogOut, Shield, Clock } from 'lucide-react';
import { MobileAccountCard } from './mobile-account-card';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface Store {
  id: string;
  name: string;
  username?: string;
  apiUrl?: string;
  razorpayKeyId?: string;
}

interface MobileAccountProps {
  store: Store;
  user: any;
}

export const MobileAccount = ({ store, user }: MobileAccountProps) => {
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(() => {
        toast.success('Logged out successfully');
        window.location.href = '/sign-in';
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out. Please try again.');
      setIsLoggingOut(false);
    }
  };

  const userDetails = [
    { label: 'Email', value: user?.primaryEmailAddress?.emailAddress || 'Not available' },
    { label: 'User ID', value: user?.id || 'Not available' },
    { label: 'Account Status', value: 'Active' },
  ];

  const storeDetails = [
    { label: 'Store Name', value: store.name || 'Not set' },
    { label: 'Username', value: store.username || 'Not set' },
    { label: 'API URL', value: store.apiUrl || 'Not set' },
  ];

  const paymentDetails = [
    { label: 'Razorpay Key ID', value: store.razorpayKeyId ? '••••••••' + store.razorpayKeyId.slice(-4) : 'Not configured' },
    { label: 'Payment Status', value: store.razorpayKeyId ? 'Configured' : 'Not configured' },
    { label: 'Integration', value: store.razorpayKeyId ? 'Active' : 'Inactive' },
  ];

  const systemDetails = [
    { label: 'Store ID', value: store.id },
    { label: 'Account Type', value: 'Admin' },
    { label: 'Last Login', value: new Date().toLocaleDateString() },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header - Polaris Style */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
            <p className="text-sm text-gray-600">Manage your account and store information</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Verified Account</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Last updated today</span>
          </div>
        </div>
      </div>

      {/* Account Cards - Polaris Design */}
      <div className="space-y-4">
        <MobileAccountCard
          title="User Information"
          icon={User}
          items={userDetails}
        />

        <MobileAccountCard
          title="Store Details"
          icon={Store}
          items={storeDetails}
        />

        <MobileAccountCard
          title="Payment Configuration"
          icon={CreditCard}
          items={paymentDetails}
        />

        <MobileAccountCard
          title="System Information"
          icon={Settings}
          items={systemDetails}
        />
      </div>

      {/* Logout Section - Enhanced Polaris Style with Better Visibility */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Session Management</h3>
          <p className="text-sm text-gray-600">Securely sign out of your account</p>
        </div>
        
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="destructive"
          className="w-full flex items-center justify-center space-x-3 h-14 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoggingOut ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="font-bold text-lg">Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="h-6 w-6" />
              <span className="font-bold text-lg">Sign Out</span>
            </>
          )}
        </Button>
      </div>

      {/* Notice - Polaris Style */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Mobile View Notice</h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              You&apos;re viewing account settings in read-only mode. To make changes to your store settings, payment configuration, or user details, please use the desktop version of the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};