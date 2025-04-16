import { Product } from '@/types';
import qs from 'query-string';

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query, storeUrl?: string): Promise<Product[]> => {
  try {

    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      console.error('No API URL available');
      return [];
    }
    
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/products`;
    
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default getProducts;