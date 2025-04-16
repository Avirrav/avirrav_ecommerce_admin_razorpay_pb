import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar'
import getCategories from '@/actions/get-categories';

interface StoreLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

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

export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const store = await getStore(params.username); // Fetch store data using the username

  if (!store) {
    return notFound();
  }
  const categories = await getCategories(store.apiUrl);
  const storeName = store.name;
  const username = store.username; // Extract username from the store data
  return (
    <>
      <Navbar categories={categories} storeName={storeName} username={username} />
      {children}
    </>
  );
}