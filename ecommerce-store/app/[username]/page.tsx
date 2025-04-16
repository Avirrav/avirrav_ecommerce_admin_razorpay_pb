// app/[username]/page.tsx
import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import getStore from '@/actions/get-store';
import StorePageClient from './StorePageClient'; // 👈 Import client component

export const revalidate = 0;

interface StorePageProps {
  params: {
    username: string;
  };
}

const StorePage = async ({ params }: StorePageProps) => {
  const store = await getStore(params.username);
  if (!store) return null;
  const products = await getProducts({ isFeatured: true }, store.apiUrl);
  const billboard = await getBillboard(store.homeBillboardId, store.apiUrl);

  return (
    <StorePageClient store={store} products={products} billboard={billboard} />
  );
};

export default StorePage;
