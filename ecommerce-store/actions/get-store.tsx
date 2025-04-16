import { Store } from '@/types';

async function getStore(username: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/stores/username/${username}`);
      if (!res.ok) {
        return null;
      }
      return res.json();
    } catch (error) {
      return null;
    }
  }

export default getStore;