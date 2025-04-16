import { Billboard } from '@/types';

const getBillboard = async (id: string, storeUrl?: string): Promise<Billboard> => {
  try {
    if (!storeUrl && !process.env.NEXT_PUBLIC_API_URL) {
      return {
        id: '',
        label: '',
        imageUrl: ''
      };
    }
    
    const URL = `${storeUrl || process.env.NEXT_PUBLIC_API_URL}/billboards`;
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching billboard:', error);
    return {
      id: '',
      label: '',
      imageUrl: ''
    };
  }
};

export default getBillboard;