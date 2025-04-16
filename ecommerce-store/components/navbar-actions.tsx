'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createCartStore } from '@/hooks/use-cart';
import Button from '@/components/ui/button';
import { getSessionData } from '@/lib/utils';

interface NavActionProps {
  username?: string;
}

const NavbarActions: React.FC<NavActionProps> = ({ username }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const store = getSessionData();
    const cartStore = createCartStore(store.username || username || 'defaultUsername');
    
    // Initial cart count
    setCartItemCount(cartStore.getState().items.length);

    // Subscribe to cart changes
    const unsubscribe: () => void = cartStore.subscribe((state: { items: unknown[] }) => {
      setCartItemCount(state.items.length);
    });

    return () => {
      unsubscribe();
    };
  }, [username]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`${username}/cart`)}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
      </Button>
    </div>
  );
};

export default NavbarActions;