import prismadb from '@/lib/prismadb';
import { OrderForm } from './components/order-form';
import { redirect } from 'next/navigation';

const OrderPage = async ({
  params
}: {
  params: { orderId: string, storeId: string }
}) => {
  // Redirect to orders page if trying to access "new" route
  if (params.orderId === 'new') {
    redirect(`/${params.storeId}/orders`);
  }

  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });
  console.log('order', order);
  
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  const customers = order?.customerId ? await prismadb.customer.findMany({
    where: {
      id: order.customerId,
    }
  }) : [];

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm 
          initialData={order}
          products={products}
          customers={customers}
        />
      </div>
    </div>
  );
}

export default OrderPage;