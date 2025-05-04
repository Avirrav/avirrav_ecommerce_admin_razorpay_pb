import prismadb from '@/lib/prismadb';

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.aggregate({
    where: {
      storeId: storeId,
      isArchived: false,
    },
    _sum: {
      stockQuantity: true
    }
  });

  return stockCount._sum.stockQuantity || 0;
};