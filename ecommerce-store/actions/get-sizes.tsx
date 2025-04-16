import { Size } from '@/types';
import qs from 'query-string';

const getSizes = async (storeUrl?: string): Promise<Size[]> => {
  try {
    
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      console.error('No API URL available');
      return [];
    }
    
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/sizes`;
    
    const res = await fetch(URL);
    const data = await res.json();
    console.log('Sizes API response:', data);
    
    return data;
  } catch (error) {
    console.error('Error in getSizes:', error);
    return [];
  }
};

export default getSizes;