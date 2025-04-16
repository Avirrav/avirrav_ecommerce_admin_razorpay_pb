import { Category } from '@/types';

const getCategories = async (storeUrl?: string): Promise<Category[]> => {
  if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
    return [];
  }
  
  const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/categories`;
  const res = await fetch(URL);
  return res.json();
};

export default getCategories;