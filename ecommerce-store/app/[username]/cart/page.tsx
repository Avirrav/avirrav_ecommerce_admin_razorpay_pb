"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import { createCartStore } from "@/hooks/use-cart";

import Summary from './components/summary';
import CartItem from './components/cart-item';
import { getSessionData } from '@/lib/utils';
import { Product } from '@/types';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const store = getSessionData();
  const useCart = createCartStore(store.username);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Subscribe to cart changes
    const unsubscribe: () => void = useCart.subscribe((state: { items: Product[] }) => {
      setCartItems(state.items);
    });

    // Initial cart items
    setCartItems(useCart.getState().items);

    // Cleanup subscription
    return () => unsubscribe();
  }, [useCart]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cartItems.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;