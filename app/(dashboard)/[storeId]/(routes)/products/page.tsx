import { format } from 'date-fns';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { ProductsClient } from './components/client';
import { ProductColumn } from './components/columns';
import { SubscriptionGuard } from '@/components/subscription/subscription-guard';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    stockQuantity: item.stockQuantity
  }));

  // Get user subscription details for product limit check
  let user = null;
  if (userId) {
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const isSubscribed = user?.publicMetadata?.isSubscribed || false;
  const planDetails = user?.publicMetadata?.planDetails;

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SubscriptionGuard 
          requiredFeature="product" 
          currentCount={products.length}
        >
          <ProductsClient data={formattedProducts} />
        </SubscriptionGuard>
      </div>
    </div>
  );
};

export default ProductsPage;