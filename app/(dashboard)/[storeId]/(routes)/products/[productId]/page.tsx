import prismadb from '@/lib/prismadb';
import { ProductForm } from './components/product-form';
import { Product, Image } from '@prisma/client';

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // Convert Prisma Product with Decimal types to match the expected interface
  const formattedProduct = product
    ? {
        ...product,
        price: Number(product.price),
        costPerItem: Number(product.costPerItem),
        profitMargin: Number(product.profitMargin),
        weight: product.weight ? Number(product.weight) : undefined,
        length: product.length ? Number(product.length) : undefined,
        width: product.width ? Number(product.width) : undefined,
        height: product.height ? Number(product.height) : undefined,
      } as unknown as (Product & {
        images: Image[];
        costPerItem?: number;
        profitMargin?: number;
        weight?: number;
        length?: number;
        width?: number;
        height?: number;
      })
    : null;

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={formattedProduct}
        />
      </div>
    </div>
  );
};

export default ProductPage;
