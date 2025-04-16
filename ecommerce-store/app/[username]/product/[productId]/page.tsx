import ProductPageClient from './ProductPageClient';


interface ProductPageProps {
  params: {
    productId: string;
  },
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return (
      <ProductPageClient
        productId={params.productId}
      />
  );
};

export default ProductPage;