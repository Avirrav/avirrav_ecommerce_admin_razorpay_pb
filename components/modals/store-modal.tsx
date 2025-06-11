'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Store } from 'lucide-react';

import { useStoreModal } from '@/hooks/use-store-modal';
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
                        disabled={loading}
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
                  disabled={loading} 
                  type='submit'
                >
                  Create Store
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};