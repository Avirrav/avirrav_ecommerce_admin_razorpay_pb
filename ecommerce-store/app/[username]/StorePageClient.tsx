// app/[username]/StorePageClient.tsx
"use client";

import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductList from '@/components/product-list';
import { useEffect } from 'react';

interface StorePageClientProps {
  store: any;
  products: any[];
  billboard: any;
}

const StorePageClient: React.FC<StorePageClientProps> = ({ store, products, billboard }) => {
  useEffect(() => {
    const storeData = {
      id: store.id,
      name: store.name,
      username: store.username,   
      apiUrl: store.apiUrl,
    };
  sessionStorage.setItem('store', JSON.stringify(storeData));
  }, []);
  const username = store.username;
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} username={username} />
        </div>
      </div>
    </Container>
  );
};

export default StorePageClient;
