import { Color } from '@/types';
import qs from 'query-string';

const getColors = async (storeUrl?: string): Promise<Color[]> => {
  try {
    
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      console.error('No API URL available');
      return [];
    }
    
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/colors`;
    
    const res = await fetch(URL);
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.error('Error in getColors:', error);
    return [];
  }
};

export default getColors;