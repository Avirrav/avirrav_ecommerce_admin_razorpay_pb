import prismadb from '@/lib/prismadb';

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: true, // Only include order items, not the full product
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      // Use the price stored in the order item (historical price at time of purchase)
      return orderSum + (item.price.toNumber() * item.quantity);
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};