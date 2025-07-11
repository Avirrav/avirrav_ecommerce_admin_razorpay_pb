import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { SubscriptionGuard } from '@/components/subscription/subscription-guard';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  const store = stores[0]; // Get first store if any exists
  
  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <SubscriptionGuard 
      requiredFeature="store" 
      currentCount={stores.length}
    >
      {children}
    </SubscriptionGuard>
  );
}