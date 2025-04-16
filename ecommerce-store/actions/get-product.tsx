import { Product } from '@/types';

const getProduct = async (id: string, storeUrl?: string): Promise<Product> => {
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/products`;
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getProduct;