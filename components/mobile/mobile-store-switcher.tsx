'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useParams, useRouter } from 'next/navigation';

interface MobileStoreSwitcherProps {
  items: Array<{
    id: string;
    name: string;
  }>;
}

export const MobileStoreSwitcher = ({ items = [] }: MobileStoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='default'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className="w-full justify-between h-11 text-base rounded-xl border-gray-200 hover:border-gray-300 transition-colors font-semibold"
        >
          <div className="flex items-center">
            <div className="p-1 bg-indigo-50 rounded-lg mr-3">
              <Store className='h-4 w-4 text-indigo-600' />
            </div>
            <span className="font-semibold truncate flex-1 text-left text-gray-900 text-base">
              {currentStore?.label || 'Select Store'}
            </span>
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 text-gray-500' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 bg-white border border-gray-200 shadow-xl rounded-xl'>
        <Command className="bg-white rounded-xl">
          <CommandList>
            <CommandInput 
              placeholder='Search stores...' 
              className="font-medium border-0 focus:ring-0 text-gray-900 text-base" 
            />
            <CommandEmpty className="text-center py-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <Store className="h-8 w-8 text-gray-400 mb-2" />
                <p className="font-medium">No stores found</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading='Your Stores' className="font-semibold text-gray-700 p-2">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className='text-base font-semibold hover:bg-gray-50 text-gray-900 cursor-pointer rounded-lg p-3 m-1'
                >
                  <div className="flex items-center w-full">
                    <div className="p-1 bg-gray-100 rounded-lg mr-3">
                      <Store className='h-4 w-4 text-gray-600' />
                    </div>
                    <span className="flex-1 font-semibold text-gray-900 text-base">{store.label}</span>
                    <Check
                      className={cn(
                        'h-4 w-4 text-indigo-600 font-bold',
                        currentStore?.value === store.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};