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
import { cn } from '@/lib/utils';

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
        <div className="p-4 rounded-lg border-2 border-primary/10 bg-accent/5">
          <div className="flex items-center space-x-3 mb-4 pb-2 border-b border-primary/10">
            <Store className="h-6 w-6 text-primary" />
            <h3 className="font-bold text-primary">New Store Details</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary/80 font-bold">Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-Commerce'
                        className="rounded-lg border-2 border-black focus:border-primary neo-shadow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-4 flex items-center justify-end w-full'>
                <Button
                  disabled={loading}
                  variant='outline'
                  onClick={storeModal.onClose}
                  className="rounded-lg border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  disabled={loading} 
                  type='submit'
                  className="rounded-lg border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200 bg-primary hover:bg-primary/90 text-white font-bold"
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
