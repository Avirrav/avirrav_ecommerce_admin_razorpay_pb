'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Store, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useStoreLimits } from '@/hooks/use-store-limits';
import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const [currentStoreCount, setCurrentStoreCount] = useState(0);
  const { user } = useUser();
  const storeLimits = useStoreLimits(currentStoreCount);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Fetch current store count when modal opens
  useEffect(() => {
    const fetchStoreCount = async () => {
      if (storeModal.isOpen && user) {
        try {
          const response = await axios.get('/api/stores');
          setCurrentStoreCount(response.data.length);
        } catch (error) {
          console.error('Error fetching store count:', error);
        }
      }
    };

    fetchStoreCount();
  }, [storeModal.isOpen, user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);
      console.log(response, "response");
      window.location.assign(`/${response.data.id}`);
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error(error.response.data || 'Store creation not allowed');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const isCreateDisabled = loading || !storeLimits.canCreateStore;
  const showLimitWarning = !storeLimits.isLoading && !storeLimits.canCreateStore;

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="mt-2">
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3 mb-4 pb-2 border-b border-gray-200">
            <Store className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-blue-600">New Store Details</h3>
          </div>

          {/* Store Limit Warning */}
          {showLimitWarning && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Store Limit Reached</p>
                  <p className="text-amber-700 mt-1">
                    {storeLimits.isExpired 
                      ? 'Your subscription has expired. Please renew to create stores.'
                      : !storeLimits.isSubscribed 
                        ? 'Please subscribe to create stores.'
                        : `You've reached your limit of ${storeLimits.storesAllowed} store${storeLimits.storesAllowed === 1 ? '' : 's'}. Upgrade your plan to create more stores.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Store Count Info */}
          {!storeLimits.isLoading && storeLimits.isSubscribed && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm text-blue-800">
                <p className="font-medium">Current Usage</p>
                <p className="mt-1">
                  {currentStoreCount} of {storeLimits.storesAllowed === -1 ? 'unlimited' : storeLimits.storesAllowed} stores used
                </p>
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || isCreateDisabled}
                        placeholder='E-Commerce'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-3 flex items-center justify-end w-full'>
                <Button
                  disabled={loading}
                  variant='secondary'
                  onClick={storeModal.onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  disabled={isCreateDisabled} 
                  type='submit'
                >
                  {loading ? 'Creating...' : 'Create Store'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};