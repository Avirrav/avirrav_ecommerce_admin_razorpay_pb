import { Category } from '@/types';

const getCategory = async (id: string, storeUrl?: string): Promise<Category[]> => {
  try {

    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      console.error('No API URL available');
      return [];
    }
    
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/categories`;
    
    const res = await fetch(`${URL}/${id}`);
    const data = await res.json();
    
    return [data];
  } catch (error) {
    console.error('Error in getCategory:', error);
    return [];
  }
};

export default getCategory;