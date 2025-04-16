import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getItems: () => Product[];
}

const storeCache = new Map();

export const createCartStore = (username: string) => {
  if (!username) {
    username = 'defaultUsername';
  }

  // Check if store already exists in cache
  if (storeCache.has(username)) {
    return storeCache.get(username);
  }

  // Create new store if it doesn't exist
  const store = create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (data: Product) => {
          if (!data) return;
          
          const currentItems = get().items;
          const existingItem = currentItems.find((item) => item.id === data.id);

          if (existingItem) {
            return toast('Item already in cart.');
          }

          set({ items: [...currentItems, data] });
          toast.success('Item added to cart.');
        },
        removeItem: (id: string) => {
          if (!id) return;
          
          const currentItems = get().items;
          const updatedItems = currentItems.filter((item) => item.id !== id);
          
          set({ items: updatedItems });
          toast.success('Item removed from cart.');
        },
        removeAll: () => set({ items: [] }),
        getItems: () => get().items,
      }),
      {
        name: `cart-${username}`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

  // Cache the store instance
  storeCache.set(username, store);
  return store;
};

export default createCartStore;